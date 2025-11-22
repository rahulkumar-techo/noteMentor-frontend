// fileHandlers.ts
// Small helpers for file extraction and simple checks.

export function getFilesArray(e: React.ChangeEvent<HTMLInputElement>): File[] {
  return e.target.files ? Array.from(e.target.files) : [];
}

export function getFirstFile(e: React.ChangeEvent<HTMLInputElement>): File | null {
  const file = e.target.files ? e.target.files[0] : null;
  return file instanceof File ? file : null;
}

export function isImage(file: File): boolean {
  return !!file && file.type.startsWith("image/");
}

export function areAllImages(files: File[]): boolean {
  return files.every((f) => isImage(f));
}

export function areAllPdfs(files: File[]): boolean {
  return files.every((f) => f.type === "application/pdf");
}
