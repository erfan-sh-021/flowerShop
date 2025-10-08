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
      <RibbonTitle text="محصولات ویژه" pb="pb-40" pt="pt-40"/>
      <FlowerSection />
      <RibbonTitle text="دسته بندی محصولات" pb="pb-40" pt="pt-40"/>
      <FlowersCollections/>
      <ServicesSection />
      <RibbonTitle text="مقالات" pb="pb-20" pt="pt-40"/>

      <Articles/>
 
      
    </>
  );
}
