"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { firebaseApp } from "@/lib/firebase";
import { LinkItem } from "@/data/links";
import { Link2 } from "lucide-react";

interface UserProfile {
  uid: string;
  displayName: string;
  introduction: string;
  photoURL?: string;
}

type PageStatus = "loading" | "found" | "not_found";

export default function PublicProfilePage() {
  const params = useParams();
  const displayName = decodeURIComponent(params.displayName as string);

  const [status, setStatus] = useState<PageStatus>("loading");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    if (!displayName) return;

    const db = getFirestore(firebaseApp);

    // displayName 필드로 유저 문서 검색
    const usersRef = collection(db, "user");
    const q = query(usersRef, where("displayName", "==", displayName));

    getDocs(q).then(async (snapshot) => {
      if (snapshot.empty) {
        setStatus("not_found");
        return;
      }

      const userDoc = snapshot.docs[0];
      const data = userDoc.data();

      setProfile({
        uid: userDoc.id,
        displayName: data.displayName ?? displayName,
        introduction: data.introduction ?? "",
        photoURL: data.photoURL,
      });

      // 링크 subcollection 조회
      const linksRef = collection(doc(db, "user", userDoc.id), "links");
      const linksQuery = query(linksRef, orderBy("createdAt", "asc"));
      const linksSnap = await getDocs(linksQuery);

      const fetched: LinkItem[] = linksSnap.docs.map((d) => ({
        id: d.id,
        title: d.data().title,
        url: d.data().url,
        createdAt:
          d.data().createdAt?.toDate?.().toISOString?.() ??
          new Date().toISOString(),
      }));

      setLinks(fetched);
      setStatus("found");
    });
  }, [displayName]);

  // 링크 클릭 시 clicks 카운트 증가
  const handleLinkClick = async (linkId: string, uid: string) => {
    try {
      const db = getFirestore(firebaseApp);
      const linkDoc = doc(db, "user", uid, "links", linkId);
      await updateDoc(linkDoc, { clicks: increment(1) });
    } catch {
      // 카운트 실패해도 링크 이동은 허용
    }
  };

  /* ─── 로딩 ─── */
  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  /* ─── 404 ─── */
  if (status === "not_found") {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center px-5 bg-background text-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
          <Link2 className="w-7 h-7 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            페이지를 찾을 수 없어요
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="font-mono text-primary">@{displayName}</span> 은(는) 존재하지 않는 주소예요.
          </p>
        </div>
        <a
          href="/"
          className="text-xs text-muted-foreground hover:text-foreground border border-border/60 px-4 py-2 rounded-lg transition-colors"
        >
          홈으로 돌아가기
        </a>
        <p className="text-[11px] text-muted-foreground/40 font-mono tracking-widest uppercase">
          mylink
        </p>
      </div>
    );
  }

  /* ─── 퍼블릭 프로필 ─── */
  const avatarText = (profile?.displayName ?? "U").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-svh bg-background flex flex-col items-center px-5 py-16">
      {/* 배경 장식 */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        {/* 프로필 카드 */}
        <section className="flex flex-col items-center text-center mb-10 w-full">
          {/* 아바타 */}
          <div className="relative mb-5">
            {profile?.photoURL ? (
              <img
                src={profile.photoURL}
                alt={profile.displayName}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full ring-4 ring-background shadow-lg object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-2xl font-semibold tracking-tight ring-4 ring-background shadow-lg">
                {avatarText}
              </div>
            )}
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-background" />
          </div>

          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            {profile?.displayName}
          </h1>

          {profile?.introduction && (
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[260px]">
              {profile.introduction}
            </p>
          )}

          <div className="mt-6 w-12 h-px bg-border" />
        </section>

        {/* 링크 목록 */}
        <section className="w-full flex flex-col gap-3">
          {links.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <Link2 className="w-8 h-8 text-muted-foreground/30" strokeWidth={1.5} />
              <p className="text-sm text-muted-foreground">아직 링크가 없어요</p>
            </div>
          ) : (
            links.map((link, index) => {
              let domain = "example.com";
              try {
                domain = new URL(link.url).hostname;
              } catch {
                domain = link.url;
              }

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(link.id, profile!.uid)}
                  className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="flex flex-row items-center gap-4 px-5 py-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer">
                    {/* 파비콘 */}
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src={`https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=64`}
                        alt=""
                        width={20}
                        height={20}
                        className="object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    {/* 링크 타이틀 */}
                    <span className="flex-1 text-sm font-medium text-card-foreground group-hover:text-primary transition-colors duration-200 truncate">
                      {link.title}
                    </span>
                  </div>
                </a>
              );
            })
          )}
        </section>

        {/* 푸터 */}
        <footer className="mt-16 flex flex-col items-center gap-1.5">
          <div className="w-8 h-px bg-border" />
          <a
            href="/"
            className="text-xs text-muted-foreground/50 hover:text-muted-foreground tracking-widest uppercase mt-2 font-mono transition-colors"
          >
            mylink
          </a>
        </footer>
      </div>
    </div>
  );
}
