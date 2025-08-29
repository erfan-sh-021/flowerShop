import Image from "next/image";
import { getData } from "@/lib/getData";

export default async function CollectionsSection() {
  const { data: collections } = await getData("collections", 1, 10);

  // ۴ مربع سمت چپ
  const squares = collections.slice(0, 4);
  // مستطیل سمت راست
  const tall = collections[4];

  return (
    <section className="w-full px-6 py-8">
      <h2 className="text-center text-lg font-semibold mb-6">دسته بندی ها</h2>

      <div className="relative flex justify-center items-center gap-3">
        {/* سمت چپ: ۴ مربع */}
        <div className="relative grid grid-cols-2 gap-[1%] w-[60%]">
          {squares.map((item: any) => (
            <div
              key={item.id}
              className="relative w-full pb-[100%] overflow-hidden shadow-2xl bg-gray-100"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
          {/* لوگو در وسط */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] pb-[30%] bg-white rounded-full flex items-center justify-center shadow-lg">
            <Image
              src="/images/logo1.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* سمت راست: یک مستطیل */}
        <div className="relative w-[25%] pb-[60%] overflow-hidden bg-gray-100">
          {tall && (
            <Image
              src={tall.src}
              alt={tall.title}
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}
