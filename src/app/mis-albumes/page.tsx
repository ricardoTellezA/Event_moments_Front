import { MarketingFooter } from "@/features/marketing/components/marketing-footer";
import { MarketingHeader } from "@/features/marketing/components/marketing-header";
import { MyAlbumsScreen } from "@/features/albums/screens/my-albums-screen";

export default function MyAlbumsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <MyAlbumsScreen />
      <MarketingFooter />
    </div>
  );
}
