import { PrintableQrScreen } from "@/features/albums/screens/printable-qr-screen";

export default async function AlbumQrPage({
  params,
}: PageProps<"/a/[id]/qr">) {
  const { id } = await params;

  return <PrintableQrScreen id={id} />;
}
