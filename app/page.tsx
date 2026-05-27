"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { LinkItem } from "@/data/links";
import { AddLinkDialog } from "@/components/add-link-dialog";
import { EditLinkInline } from "@/components/edit-link-inline";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { Header } from "@/components/header";
import { ExternalLink, Pencil, Trash2, Link2, MousePointerClick, Sparkles, BarChart2, Layers } from "lucide-react";
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
  setDoc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useAuth } from "@/src/lib/AuthContext";

// ─── 비로그인 랜딩 화면 ──────────────────────────────────────────────────────
function LandingScreen({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-5 bg-background relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full">
        {/* 배지 */}
        <div className="inline-flex items-center rounded-full border border-border/50 bg-card/40 backdrop-blur-md px-3 py-1 text-xs font-medium text-muted-foreground mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 mr-2 text-primary" />
          가장 심플한 프로필 링크 서비스
        </div>

        {/* 메인 타이틀 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-6">
          단 하나의 링크로 <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">
            나를 표현하세요
          </span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mb-10 leading-relaxed">
          흩어져 있는 모든 소셜 미디어, 포트폴리오, 작업물을 하나의 깔끔한 페이지에 담아 공유해보세요. 복잡한 과정 없이 누구나 쉽게 완성할 수 있습니다.
        </p>

        {/* 로그인 버튼 */}
        <div className="flex flex-col items-center w-full max-w-xs gap-3">
          <button
            id="btn-landing-google-signin"
            onClick={onSignIn}
            className="group relative w-full flex items-center justify-center gap-3 bg-foreground text-background px-6 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-foreground/10 overflow-hidden"
          >
            {/* 버튼 내부 장식 */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <div className="relative flex items-center gap-3 z-10">
              <GoogleColorIcon />
              <span>Google 계정으로 시작하기</span>
            </div>
          </button>
          <p className="text-[11px] text-muted-foreground/60 tracking-wide mt-2">
            가입 즉시 무료로 나만의 페이지가 생성됩니다
          </p>
        </div>

        {/* 기능 하이라이트 (Glassmorphism 카드) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20 w-full">
          {[
            {
              icon: <Layers className="w-5 h-5 text-primary" />,
              title: "손쉬운 링크 관리",
              desc: "드래그 앤 드롭 수준의 직관적인 UI로 자유롭게 링크를 추가하고 배치하세요.",
            },
            {
              icon: <Link2 className="w-5 h-5 text-primary" />,
              title: "나만의 주소",
              desc: "mylink/아이디 형태의 깔끔한 고유 링크를 소셜 프로필에 바로 등록하세요.",
            },
            {
              icon: <BarChart2 className="w-5 h-5 text-primary" />,
              title: "실시간 성과 통계",
              desc: "방문자들이 어떤 링크를 가장 많이 클릭했는지 직관적인 차트로 분석하세요.",
            },
          ].map((feat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start text-left p-6 rounded-3xl bg-card/40 backdrop-blur-md border border-border/50 shadow-sm hover:bg-card/60 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-background border border-border/50 flex items-center justify-center mb-4 shadow-sm">
                {feat.icon}
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1.5">{feat.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 로그인 마이페이지 화면 ────────────────────────────────────────────────────
function MyPage({ uid }: { uid: string }) {
  const { user } = useAuth();

  // 이메일 앞부분을 기본 displayName으로
  const emailPrefix = user?.email?.split("@")[0] ?? "사용자";

  // ── 프로필 상태
  const [profileDisplayName, setProfileDisplayName] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [profileLoaded, setProfileLoaded] = useState(false);

  // 인라인 편집 상태
  const [editingField, setEditingField] = useState<"displayName" | "introduction" | null>(null);
  const [draftDisplayName, setDraftDisplayName] = useState("");
  const [draftIntroduction, setDraftIntroduction] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // ── 링크 상태
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [adding, setAdding] = useState<boolean>(false);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 프로필 Firestore 로드
  useEffect(() => {
    const db = getFirestore(firebaseApp);
    const userDoc = doc(db, "user", uid);
    getDoc(userDoc).then((snap) => {
      if (snap.exists()) {
        setProfileDisplayName(snap.data().displayName ?? emailPrefix);
        setIntroduction(snap.data().introduction ?? "");
      } else {
        setProfileDisplayName(emailPrefix);
        setIntroduction("");
      }
      setProfileLoaded(true);
    });
  }, [uid, emailPrefix]);

  // 링크 Firestore 실시간 구독 — user/{uid}/links
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
        clicks: d.data().clicks || 0,
      }));
      setLinks(fetched);
      setInitialLoading(false);
    });
    return () => unsub();
  }, [uid]);

  // 프로필 편집 시작
  const startEditField = (field: "displayName" | "introduction") => {
    if (field === "displayName") setDraftDisplayName(profileDisplayName);
    if (field === "introduction") setDraftIntroduction(introduction);
    setEditingField(field);
  };

  // 프로필 저장
  const saveProfile = async (field: "displayName" | "introduction") => {
    setSavingProfile(true);
    try {
      const db = getFirestore(firebaseApp);
      const userDoc = doc(db, "user", uid);
      if (field === "displayName") {
        const value = draftDisplayName.trim() || emailPrefix;
        await setDoc(userDoc, { displayName: value }, { merge: true });
        setProfileDisplayName(value);
      } else {
        await setDoc(userDoc, { introduction: draftIntroduction.trim() }, { merge: true });
        setIntroduction(draftIntroduction.trim());
      }
    } catch (err) {
      console.error("프로필 저장 오류:", err);
    } finally {
      setSavingProfile(false);
      setEditingField(null);
    }
  };

  // 편집 취소
  const cancelEdit = () => setEditingField(null);

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

  const avatarText = (profileDisplayName || emailPrefix).slice(0, 2).toUpperCase();

  return (
    <div className="min-h-svh bg-background flex flex-col items-center px-5 pt-24 pb-16">
      {/* 초기 로딩 오버레이 */}
      {(initialLoading || !profileLoaded) && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/90 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
      )}

      {/* 프로필 섹션 */}
      <section className="flex flex-col items-center text-center w-full max-w-xs mb-10">
        {/* 아바타 */}
        <div className="relative mb-5">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={profileDisplayName}
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

        {/* 표시 이름 인라인 편집 */}
        {editingField === "displayName" ? (
          <div className="w-full flex flex-col items-center gap-2 mb-1">
            <input
              id="edit-display-name"
              autoFocus
              value={draftDisplayName}
              onChange={(e) => setDraftDisplayName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveProfile("displayName");
                if (e.key === "Escape") cancelEdit();
              }}
              placeholder={emailPrefix}
              maxLength={30}
              className="w-full text-center text-xl font-semibold bg-transparent border-b-2 border-primary outline-none pb-1 text-foreground placeholder:text-muted-foreground/50 transition-all"
            />
            <div className="flex gap-2">
              <button
                onClick={() => saveProfile("displayName")}
                disabled={savingProfile}
                className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {savingProfile ? "저장 중..." : "저장"}
              </button>
              <button
                onClick={cancelEdit}
                className="text-xs px-3 py-1 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <button
            id="btn-edit-displayname"
            onClick={() => startEditField("displayName")}
            className="group flex items-center gap-1.5 mb-1 hover:text-primary transition-colors"
            title="표시 이름 수정"
          >
            <h1 className="text-xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
              {profileDisplayName || emailPrefix}
            </h1>
            <Pencil className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
          </button>
        )}

        {/* 이메일 */}
        {user?.email && (
          <p className="text-xs text-muted-foreground mb-3">{user.email}</p>
        )}

        {/* 한줄 소개 인라인 편집 */}
        {editingField === "introduction" ? (
          <div className="w-full flex flex-col items-center gap-2 mt-1">
            <textarea
              id="edit-introduction"
              autoFocus
              value={draftIntroduction}
              onChange={(e) => setDraftIntroduction(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") cancelEdit();
              }}
              placeholder="한줄 소개를 입력해주세요"
              maxLength={100}
              rows={2}
              className="w-full text-center text-sm bg-transparent border-b-2 border-primary outline-none pb-1 text-foreground placeholder:text-muted-foreground/50 resize-none transition-all"
            />
            <div className="flex gap-2">
              <button
                onClick={() => saveProfile("introduction")}
                disabled={savingProfile}
                className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {savingProfile ? "저장 중..." : "저장"}
              </button>
              <button
                onClick={cancelEdit}
                className="text-xs px-3 py-1 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <button
            id="btn-edit-introduction"
            onClick={() => startEditField("introduction")}
            className="group flex items-center gap-1.5 mt-1 hover:text-primary transition-colors max-w-full"
            title="한줄 소개 수정"
          >
            {introduction ? (
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed text-center">
                {introduction}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground/40 italic group-hover:text-muted-foreground transition-colors">
                한줄 소개를 추가해보세요
              </p>
            )}
            <Pencil className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground/50 group-hover:text-primary transition-colors" />
          </button>
        )}

        <div className="mt-6 w-12 h-px bg-border" />
      </section>

      {/* 링크 관리 섹션 */}
      <section className="w-full max-w-sm flex flex-col gap-3">
        <AddLinkDialog uid={uid} onAdd={handleAddLink} />

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
                  uid={uid}
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
              onClick={async () => {
                try {
                  const db = getFirestore(firebaseApp);
                  const linkDoc = doc(db, "user", uid, "links", link.id);
                  await updateDoc(linkDoc, { clicks: increment(1) });
                } catch (err) {
                  console.error("클릭 수 업데이트 실패:", err);
                }
              }}
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
                {/* 링크 타이틀 및 클릭수 */}
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors duration-200 truncate">
                    {link.title}
                  </span>
                  <div className="flex items-center gap-1 mt-1 text-muted-foreground/60">
                    <MousePointerClick className="w-3 h-3" />
                    <span className="text-[10px] font-medium">{link.clicks || 0}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={(e) => { e.preventDefault(); setEditingId(link.id); }}
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
        <MyPage uid={user.uid} />
      ) : (
        <LandingScreen onSignIn={signInWithGoogle} />
      )}
    </>
  );
}
