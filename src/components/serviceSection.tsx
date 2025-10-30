import { Truck, Handshake, ThumbsUp, ReceiptText } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      Icon: ReceiptText,
      title: "پرداخت در محل برای تهران",
    },
    {
      id: 2,
      Icon: ThumbsUp,
      title: "شرایط فیزیکی سالم",
    },
    {
      id: 3,
      Icon: Handshake,
      title: "ارسال سریع",
    },
    {
      id: 4,
      Icon: Truck,
      title: "تضمین کیفیت",
    },
  ];

  return (
    <section
      className="bg-gray-50 pt-16 pb-24 mt-40 transition-colors duration-300"
      style={{
       
        color: "var(--text-color)",
      }}
    >
      {/* عنوان بخش */}
      <h2
        className="text-center text-2xl md:text-3xl font-semibold mb-12"
        style={{ color: "var(--title-color)" }}
      >
        خدماتی که ما ارائه می‌دهیم
      </h2>

      {/* کارت‌های خدمات */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto">
        {services.map(({ id, Icon, title }) => (
          <div
            key={id}
            className="flex flex-col items-center p-6 rounded-xl bg-white shadow-md transition-transform hover:scale-105 hover:shadow-xl cursor-pointer group"
          >
            {/* آیکون */}
            <div className="mb-4 transform transition-transform duration-300 group-hover:-translate-y-1">
              <Icon
                className="w-12 h-12 mx-auto"
                style={{ color: "var(--button-from)" }}
              />
            </div>

            {/* متن سرویس */}
            <p
              className="mt-2 text-sm md:text-base font-medium"
              style={{ color: "var(--text-color)" }}
            >
              {title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
