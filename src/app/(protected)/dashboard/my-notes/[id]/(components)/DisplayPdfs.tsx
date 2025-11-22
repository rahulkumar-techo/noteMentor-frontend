export function PdfViewer({ fileUrl }: { fileUrl: string }) {
  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fileUrl)}`;

  return (
    <iframe
      src={viewerUrl}
      className="w-full h-[90vh] rounded-xl border"
      title="PDF Viewer"
    />
  );
}
