"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { links } from "@/data/links"
import { ExternalLink } from "lucide-react"

export default function Page() {
  // Use dummy user data matching PRD specifications
  const user = {
    nickname: "MyLink",
    introduction: "안녕하세요! 저의 소셜 채널 및 포트폴리오 링크 모음입니다. 편하게 둘러보세요.",
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-svh bg-linear-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 py-16 px-4">
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center max-w-sm mb-10">
        {/* Simple Minimal Text Logo / Avatar Representation */}
        <div className="w-16 h-16 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 flex items-center justify-center font-bold text-xl shadow-md">
          {user.nickname.substring(0, 2).toUpperCase()}
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mt-4">
          @{user.nickname}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2.5 leading-relaxed font-normal">
          {user.introduction}
        </p>
      </div>

      {/* Links List Section */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {links.map((link) => {
          // Parse domain to retrieve fallback logic or neat formatting if needed
          let domain = "example.com"
          try {
            domain = new URL(link.url).hostname
          } catch (e) {
            domain = link.url
          }

          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-hidden"
            >
              <Card className="flex items-center gap-4 p-4 border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-xs hover:shadow-md hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300 group">
                {/* Dynamically loaded favicon based on Google Favicon API as specified in PRD.md */}
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shadow-xs overflow-hidden border border-zinc-200/50 dark:border-zinc-700/50">
                  <img
                    src={`https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=64`}
                    alt={link.title}
                    className="w-5 h-5 object-contain"
                    onError={(e) => {
                      // Fallback icon source
                      e.currentTarget.src = `https://s2.googleusercontent.com/s2/favicons?domain=example.com&sz=64`
                    }}
                  />
                </div>

                <div className="flex-grow min-w-0">
                  <CardTitle className="text-base font-semibold text-zinc-800 dark:text-zinc-200 truncate group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-200">
                    {link.title}
                  </CardTitle>
                </div>

                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-200 flex-shrink-0" />
              </Card>
            </a>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-16 text-xs text-zinc-400 dark:text-zinc-600 font-mono tracking-wider">
        POWERED BY SHADCN/UI
      </div>
    </div>
  )
}
