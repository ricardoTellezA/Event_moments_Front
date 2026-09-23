import { LiveAlbumScreen } from "@/features/albums/screens/live-album-screen";

type AlbumLivePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AlbumLivePage({ params }: AlbumLivePageProps) {
  const { id } = await params;

  return <LiveAlbumScreen id={id} />;
}
