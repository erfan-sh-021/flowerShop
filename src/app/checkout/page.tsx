"use client";

import React, { useEffect, useState } from "react";
import useCartStore from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart, removeFromCart, increaseQty, decreaseQty, hasHydrated } = useCartStore();

  const [loading, setLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const shippingCost = 0;

  // شبیه‌سازی لودینگ کوتاه
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // redirect فقط بعد از hydrate
  useEffect(() => {
    if (hasHydrated && items.length === 0) {
      router.push("/store");
    }
  }, [hasHydrated, items, router]);

  const handleApplyDiscount = () => {
    if (discountCode.trim().toLowerCase() === "off10") setDiscount(0.1);
    else {
      setDiscount(0);
      alert("کد تخفیف معتبر نیست ❌");
    }
  };

  const handlePayment = () => {
    alert("✅ پرداخت با موفقیت انجام شد!");
    clearCart();
    router.push("/");
  };

  const subtotal = getTotalPrice();
  const discountAmount = Math.round(subtotal * discount);
  const total = subtotal - discountAmount + shippingCost;

  // اسکلتون آیتم‌ها
  const renderSkeletonItem = () => (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 border-b last:border-b-0 animate-pulse">
      <div className="flex items-center gap-3 sm:gap-4 md:w-[35%] w-full">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-300 rounded" />
        <div className="flex flex-col gap-1 w-full">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mt-1" />
        </div>
      </div>
      <div className="mt-3 md:mt-0 md:w-[20%] h-4 bg-gray-300 rounded mx-auto" />
      <div className="mt-3 md:mt-0 md:w-[15%] flex justify-center items-center gap-2">
        <div className="w-6 h-6 bg-gray-300 rounded" />
        <div className="w-6 h-4 bg-gray-300 rounded" />
        <div className="w-6 h-6 bg-gray-300 rounded" />
      </div>
      <div className="mt-3 md:mt-0 md:w-[15%] h-4 bg-gray-300 rounded mx-auto" />
      <div className="mt-3 md:mt-0 md:w-[5%] h-6 bg-gray-300 rounded mx-auto" />
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* 🛒 سبد خرید */}
        <div className="lg:col-span-9 bg-white border rounded-md shadow-sm w-full overflow-hidden">
          <div className="hidden md:flex items-center text-gray-500 text-sm border-b px-4 sm:px-6 py-3">
            <div className="w-[35%] text-right">نام</div>
            <div className="w-[20%] text-center">قیمت واحد</div>
            <div className="w-[15%] text-center">تعداد</div>
            <div className="w-[15%] text-center">مجموع</div>
            <div className="w-[5%] text-center">حذف</div>
          </div>

          <div className="px-3 sm:px-6">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => <React.Fragment key={i}>{renderSkeletonItem()}</React.Fragment>)
              : items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between py-4 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 md:w-[35%] w-full">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded"
                      />
                      <div>
                        <div className="text-sm font-medium text-right break-words">{item.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{item.id}</div>
                      </div>
                    </div>

                    <div className="mt-3 md:mt-0 md:w-[20%] text-center text-sm text-gray-700">
                      {item.price.toLocaleString()} تومان
                    </div>

                    <div className="mt-3 md:mt-0 md:w-[15%] flex justify-center items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-2 border rounded hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-2 border rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <div className="mt-3 md:mt-0 md:w-[15%] text-center font-medium text-gray-800">
                      {(item.price * item.quantity).toLocaleString()} تومان
                    </div>

                    <div className="mt-3 md:mt-0 md:w-[5%] flex justify-center">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* 📦 خلاصه سفارش */}
        <aside className="lg:col-span-3 w-full">
          <div className="bg-white border rounded-md shadow-sm p-4 sm:p-6 flex flex-col justify-between h-full">
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-4" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-8 bg-gray-300 rounded mt-5" />
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-center font-semibold mb-4 text-base sm:text-lg">خلاصه سفارش</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <span className="text-gray-600">کالا (ها)</span>
                      <div className="flex-1 border-b border-dashed border-gray-300 mx-3"></div>
                      <span>{items.length}</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-600">جمع جزء</span>
                      <div className="flex-1 border-b border-dashed border-gray-300 mx-3"></div>
                      <span className="font-medium">{subtotal.toLocaleString()} تومان</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex items-center text-green-600">
                        <span>تخفیف</span>
                        <div className="flex-1 border-b border-dashed border-gray-300 mx-3"></div>
                        <span>-{discountAmount.toLocaleString()} تومان</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-5">
                    <label className="text-xs text-gray-500">کد تخفیف</label>
                    <div className="flex flex-col xs:flex-row sm:flex-row gap-2 mt-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="مثلاً OFF10"
                        className="lg:w-10 flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                      />
                      <button
                        onClick={handleApplyDiscount}
                        className="bg-gray-800 text-white px-3 py-2 rounded text-sm hover:opacity-90"
                      >
                        اعمال
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handlePayment}
                    className="mt-6 w-full bg-[#546D55] hover:bg-[#415641] text-white py-3 rounded-md font-medium transition"
                  >
                    تکمیل خرید
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-3">
                    در ادامه هزینه ارسال اضافه خواهد شد.
                  </p>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
