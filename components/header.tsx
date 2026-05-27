"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/lib/AuthContext";
import { firebaseApp } from "@/lib/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Menu } from "@base-ui/react/menu";
import { Eye, Copy, LogOut, ChevronDown, Check, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Header() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const router = useRouter();

  // Firestore displayName (프로필에서 저장한 표시 이름)
  const [profileDisplayName, setProfileDisplayName] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    const emailPrefix = user.email?.split("@")[0] ?? "사용자";
    const db = getFirestore(firebaseApp);
    const userDoc = doc(db, "user", user.uid);
    getDoc(userDoc).then((snap) => {
      if (snap.exists() && snap.data().displayName) {
        setProfileDisplayName(snap.data().displayName);
      } else {
        setProfileDisplayName(emailPrefix);
      }
    });
  }, [user]);

  const pageUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${profileDisplayName}`
      : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API 미지원 환경 fallback
    }
  };

  const handlePreview = () => {
    window.open(pageUrl, "_blank");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-3.5 border-b border-border/50 bg-background/80 backdrop-blur-md">
      {/* 로고 */}
      <a href="/" className="text-sm font-bold tracking-[0.25em] text-foreground uppercase select-none hover:text-primary transition-colors cursor-pointer block">
        M Y L I N K
      </a>

      {/* 우측 액션 영역 */}
      <div className="flex items-center gap-3">
        {user ? (
          <Menu.Root>
            {/* 드롭다운 트리거 — 프로필 아바타 + 이름 */}
            <Menu.Trigger
              id="btn-profile-menu"
              className="group flex items-center gap-2 rounded-xl px-2.5 py-1.5 hover:bg-muted transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={profileDisplayName || user.displayName || "프로필"}
                  width={28}
                  height={28}
                  className="rounded-full ring-2 ring-primary/30 flex-shrink-0"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold flex-shrink-0">
                  {(profileDisplayName || user.email || "U").slice(0, 1).toUpperCase()}
                </div>
              )}
              <span className="text-sm text-foreground hidden sm:block max-w-[110px] truncate font-medium">
                {profileDisplayName || user.displayName || user.email}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-data-open:rotate-180 transition-transform duration-200" />
            </Menu.Trigger>

            {/* 드롭다운 패널 */}
            <Menu.Portal>
              <Menu.Positioner
                side="bottom"
                align="end"
                sideOffset={8}
                className="z-50"
              >
                <Menu.Popup
                  className={cn(
                    "min-w-[220px] rounded-xl border border-border bg-popover shadow-lg shadow-black/10",
                    "p-1.5 outline-none",
                    "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
                    "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
                    "origin-top-right"
                  )}
                >
                  {/* 프로필 요약 헤더 */}
                  <div className="px-3 py-2.5 mb-1 border-b border-border/50">
                    <div className="flex items-center gap-2.5">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={profileDisplayName}
                          width={36}
                          height={36}
                          className="rounded-full ring-2 ring-primary/20 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold flex-shrink-0">
                          {(profileDisplayName || "U").slice(0, 1).toUpperCase()}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-foreground truncate">
                          {profileDisplayName || user.displayName || "사용자"}
                        </span>
                        <span className="text-[11px] text-muted-foreground truncate">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 내 프로필 미리보기 */}
                  <Menu.Item
                    id="menu-preview"
                    onClick={handlePreview}
                    className={cn(
                      "flex items-center gap-2.5 w-full rounded-lg px-3 py-2 text-sm text-foreground",
                      "hover:bg-muted cursor-pointer outline-none transition-colors duration-150",
                      "focus-visible:bg-muted"
                    )}
                  >
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span>내 프로필 미리보기</span>
                  </Menu.Item>

                  {/* 통계 보기 */}
                  <Menu.Item
                    id="menu-stats"
                    onClick={() => router.push("/stats")}
                    className={cn(
                      "flex items-center gap-2.5 w-full rounded-lg px-3 py-2 text-sm text-foreground",
                      "hover:bg-muted cursor-pointer outline-none transition-colors duration-150",
                      "focus-visible:bg-muted"
                    )}
                  >
                    <BarChart2 className="w-4 h-4 text-muted-foreground" />
                    <span>통계 보기</span>
                  </Menu.Item>

                  {/* 내 페이지 링크 복사 */}
                  <Menu.Item
                    id="menu-copy-link"
                    onClick={handleCopyLink}
                    closeOnClick={false}
                    className={cn(
                      "flex items-center gap-2.5 w-full rounded-lg px-3 py-2 text-sm text-foreground",
                      "hover:bg-muted cursor-pointer outline-none transition-colors duration-150",
                      "focus-visible:bg-muted"
                    )}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className={copied ? "text-primary font-medium" : ""}>
                      {copied ? "복사 완료!" : "내 페이지 링크 복사"}
                    </span>
                  </Menu.Item>

                  {/* 구분선 */}
                  <Menu.Separator className="my-1 h-px bg-border/50" />

                  {/* 로그아웃 */}
                  <Menu.Item
                    id="menu-signout"
                    onClick={signOut}
                    className={cn(
                      "flex items-center gap-2.5 w-full rounded-lg px-3 py-2 text-sm text-destructive",
                      "hover:bg-destructive/10 cursor-pointer outline-none transition-colors duration-150",
                      "focus-visible:bg-destructive/10"
                    )}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>로그아웃</span>
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        ) : (
          <button
            id="btn-header-signin"
            onClick={signInWithGoogle}
            className="flex items-center gap-2 text-xs bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-lg font-medium transition-all duration-200 shadow-sm"
          >
            <GoogleIcon />
            Google 로그인
          </button>
        )}
      </div>
    </header>
  );
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="currentColor" fillOpacity=".9"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="currentColor" fillOpacity=".7"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="currentColor" fillOpacity=".5"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="currentColor" fillOpacity=".8"/>
    </svg>
  );
}
