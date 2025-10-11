"use client";

import React from "react";

export default function FlowerCardSkeleton() {
  return (
    <div className="w-[220px] flex-shrink-0 rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm animate-pulse flex flex-col">
      {/* تصویر */}
      <div className="relative w-full h-60 bg-gray-200" />

      {/* متن */}
      <div className="p-3 flex flex-col items-center text-center gap-2">
        <div className="w-4/5 h-4 bg-gray-200 rounded" />
        <div className="w-2/3 h-3 bg-gray-200 rounded" />
        <div className="w-3/4 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
