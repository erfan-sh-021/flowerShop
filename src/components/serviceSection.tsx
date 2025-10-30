import { Truck, Handshake, ThumbsUp, ReceiptText } from "lucide-react";
import { colorPalettes } from "@/utils/colorPlatte";

const palette = colorPalettes[5];
const services = [
  {
    id: 1,
    icon: (
      <ReceiptText
        className="w-12 h-12 mx-auto "
        style={{ color: palette.linkActive }}
      />
    ),
    title: "پرداخت در محل برای تهران",
  },
  {
    id: 2,
    icon: (
      <ThumbsUp
        className="w-12 h-12 mx-auto "
        style={{ color: palette.linkActive }}
      />
    ),
    title: "شرایط فیزیکی سالم",
  },
  {
    id: 3,
    icon: (
      <Handshake
        className="w-12 h-12 mx-auto "
        style={{ color: palette.linkActive }}
      />
    ),
    title: "ارسال سریع",
  },
  {
    id: 4,
    icon: (
      <Truck
        className="w-12 h-12 mx-auto "
        style={{ color: palette.linkActive }}
      />
    ),
    title: "تضمین کیفیت",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-gray-50 pt-16 pb-24 mt-40">
      {/* عنوان بخش */}
      <h2 className="text-center text-gray-800 text-2xl md:text-3xl font-semibold mb-12">
        خدماتی که ما ارائه میدهیم
      </h2>

      {/* کارت‌های خدمات */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            className="flex flex-col items-center p-6 rounded-xl bg-white shadow-md transition-transform hover:scale-105 hover:shadow-xl cursor-pointer group"
            key={index}
          >
            {/* آیکون با subtle bounce */}
            <div className="mb-4 transform transition-transform duration-300 group-hover:-translate-y-1">
              {service.icon}
            </div>

            {/* متن سرویس */}
            <p className="mt-2 text-sm md:text-base text-gray-800 font-medium">
              {service.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
