export interface LinkItem {
  id: string;
  title: string;
  uri: string;
  icon?: string;
}

export const links: LinkItem[] = [
  {
    id: "instagram",
    title: "인스타그램",
    uri: "https://www.instagram.com",
    icon: "Instagram",
  },
  {
    id: "youtube",
    title: "유튜브",
    uri: "https://www.youtube.com",
    icon: "Youtube",
  },
  {
    id: "blog",
    title: "블로그",
    uri: "https://blog.naver.com",
    icon: "BookOpen",
  },
  {
    id: "github",
    title: "GitHub",
    uri: "https://github.com",
    icon: "Github",
  },
  {
    id: "portfolio",
    title: "포트폴리오",
    uri: "https://portfolio.example.com",
    icon: "Briefcase",
  },
];
