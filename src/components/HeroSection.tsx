"use client";
import Image from "next/image";
import { colorPalettes } from "@/utils/colorPlatte";

interface HeroSectionProps {
  palette?: 1 | 2 | 3 | 4 | 5;
}

function HeroSection({ palette = 5 }: HeroSectionProps) {
  const colors = colorPalettes[palette];

  return (
    <section
      className={`relative w-full min-h-[75vh] flex items-center justify-center bg-gradient-to-br overflow-hidden font-sans`}
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${colors.bgFrom}, ${colors.bgTo})`,
      }}
    >
      {/* Texture Background */}
      <div className="absolute inset-0 bg-[url('/images/flowerTexture.png')] bg-cover bg-center opacity-10 animate-[textureMove_20s_linear_infinite]" />

      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16 gap-12">

        {/* تصویر گل سمت چپ */}
        <div className="flex justify-center w-full md:w-1/2 order-1">
          <div className="relative w-60 h-60 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
            <Image
              src="/images/flowerImg.png"
              alt="Flower Logo"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* متن سمت راست */}
        <div className="text-right space-y-6 w-full md:w-1/2 order-2">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            style={{ color: colors.title }}
          >
            بهترین گل‌ها <br className="hidden sm:block" /> برای بهترین شما
          </h1>

          <p className="text-base sm:text-lg max-w-md md:mx-0" style={{ color: colors.text }}>
            مجموعه‌ای از زیباترین گل‌ها برای هدیه دادن به عزیزانتان، با کیفیتی بی‌نظیر و انتخابی خاص.
          </p>

          <button
            className="font-semibold px-14 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl"
            style={{
              backgroundImage: `linear-gradient(to right, ${colors.buttonFrom}, ${colors.buttonTo})`,
              color: "#fff",
            }}
          >
            مشاهده محصولات
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
