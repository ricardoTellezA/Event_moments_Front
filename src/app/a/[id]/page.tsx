import { MarketingFooter } from "@/features/marketing/components/marketing-footer";
import { MarketingHeader } from "@/features/marketing/components/marketing-header";
import { PublicAlbumScreen } from "@/features/albums/screens/public-album-screen";

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <PublicAlbumScreen id={id} />
      <MarketingFooter />
    </div>
  );
}
