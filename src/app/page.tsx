"use client";

import { useState } from "react";
import { getApiUrl } from "@/lib/utils";
import { type SummarizeApiResponse } from "@/lib/types";
import { toast } from "sonner";
import { FileUpload } from "@/components/file-upload";
import { SummaryDisplay } from "@/components/SummaryDisplay";
import { AuroraOverlay } from "@/components/aurora-overlay";
import { GitHubLogoIcon } from "@radix-ui/react-icons" 

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setIsLoading(true);
    setSummary(null);

    const promise = () => new Promise<SummarizeApiResponse>(async (resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await fetch(getApiUrl(), { method: 'POST', body: formData });
        if (!response.ok) {
          const errorData = await response.json();
          reject(new Error(errorData.detail || `Error: ${response.statusText}`));
          return;
        }
        const data = await response.json();
        resolve(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
        reject(new Error(errorMessage || 'An unexpected error occurred.'));
      }
    });

    toast.promise(promise(), {
      loading: 'Unlocking insights... The AI is reading your document.',
      success: (data) => {
        setSummary(data.summary);
        setIsLoading(false);
        return 'Summary generated successfully!';
      },
      error: (err) => {
        setIsLoading(false);
        return err.message;
      },
    });
  };

  return (
    <div className="white min-h-screen bg-background text-foreground font-geist">
      {isLoading && <AuroraOverlay />}
      
      <main className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-2xl px-4 py-16 space-y-8">
              <header className="text-center">
                <h1 className="text-balance text-4xl md:text-5xl font-bold tracking-tight">Clavis AI</h1>
                <p className="text-pretty mt-3 text-sm md:text-base text-muted-foreground">
                  Unlock the core insights from your research papers.
                </p>
              </header>
              
              <FileUpload 
                onFileChange={setFile}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                file={file}
              />

              <div className="mt-8">
                <SummaryDisplay summary={summary} isLoading={isLoading} />
              </div>
            </div>
        </div>

        <footer className="w-full text-center p-4 text-xs text-muted-foreground">
          <a
            href="https://github.com/mdednnjya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
          >
            Created by Mdednnjya <GitHubLogoIcon />
          </a>
        </footer>
      </main>
    </div>
  );
}