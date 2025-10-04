import Image from "next/image";
import Link from "next/link";
import { getData } from "@/lib/getData";
import { colorPalettes } from "@/utils/colorPlatte";

type Collection = {
  id: string;
  title: string;
  src: string;
  slug?: string;
};

export default async function CollectionsSection() {
  const res = await getData("collections", 1, 10);
  const collections: Collection[] = res?.data ?? [];

  const items = collections.slice(0, 6);

  const palette = colorPalettes[5]; // هر پالت رو بخوای می‌تونی تغییر بدی

  if (!items.length) {
    return (
      <section className="w-full px-6 py-8">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          هنوز مجموعه‌ای ثبت نشده است.
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full px-6 py-10 rounded-2xl"
      style={{
        background: `linear-gradient(135deg, ${palette.bgFrom}, ${palette.bgTo})`,
      }}
    >
      {/* فقط متن بالا سمت راست */}
      <div className="max-w-7xl mx-auto flex justify-end mb-6">
        <span
          className="text-sm font-semibold cursor-pointer transition-colors"
          style={{ color: palette.linkHover }}
        >
          مشاهده همه
        </span>
      </div>

      {/* گرید ۶ تایی */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/collections/${item.slug ?? item.id}`}
            className="group relative block w-full pb-[100%] overflow-hidden rounded-xl shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500"
            aria-label={`مشاهده مجموعه ${item.title}`}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40"
            />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <span
                className="text-center text-white text-sm font-bold px-4 py-1 rounded-md shadow-md"
                style={{
                  background: `linear-gradient(90deg, ${palette.linkActive}, ${palette.linkHover})`,
                }}
              >
                {item.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
