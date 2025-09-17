import FlowerDetailClient from "@/components/FlowerDetailClient";
import { getData } from "@/lib/getData";

export default async function FlowerDetail({
  params,
}: {
  params: { id: string };
}) {
  const { data: flowers } = await getData("flowers", 1, 100);
  const flower = flowers.find((f: any) => String(f.id) === params.id);

  if (!flower) {
    return <div className="text-center mt-10">محصول مورد نظر پیدا نشد</div>;
  }

  const productImages =
    flower.images && flower.images.length
      ? flower.images
      : [flower.src || "/images/placeholder.png"];

  const images = Array.from({ length: 4 }, (_, i) => productImages[i] || "/images/placeholder.png");

  return <FlowerDetailClient flower={flower} images={images} />;
}
