import { MarketingFooter } from "@/features/marketing/components/marketing-footer";
import { MarketingHeader } from "@/features/marketing/components/marketing-header";
import { CreateAlbumScreen } from "@/features/albums/screens/create-album-screen";

export default function CreateAlbumPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <CreateAlbumScreen />
      <MarketingFooter />
    </div>
  );
}
