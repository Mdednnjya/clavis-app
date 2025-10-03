"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUploadProps } from "@/lib/types";

export function FileUpload({ onFileChange, onSubmit, isLoading, file }: FileUploadProps) {
  return (
    <Card className="border-border/60 bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Upload Document</CardTitle>
        <CardDescription>Select a PDF file to begin the summarization process.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="pdf-upload">PDF File</Label>
            <Input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              onChange={(e) => onFileChange(e.target.files?.[0] || null)}
              required
            />
          </div>
          <Button type="submit" disabled={!file || isLoading} className="w-full bg-[#FF9900] hover:bg-[#FF9900]/90 text-[##252F3E] disabled:opacity-50">
            {isLoading ? "Processing..." : "Generate Summary"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}