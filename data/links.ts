export interface LinkItem {
  id: string; // Firestore Document ID (Auto-Generated ID dummy)
  title: string;
  url: string; // Match 'url' instead of 'uri'
  createdAt: string; // ISO String format representing timestamp
}

export const links: LinkItem[] = [
  {
    id: "link_insta_01",
    title: "인스타그램",
    url: "https://www.instagram.com",
    createdAt: new Date("2026-05-25T10:00:00Z").toISOString(),
  },
  {
    id: "link_youtube_02",
    title: "유튜브",
    url: "https://www.youtube.com",
    createdAt: new Date("2026-05-25T10:01:00Z").toISOString(),
  },
  {
    id: "link_blog_03",
    title: "블로그",
    url: "https://blog.naver.com",
    createdAt: new Date("2026-05-25T10:02:00Z").toISOString(),
  },
  {
    id: "link_github_04",
    title: "GitHub",
    url: "https://github.com",
    createdAt: new Date("2026-05-25T10:03:00Z").toISOString(),
  },
  {
    id: "link_portfolio_05",
    title: "포트폴리오",
    url: "https://portfolio.example.com",
    createdAt: new Date("2026-05-25T10:04:00Z").toISOString(),
  },
];
