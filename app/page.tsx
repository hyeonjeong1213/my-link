import { BookOpen, MonitorPlay, Terminal, ArrowRight } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] text-black font-[family-name:var(--font-sans)] selection:bg-black selection:text-white">
      
      {/* Navigation */}
      <nav className="p-4 md:p-6 border-b-4 border-black bg-white flex justify-between items-center z-50 relative">
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter cursor-pointer hover:skew-x-[-10deg] transition-transform">
          YC.DEV
        </h1>
        <a 
          href="https://github.com/CaesiumY" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 border-4 border-black px-4 py-2 bg-white font-bold text-sm md:text-base shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] focus:shadow-[0px_0px_0px_#000] focus:translate-x-[4px] focus:translate-y-[4px] outline-none transition-all"
        >
          <GithubIcon className="w-5 h-5" />
          GITHUB
        </a>
      </nav>

      {/* Hero Section */}
      <header className="px-6 py-20 md:py-32 border-b-4 border-black bg-white relative overflow-hidden">
        {/* Background decorations - Grayscale */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-[#E4E4E7] border-4 border-black shadow-[4px_4px_0px_#000] rotate-12 hidden md:block" />
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-[#F4F4F5] border-4 border-black rounded-full shadow-[4px_4px_0px_#000] -rotate-12 hidden md:block" />

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-black mb-6 uppercase tracking-tighter leading-none" style={{ textShadow: '4px 4px 0px #A1A1AA' }}>
              <span className="text-black block">윤창식</span>
              Frontend<br/>Developer
            </h2>
            <p className="text-lg md:text-2xl font-bold bg-[#F4F4F5] inline-block px-4 py-2 border-4 border-black shadow-[4px_4px_0px_#000] mb-10">
              AI-Native & UI/UX Enthusiast
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a 
                href="#about" 
                className="px-6 md:px-8 py-3 md:py-4 bg-[#FFDE59] border-4 border-black font-black text-base md:text-lg shadow-[6px_6px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_#000] transition-all"
              >
                더 알아보기
              </a>
              <a 
                href="https://caesiumy.dev" 
                target="_blank" 
                rel="noreferrer"
                className="px-6 md:px-8 py-3 md:py-4 bg-white border-4 border-black font-black text-base md:text-lg shadow-[6px_6px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_#000] transition-all flex items-center gap-2 group"
              >
                기술 블로그 <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="px-6 py-20 md:py-32 border-b-4 border-black bg-[#F4F4F5] relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-10 uppercase tracking-tight border-b-4 border-black pb-4 inline-block text-black">
            About Me
          </h2>
          <div className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed space-y-6">
            <p className="p-6 md:p-8 bg-white border-4 border-black shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] transform transition-transform hover:-translate-y-1">
              <span className="text-3xl font-black">AI-Native</span> 프로세스와 혁신적인 프론트엔드 에코시스템에 관심이 많은 개발자입니다.
            </p>
            <p className="p-6 md:p-8 bg-white border-4 border-black shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] transform transition-transform hover:-translate-y-1">
              『자바스크립트+리액트 디자인 패턴』의 역자이며, 지식의 공유를 통해 함께 성장하는 오픈소스 문화를 지향합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="px-6 py-20 md:py-32 bg-white border-b-4 border-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase tracking-tight border-b-4 border-black pb-4 inline-block text-black">
            Experiences
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="bg-[#F4F4F5] border-4 border-black shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] p-6 md:p-8 flex flex-col items-start hover:-translate-y-2 transition-transform cursor-pointer group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white border-4 border-black flex items-center justify-center rounded-full mb-6 group-hover:bg-[#E4E4E7] transition-colors">
                <MonitorPlay className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-2 uppercase">프론트엔드 튜터</h3>
              <p className="font-bold text-gray-700 md:text-lg">팀스파르타 교육 과정</p>
            </div>
            {/* Card 2 */}
            <div className="bg-[#F4F4F5] border-4 border-black shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] p-6 md:p-8 flex flex-col items-start hover:-translate-y-2 transition-transform cursor-pointer group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white border-4 border-black flex items-center justify-center rounded-full mb-6 group-hover:bg-[#E4E4E7] transition-colors">
                <BookOpen className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-2 uppercase">기술 서적 역자</h3>
              <p className="font-bold text-gray-700 md:text-lg">디자인 패턴 탐구</p>
            </div>
            {/* Card 3 */}
            <div className="bg-[#F4F4F5] border-4 border-black shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] p-6 md:p-8 flex flex-col items-start hover:-translate-y-2 transition-transform cursor-pointer group sm:col-span-2 md:col-span-1">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white border-4 border-black flex items-center justify-center rounded-full mb-6 group-hover:bg-[#E4E4E7] transition-colors">
                <Terminal className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-2 uppercase">오픈소스 활동</h3>
              <p className="font-bold text-gray-700 md:text-lg">인프라 및 커뮤니티 기여</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="bg-[#E4E4E7] px-6 py-16 md:py-24 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 md:mb-10 uppercase tracking-tighter">
            Let's Collaborate!
          </h2>
          <p className="text-lg md:text-xl font-bold mb-10 text-gray-800">
            흥미로운 아이디어가 있으신가요? Github에서 소통해요.
          </p>
          <a 
            href="https://github.com/CaesiumY" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-6 bg-black text-white font-black text-xl md:text-2xl border-4 border-black hover:bg-white hover:text-black hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1 transition-all"
          >
            <GithubIcon className="w-8 h-8 md:w-10 md:h-10" />
            CONNECT ON GITHUB
          </a>
        </div>
        <p className="mt-20 font-bold text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase text-gray-500 border-t-4 border-black pt-8">
          © {new Date().getFullYear()} YOON CHANG-SIK. Neobrutalism Design.
        </p>
      </footer>
    </div>
  );
}
