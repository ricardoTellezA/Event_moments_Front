import { AdminAlbumScreen } from "@/features/albums/screens/admin-album-screen";
import { MarketingFooter } from "@/features/marketing/components/marketing-footer";
import { MarketingHeader } from "@/features/marketing/components/marketing-header";

export default async function AdminAlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <AdminAlbumScreen id={id} />
      <MarketingFooter />
    </div>
  );
}
