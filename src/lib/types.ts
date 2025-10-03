export type SummarizeApiResponse = {
  filename: string;
  summary: string;
};

export interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  file: File | null;
}

export interface SummaryDisplayProps {
  summary: string | null;
  isLoading: boolean;
}