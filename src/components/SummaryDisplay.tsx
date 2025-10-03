"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TypewriterWords } from "./typewriter-words";
import { SummaryDisplayProps } from "@/lib/types";

function SummarySkeleton() {
  return (
    <Card className="border-border/60 bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <CardHeader>
        <Skeleton className="h-6 w-1/4" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[92%]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[86%]" />
      </CardContent>
    </Card>
  );
}

export function SummaryDisplay({ summary, isLoading }: SummaryDisplayProps) {
  if (isLoading) {
    return <SummarySkeleton />;
  }

  if (!summary) {
    return null;
  }

  return (
    <Card className="border-border/60 bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Summary</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert text-pretty">
        <TypewriterWords text={summary} />
      </CardContent>
    </Card>
  );
}