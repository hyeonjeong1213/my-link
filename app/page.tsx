import { BookOpen, MonitorPlay, Terminal } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 font-[family-name:var(--font-sans)] overflow-hidden selection:bg-blue-200 dark:selection:bg-blue-900 p-4">
      {/* Background ambient gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-blue-500/20 dark:bg-blue-500/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-[-10%] w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-purple-500/20 dark:bg-purple-500/10 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />

      <main className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl py-12 px-6 rounded-3xl bg-white/30 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/50 dark:border-zinc-800/50 shadow-2xl">
        
        {/* Profile Avatar with glow effect */}
        <div className="relative mb-8 group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-700 ease-out"></div>
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-white/80 dark:border-zinc-800 bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 shadow-inner flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
             <span className="text-3xl sm:text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-tr from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
               YC
             </span>
          </div>
        </div>

        {/* User Headers */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
          윤창식
        </h1>
        <p className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400 mb-6 tracking-wide">
          Frontend Developer & Educator
        </p>
        
        {/* Biography */}
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg mb-10 font-medium">
          AI-Native 프로세스와 혁신적인 프론트엔드 에코시스템에 관심이 많습니다.
          『자바스크립트+리액트 디자인 패턴』의 역자이며, 지식의 공유를 통해 성장하는 오픈소스 문화를 지향합니다.
        </p>

        {/* Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10">
          <div className="flex flex-col items-center justify-center px-4 py-6 rounded-2xl bg-white/60 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <MonitorPlay className="w-7 h-7 text-blue-500 mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">프론트엔드 튜터</span>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500">팀스파르타 교육</span>
          </div>
          <div className="flex flex-col items-center justify-center px-4 py-6 rounded-2xl bg-white/60 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <BookOpen className="w-7 h-7 text-purple-500 mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">기술 서적 역자</span>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500">디자인 패턴 탐구</span>
          </div>
          <div className="flex flex-col items-center justify-center px-4 py-6 rounded-2xl bg-white/60 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <Terminal className="w-7 h-7 text-emerald-500 mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">오픈소스 메인테이너</span>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500">커뮤니티 리더십</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          <a
            href="https://caesiumy.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 shadow-xl shadow-zinc-900/20 dark:shadow-white/20"
          >
            블로그 방문하기
          </a>
          <a
            href="https://github.com/CaesiumY"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-[0.98] transition-all duration-200 shadow-sm tracking-wide group"
          >
            <GithubIcon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
