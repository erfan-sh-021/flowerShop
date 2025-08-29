import axios from "axios";
import Image from "next/image";
import "./globals.css";
import HeroSection from "@/components/HeroSection";
import FlowerSection from "../components/flowersection/FlowerSection";
import ServicesSection from "@/components/serviceSection";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <FlowerSection />
      <ServicesSection />
    </>
  );
}
