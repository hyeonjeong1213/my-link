"use client";

import { useAuth } from "@/src/lib/AuthContext";

export function Header() {
  const { user, signInWithGoogle, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-3.5 border-b border-border/50 bg-background/80 backdrop-blur-md">
      {/* 로고 */}
      <span className="text-sm font-bold tracking-[0.25em] text-foreground uppercase select-none">
        M Y L I N K
      </span>

      {/* 우측 액션 영역 */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            {/* 프로필 아바타 + 이름 */}
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName ?? "프로필"}
                  width={30}
                  height={30}
                  className="rounded-full ring-2 ring-primary/30"
                />
              ) : (
                <div className="w-[30px] h-[30px] rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                  {(user.displayName ?? user.email ?? "U").slice(0, 1).toUpperCase()}
                </div>
              )}
              <span className="text-sm text-muted-foreground hidden sm:block max-w-[120px] truncate">
                {user.displayName ?? user.email}
              </span>
            </div>

            {/* 로그아웃 버튼 */}
            <button
              id="btn-signout"
              onClick={signOut}
              className="text-xs text-muted-foreground hover:text-foreground border border-border/60 hover:border-border px-3 py-1.5 rounded-lg transition-all duration-200"
            >
              로그아웃
            </button>
          </>
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
