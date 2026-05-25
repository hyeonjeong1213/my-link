"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { links as initialLinks, LinkItem } from "@/data/links"
import { AddLinkDialog } from "@/components/add-link-dialog"
import { ExternalLink } from "lucide-react"

export default function Page() {
  const user = {
    nickname: "hyeonjeong",
    introduction: "디자인과 개발 사이 어딘가에 살고 있습니다 ✦",
  }

  // 링크 목록 상태 관리 (추후 Firestore 연동 예정)
  const [links, setLinks] = useState<LinkItem[]>(initialLinks)

  function handleAddLink(newLink: LinkItem) {
    // createdAt 기준 내림차순 정렬 (PRD 2.4)
    setLinks((prev) =>
      [...prev, newLink].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    )
  }

  return (
    <div className="min-h-svh bg-background flex flex-col items-center px-5 py-16">

      {/* 프로필 섹션 */}
      <section className="flex flex-col items-center text-center w-full max-w-xs mb-12">
        {/* 텍스트 아바타 — 이미지 업로드 없음 (PRD 2.3) */}
        <div className="relative mb-5">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center
                       bg-primary text-primary-foreground
                       text-2xl font-semibold tracking-tight
                       ring-4 ring-background shadow-lg"
          >
            {user.nickname.slice(0, 2).toUpperCase()}
          </div>
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-background" />
        </div>

        <h1 className="text-xl font-semibold text-foreground tracking-tight">
          @{user.nickname}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {user.introduction}
        </p>
        <div className="mt-8 w-12 h-px bg-border" />
      </section>

      {/* 링크 목록 (PRD 2.4) */}
      <section className="w-full max-w-sm flex flex-col gap-3">
        {links.map((link, index) => {
          let domain = "example.com"
          try {
            domain = new URL(link.url).hostname
          } catch {
            domain = link.url
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
              <Card
                className="flex flex-row items-center gap-4 px-5 py-4
                           border border-border bg-card
                           hover:border-primary/30 hover:shadow-md hover:shadow-primary/5
                           transition-all duration-200 ease-out
                           cursor-pointer rounded-xl"
              >
                {/* 파비콘 (PRD: 구글 파비콘 API) */}
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                  <img
                    src={`https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=64`}
                    alt=""
                    width={20}
                    height={20}
                    className="object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>

                {/* 링크 타이틀 */}
                <span
                  className="flex-1 text-sm font-medium text-card-foreground
                             group-hover:text-primary transition-colors duration-200 truncate"
                >
                  {link.title}
                </span>

                {/* 외부 링크 아이콘 */}
                <ExternalLink
                  className="flex-shrink-0 w-4 h-4 text-muted-foreground
                             group-hover:text-primary transition-colors duration-200"
                  strokeWidth={1.5}
                />
              </Card>
            </a>
          )
        })}

        {/* 링크 추가 버튼 (PRD 2.4) */}
        <div className="mt-1">
          <AddLinkDialog onAdd={handleAddLink} />
        </div>
      </section>

      {/* 푸터 */}
      <footer className="mt-16 flex flex-col items-center gap-1.5">
        <div className="w-8 h-px bg-border" />
        <p className="text-xs text-muted-foreground/50 tracking-widest uppercase mt-2 font-mono">
          mylink
        </p>
      </footer>
    </div>
  )
}
