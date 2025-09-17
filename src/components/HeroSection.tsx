import Image from "next/image";

function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[60vh] flex items-center justify-center bg-cover bg-center bg-[#f3cfc4]"
      style={{ backgroundImage: "url('/images/flowerTexture.png')" }}
    >
    

      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-around px-6 md:px-12 py-12 gap-8">
        {/* بخش لوگو */}
        <div className="flex flex-col items-center flex-shrink-0">
          {/* تصویر گل */}
          <div className="relative w-60 h-60 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
            <Image
              src="/images/flowerImg.png"
              alt="Flower Logo"
              fill
              className="object-contain z-0"
              priority
            />
          </div>
          {/* نوشته زیر گل */}
          {/* <span className=" text-xl sm:text-2xl md:text-3xl tracking-widest text-gray-900 font-bold">
            goolzhin
          </span> */}
        </div>

        {/* متن و دکمه */}
        <div className="text-center  space-y-10">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed">
            بهترین و زیبا ترین گل ها
            <br />
            برای
            <br />
            شما که لایق آن هستید
          </h1>

          <button className="bg-[#b7c7be] hover:bg-[#a5b3aa] text-gray-800 font-medium px-10 py-2 rounded-lg shadow-md transition">
            بیشتر
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
