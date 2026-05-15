export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-20 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <main className="flex w-full max-w-2xl flex-col items-center text-center">
        {/* Header Section */}
        <header className="mb-12 flex flex-col items-center">
          <div className="mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-zinc-800">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-4xl font-bold text-white">
              CS
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            윤창식
          </h1>
          <p className="text-xl font-medium text-blue-600 dark:text-blue-400 sm:text-2xl">
            "자랑하고 싶은 개발자"
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              Frontend Engineer
            </span>
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              Educator
            </span>
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
              Translator
            </span>
          </div>
        </header>

        {/* Bio Section */}
        <section className="mb-12 w-full">
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            비전공(영문학) 출신의 프론트엔드 엔지니어로서, 실무 개발뿐만 아니라 교육과 번역을 통해 지식을 나누는 일에 깊은 가치를 둡니다. 
            최근에는 <span className="font-semibold text-zinc-900 dark:text-zinc-100">AI-Native 개발</span>과 워크플로우 자동화에 몰입하며, 
            AI 에이전트를 실무 도구에 통합하는 새로운 가능성을 탐구하고 있습니다.
          </p>
        </section>

        {/* Experience & Achievements */}
        <section className="mb-12 grid w-full gap-6 text-left sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
            <h3 className="mb-3 flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v4"/><path d="M11 3v4"/><path d="M15 3v4"/><path d="M19 3v4"/><path d="M21 7h-4"/><path d="M21 11h-4"/><path d="M21 15h-4"/><path d="M21 19h-4"/><path d="M17 21v-4"/><path d="M13 21v-4"/><path d="M9 21v-4"/><path d="M5 21v-4"/><path d="M3 17h4"/><path d="M3 13h4"/><path d="M3 9h4"/></svg>
              Key Focus
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>• TypeScript & React/Next.js Ecosystem</li>
              <li>• AI Agent Workflow Automation (MCP)</li>
              <li>• Performance Optimization & Architecture</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
            <h3 className="mb-3 flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
              Publications
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>• &lt;자바스크립트+리액트 디자인 패턴&gt; 역자</li>
              <li>• 팀스파르타 리액트 트랙 튜터 (100+ 라이브)</li>
              <li>• dding-dong (Claude Code Plugin) 개발</li>
            </ul>
          </div>
        </section>

        {/* Social Links */}
        <footer className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/caesiumy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/chang-sik-yoon"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          <a
            href="https://caesiumy.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            Blog
          </a>
        </footer>
      </main>
    </div>
  );
}
