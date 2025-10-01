"use client";

import { useState } from 'react';
import { getApiUrl } from "@/lib/utils";
import { type SummarizeApiResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SummarySkeleton } from '@/components/summary-skeleton';
import { useTypewriter } from '@/hooks/use-word-stream';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const typewriterText = useTypewriter(summary);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setIsLoading(true);
    setSummary("");
    const promise = () => new Promise<SummarizeApiResponse>(async (resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(getApiUrl(), {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          reject(new Error(errorData.detail || `Error: ${response.statusText}`));
          return;
        }

        const data = await response.json();
        resolve(data);
      } catch (err: unknown) {
        reject(err);
      }
    });

    toast.promise(promise(), {
      loading: 'Summarizing your document... This may take a moment.',
      success: (data) => {
        setSummary(data.summary); 
        setIsLoading(false);
        return 'Summary generated successfully!';
      },
      error: (err) => {
        setIsLoading(false);
        return err.message || 'An unexpected error occurred.';
      },
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Clavis
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Unlock the core insights from your research papers.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>Select a PDF file to begin the summarization process.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="pdf-upload">PDF File</Label>
                <Input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileChange} required />
              </div>
              <Button type="submit" disabled={!file || isLoading} className="w-full">
                {isLoading ? "Processing..." : "Generate Summary"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {summary && !isLoading && (
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert">
              <p>{typewriterText}</p> 
            </CardContent>
          </Card>
        )}

        {isLoading && <SummarySkeleton />}
      </div>
    </main>
  );
}