"use client";

import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("./carousel"), { ssr: false });

type Props = {
  flowers: { id: number; src: string; alt: string }[];
};

export default function CarouselWrapper({ flowers }: Props) {
  return <Carousel flowers={flowers} />;
}
