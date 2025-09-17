import { getData } from "@/lib/getData";

export default async function FlowerDetail({ params }: { params: { id: string } }) {
  const { data: flowers } = await getData("flowers", 1, 100);

  const flower = flowers.find((f: any) => String(f.id) === params.id);

  if (!flower) {
    return <div className="text-center mt-10">محصول مورد نظر پیدا نشد</div>;
  }

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* بخش تصویر محصول (در موبایل بالا - در دسکتاپ راست) */}
      <div className="relative w-full h-80 md:h-96 md:order-2">
        <img
          src={flower.src || "/images/placeholder.png"}
          alt={flower.title}
          className="w-full h-full object-cover rounded-xl shadow"
        />
      </div>

      {/* بخش اطلاعات محصول (در موبایل پایین - در دسکتاپ چپ) */}
      <div className="flex flex-col justify-center text-right md:order-1">
        <h1 className="text-2xl font-bold mb-2">{flower.title}</h1>
        <p className="text-green-700 text-xl font-bold mb-4">
          {Number(flower.price).toLocaleString("fa-IR")} تومان
        </p>
        <p className="text-gray-600 mb-4">{flower.desc}</p>

        {/* انتخاب تعداد + دکمه خرید */}
        <div className="flex items-center gap-4 mb-4 justify-end">
          <div className="flex items-center gap-3">
            <button className="bg-darkgreen hover:bg-green text-white py-3 px-6 rounded-lg shadow transition">
              خرید
            </button>
            <input
              type="number"
              min={1}
              max={10}
              defaultValue={1}
              className="w-20 border rounded-lg p-2 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
