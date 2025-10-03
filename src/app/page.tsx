import "./globals.css";
import HeroSection from "@/components/HeroSection";
import FlowerSection from "../components/flowersection/FlowerSection";
import ServicesSection from "@/components/serviceSection";
import FlowersCollections from "@/components/colectionFlower";
import Articles from "@/components/articles";
import Footer from "@/components/footer/footer";
import RibbonTitle from "@/components/titr";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <RibbonTitle text="محصولات ویژه" />
      <FlowerSection />
      <ServicesSection />
      <RibbonTitle text="دسته بندی محصولات" />
      <FlowersCollections/>
      <RibbonTitle text="مقالات" />

      <Articles/>
      <Footer palette={5}/>
      
    </>
  );
}
