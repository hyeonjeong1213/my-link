"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { useAuth } from "@/src/lib/AuthContext";
import { firebaseApp } from "@/lib/firebase";
import { getFirestore, collection, doc, query, orderBy, onSnapshot } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkItem } from "@/data/links";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MousePointerClick, TrendingUp, Link2 } from "lucide-react";

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
    })).reverse(); // 과거 항목부터 순서대로
  }, [links]);

  const totalClicks = useMemo(() => {
    return links.reduce((sum, link) => sum + (link.clicks || 0), 0);
  }, [links]);

  // 차트 설정 (툴팁 문구 변경: '클릭 가능' 오번역을 방지하기 위해 '방문 횟수'로 변경)
  const chartConfig = {
    clicks: {
      label: "방문 횟수",
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
    <div className="min-h-svh bg-background relative flex flex-col items-center px-5 pt-24 pb-16 overflow-hidden">
      <Header />
      
      {/* 배경 장식 (유리 질감 효과를 위해 은은한 블러 추가) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>
      
      <div className="w-full max-w-3xl flex flex-col gap-8 relative z-10">
        
        {/* 페이지 타이틀 */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-primary" strokeWidth={2.5} />
            성과 통계
          </h1>
          <p className="text-sm text-muted-foreground">
            등록하신 링크들이 얼마나 클릭되었는지 한눈에 분석해보세요.
          </p>
        </div>

        {/* 요약 통계 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="rounded-2xl border-border/50 bg-card/40 backdrop-blur-md shadow-lg shadow-black/5 hover:bg-card/60 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <MousePointerClick className="w-4 h-4" />
                전체 누적 방문 수
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                {totalClicks.toLocaleString()}
                <span className="text-2xl text-muted-foreground font-medium ml-1.5 tracking-normal">회</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/50 bg-card/40 backdrop-blur-md shadow-lg shadow-black/5 hover:bg-card/60 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Link2 className="w-4 h-4" />
                등록된 링크 수
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-foreground">
                {links.length}
                <span className="text-2xl text-muted-foreground font-medium ml-1.5 tracking-normal">개</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 차트 카드 */}
        <Card className="rounded-2xl border-border/50 bg-card/60 backdrop-blur-md shadow-xl shadow-black/5">
          <CardHeader>
            <CardTitle className="text-lg">링크별 클릭 분포</CardTitle>
            <CardDescription>
              최근 등록한 순서대로 각 링크의 클릭 횟수를 비교합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {links.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[350px] text-muted-foreground text-sm bg-muted/20 rounded-xl border border-dashed border-border/50">
                아직 등록된 링크가 없습니다.
              </div>
            ) : totalClicks === 0 ? (
              <div className="flex flex-col items-center justify-center h-[350px] text-muted-foreground text-sm bg-muted/20 rounded-xl border border-dashed border-border/50">
                아직 클릭 데이터가 수집되지 않았습니다.
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ top: 20, left: -20, right: 12, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.15} />
                  <XAxis
                    dataKey="shortTitle"
                    tickLine={false}
                    tickMargin={12}
                    axisLine={false}
                    fontSize={12}
                    className="fill-muted-foreground font-medium"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    fontSize={12}
                    allowDecimals={false}
                    className="fill-muted-foreground font-medium"
                  />
                  <ChartTooltip
                    cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="clicks"
                    fill="url(#barGradient)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                    animationDuration={1500}
                    animationEasing="ease-out"
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
