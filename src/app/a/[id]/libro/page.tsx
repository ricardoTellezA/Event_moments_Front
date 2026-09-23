import { MemoryBookScreen } from "@/features/albums/screens/memory-book-screen";

export default async function AlbumBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <MemoryBookScreen id={id} />;
}
