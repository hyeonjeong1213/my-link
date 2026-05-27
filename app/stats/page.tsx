"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { useAuth } from "@/src/lib/AuthContext";
import { firebaseApp } from "@/lib/firebase";
import { getFirestore, collection, doc, query, orderBy, onSnapshot } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkItem } from "@/data/links";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function StatsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // 비로그인 시 리다이렉트
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  // 링크 데이터 구독
  useEffect(() => {
    if (!user) return;
    const db = getFirestore(firebaseApp);
    const userDoc = doc(db, "user", user.uid);
    const linksCol = collection(userDoc, "links");
    const q = query(linksCol, orderBy("createdAt", "desc"));
    
    const unsub = onSnapshot(q, (snapshot) => {
      const fetched: LinkItem[] = snapshot.docs.map((d) => ({
        id: d.id,
        title: d.data().title,
        url: d.data().url,
        createdAt:
          d.data().createdAt?.toDate?.().toISOString?.() ?? new Date().toISOString(),
        clicks: d.data().clicks || 0,
      }));
      setLinks(fetched);
      setDataLoading(false);
    });
    
    return () => unsub();
  }, [user]);

  // 데이터 집계
  const chartData = useMemo(() => {
    return links.map((link) => ({
      title: link.title,
      clicks: link.clicks || 0,
      // 긴 제목 자르기
      shortTitle: link.title.length > 8 ? link.title.substring(0, 8) + "..." : link.title,
    })).reverse(); // 과거 항목부터 순서대로 (createdAt asc 느낌)
  }, [links]);

  const totalClicks = useMemo(() => {
    return links.reduce((sum, link) => sum + (link.clicks || 0), 0);
  }, [links]);

  // 차트 설정
  const chartConfig = {
    clicks: {
      label: "클릭 수",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  // 로딩 중 화면
  if (authLoading || (!user && !authLoading) || dataLoading) {
    return (
      <div className="min-h-svh bg-background flex flex-col items-center px-5 pt-24 pb-16">
        <Header />
        <div className="fixed inset-0 flex items-center justify-center bg-background/90 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background flex flex-col items-center px-5 pt-24 pb-16">
      <Header />
      
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* 요약 카드 */}
        <Card className="rounded-2xl border-border bg-card/50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              총 누적 클릭 수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold tracking-tighter text-foreground">
              {totalClicks.toLocaleString()}
              <span className="text-2xl text-muted-foreground font-normal ml-2 tracking-normal">회</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              등록된 {links.length}개의 링크에서 발생한 모든 클릭의 합계입니다.
            </p>
          </CardContent>
        </Card>

        {/* 차트 카드 */}
        <Card className="rounded-2xl border-border bg-card/50 shadow-sm">
          <CardHeader>
            <CardTitle>링크별 클릭 수 분석</CardTitle>
            <CardDescription>
              각 링크가 얼마나 클릭되었는지 확인해보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            {links.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground text-sm">
                아직 등록된 링크가 없습니다.
              </div>
            ) : totalClicks === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground text-sm">
                아직 클릭 데이터가 수집되지 않았습니다.
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ top: 20, left: -20, right: 12, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
                  <XAxis
                    dataKey="shortTitle"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    fontSize={12}
                    className="fill-muted-foreground"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    fontSize={12}
                    allowDecimals={false}
                    className="fill-muted-foreground"
                  />
                  <ChartTooltip
                    cursor={{ fill: "hsl(var(--muted))", opacity: 0.5 }}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="clicks"
                    fill="var(--color-clicks)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
