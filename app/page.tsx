"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { LinkItem } from "@/data/links";
import { AddLinkDialog } from "@/components/add-link-dialog";
import { EditLinkInline } from "@/components/edit-link-inline";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { Header } from "@/components/header";
import { ExternalLink, Pencil, Trash2, Link2 } from "lucide-react";
import { firebaseApp } from "@/lib/firebase";
import {
  getFirestore,
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "@/src/lib/AuthContext";

// ─── 비로그인 랜딩 화면 ──────────────────────────────────────────────────────
function LandingScreen({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-5 bg-background relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full gap-8">
        {/* 로고 */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/20 shadow-lg shadow-primary/5">
            <Link2 className="w-7 h-7 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold tracking-[0.2em] text-foreground uppercase">
            M Y L I N K
          </h1>
        </div>

        {/* 서비스 소개 */}
        <div className="flex flex-col gap-2">
          <p className="text-base text-foreground font-medium">
            가장 심플하게 나를 표현하는 한 장의 카드.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Google 로그인 후 나만의 링크 목록을 만들고 <br className="hidden sm:block" />
            단 하나의 링크로 공유해보세요 ✦
          </p>
        </div>

        {/* 로그인 버튼 */}
        <div className="w-full flex flex-col items-center gap-4">
          <button
            id="btn-landing-google-signin"
            onClick={onSignIn}
            className="group w-full flex items-center justify-center gap-3 bg-card hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary text-foreground px-6 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-primary/20"
          >
            <GoogleColorIcon />
            <span>Google로 시작하기</span>
          </button>

          {/* 안내 문구 */}
          <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground/60">
            <p>로그인하면 나만의 링크 페이지를 관리할 수 있어요</p>
          </div>
        </div>

        {/* 기능 소개 카드 */}
        <div className="w-full grid grid-cols-3 gap-3 mt-2">
          {[
            { icon: "🔗", title: "링크 관리", desc: "원하는 링크를 자유롭게 추가·편집" },
            { icon: "✨", title: "개인화", desc: "나만의 프로필 페이지 생성" },
            { icon: "📊", title: "통계", desc: "링크 클릭 수 실시간 확인" },
          ].map((feat) => (
            <div
              key={feat.title}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border/50 text-center"
            >
              <span className="text-xl">{feat.icon}</span>
              <span className="text-xs font-semibold text-foreground">{feat.title}</span>
              <span className="text-[11px] text-muted-foreground leading-tight">{feat.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 버전 */}
      <p className="absolute bottom-6 text-xs text-muted-foreground/40 font-mono tracking-widest">
        v1.0.0
      </p>
    </div>
  );
}

// ─── 로그인 대시보드 화면 ─────────────────────────────────────────────────────
function Dashboard({ uid }: { uid: string }) {
  const { user } = useAuth();

  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [adding, setAdding] = useState<boolean>(false);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editUrl, setEditUrl] = useState<string>("");
  const [editErrors, setEditErrors] = useState<{ title?: string; url?: string }>({});
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Firestore 실시간 구독 — user/{uid}/links
  useEffect(() => {
    const db = getFirestore(firebaseApp);
    const userDoc = doc(db, "user", uid);
    const linksCol = collection(userDoc, "links");
    const q = query(linksCol, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const fetched: LinkItem[] = snapshot.docs.map((d) => ({
        id: d.id,
        title: d.data().title,
        url: d.data().url,
        createdAt:
          d.data().createdAt?.toDate?.().toISOString?.() ?? new Date().toISOString(),
      }));
      setLinks(fetched);
      setInitialLoading(false);
    });
    return () => unsub();
  }, [uid]);

  const handleAddLink = async (newLink: { title: string; url: string }) => {
    setAdding(true);
    try {
      const db = getFirestore(firebaseApp);
      const userDoc = doc(db, "user", uid);
      const linksCol = collection(userDoc, "links");
      await addDoc(linksCol, {
        title: newLink.title,
        url: newLink.url,
        createdAt: new Date(),
      });
    } finally {
      setAdding(false);
    }
  };

  const startEdit = (link: LinkItem) => {
    setEditingId(link.id);
    setEditTitle(link.title);
    setEditUrl(link.url);
    setEditErrors({});
  };

  const handleDeleteLink = async (id: string) => {
    setDeletingId(null);
    try {
      const db = getFirestore(firebaseApp);
      const linkDoc = doc(db, "user", uid, "links", id);
      await deleteDoc(linkDoc);
    } catch (err) {
      console.error("링크 삭제 중 오류:", err);
    }
  };

  // 로그인 유저 닉네임 (표시명 앞 두 글자)
  const displayName = user?.displayName ?? user?.email ?? "사용자";
  const avatarText = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-svh bg-background flex flex-col items-center px-5 pt-24 pb-16">
      {/* 초기 로딩 오버레이 */}
      {initialLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/90 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
      )}

      {/* 프로필 섹션 */}
      <section className="flex flex-col items-center text-center w-full max-w-xs mb-10">
        <div className="relative mb-5">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={displayName}
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
          {displayName}
        </h1>
        {user?.email && (
          <p className="mt-1 text-xs text-muted-foreground">{user.email}</p>
        )}
        <div className="mt-6 w-12 h-px bg-border" />
      </section>

      {/* 링크 관리 섹션 */}
      <section className="w-full max-w-sm flex flex-col gap-3">
        <AddLinkDialog onAdd={handleAddLink} />

        {adding && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
          </div>
        )}

        {!initialLoading && links.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <Link2 className="w-8 h-8 text-muted-foreground/30" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">아직 링크가 없어요</p>
            <p className="text-xs text-muted-foreground/60">위 버튼으로 첫 번째 링크를 추가해보세요 ✦</p>
          </div>
        )}

        {links.map((link, index) => {
          let domain = "example.com";
          try {
            domain = new URL(link.url).hostname;
          } catch {
            domain = link.url;
          }

          if (editingId === link.id) {
            return (
              <div key={link.id}>
                <EditLinkInline
                  link={link}
                  onCancel={() => setEditingId(null)}
                  onSaved={() => setEditingId(null)}
                />
              </div>
            );
          }

          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <Card className="flex flex-row items-center gap-4 px-5 py-4 border border-border bg-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 ease-out cursor-pointer rounded-xl">
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
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={(e) => { e.preventDefault(); startEdit(link); }}
                    className="p-1 hover:text-primary transition-colors"
                    title="편집"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setDeletingId(link.id); }}
                    className="p-1 hover:text-destructive transition-colors"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <ExternalLink
                  className="flex-shrink-0 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200"
                  strokeWidth={1.5}
                />
              </Card>
            </a>
          );
        })}
      </section>

      {deletingId && (
        <DeleteConfirmDialog
          open={true}
          linkTitle={links.find((l) => l.id === deletingId)?.title ?? ""}
          onCancel={() => setDeletingId(null)}
          onConfirm={() => handleDeleteLink(deletingId)}
          loading={false}
        />
      )}

      {/* 푸터 */}
      <footer className="mt-16 flex flex-col items-center gap-1.5">
        <div className="w-8 h-px bg-border" />
        <p className="text-xs text-muted-foreground/50 tracking-widest uppercase mt-2 font-mono">
          mylink
        </p>
      </footer>
    </div>
  );
}

// ─── Google 컬러 아이콘 ─────────────────────────────────────────────────────
function GoogleColorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908C16.658 14.013 17.64 11.705 17.64 9.2Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  );
}

// ─── 루트 페이지 ─────────────────────────────────────────────────────────────
export default function Page() {
  const { user, loading, signInWithGoogle } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <Header />
      {user ? (
        <Dashboard uid={user.uid} />
      ) : (
        <LandingScreen onSignIn={signInWithGoogle} />
      )}
    </>
  );
}
