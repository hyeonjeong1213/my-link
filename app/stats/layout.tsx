import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "성과 통계",
  description: "내 프로필 링크의 실시간 클릭 수 및 성과 통계를 확인하세요.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
