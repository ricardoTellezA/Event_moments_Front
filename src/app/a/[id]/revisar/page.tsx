import { ReviewPhotosScreen } from "@/features/albums/screens/review-photos-screen";

type ReviewPhotosPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReviewPhotosPage({ params }: ReviewPhotosPageProps) {
  const { id } = await params;

  return <ReviewPhotosScreen id={id} />;
}
