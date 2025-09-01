import Image from "next/image";
import { getData } from "@/lib/getData";

export default async function CollectionsSection() {
  const { data: collections } = await getData("collections", 1, 10);
  console.log(collections);
  // ۴ مربع سمت چپ
  const squares = collections.slice(0, 4);
  // مستطیل سمت راست
  const tall = collections[4];

  return (
    <section className="w-full px-6 py-8">
      <h2 className="text-center text-lg font-semibold mb-6">دسته بندی ها</h2>

      <div className="relative flex justify-center items-center gap-2">
        {/* سمت چپ: ۴ مربع */}
        <div className="relative grid grid-cols-2 gap-2 w-[90%] md:w-[40%]">
          {squares.map((item: any) => (
            <div
              key={item.id}
              className="group relative w-full pb-[100%] md:pb-[100%] overflow-hidden shadow-2xl bg-gray-100 "
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:blur-0 blur-sm opacity-90"
              />
              {/* لایه بلور و متن */}
              <div className="absolute inset-0 flex items-center justify-center ">
                <span className="text-white font-semibold text-lg text-center">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
          {/* لوگو در وسط */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  w-[35%] md:w-[35%] pb-[35%] md:pb-[35%]  bg-white rounded-full flex items-center justify-center shadow-lg">
            <Image
              src="/images/logo1.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* سمت راست: یک مستطیل */}
        <div className="hidden md:block relative w-[18%] pb-[40%]  overflow-hidden bg-gray-100">
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
