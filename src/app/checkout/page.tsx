"use client";

import { useEffect, useState } from "react";
import useCartStore from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import ClientOnly from "@/components/clientOnly";

function CheckoutContent() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart, removeFromCart, increaseQty, decreaseQty } = useCartStore();
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const shippingCost = 50000;
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sub = getTotalPrice();
    setSubtotal(sub);
    setTotal(sub - sub * discount + shippingCost);
  }, [items, discount, getTotalPrice]);

  useEffect(() => {
    if (items.length === 0) router.push("/store");
  }, [items, router]);

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

  return (
    <div className="container mx-auto p-6 max-w-2xl min-h-[500px]">
      <h1 className="text-2xl font-bold text-center mb-6">تکمیل خرید</h1>

      <div className="bg-white shadow-md rounded-lg p-4 border flex flex-col">
        <div className="flex-1 overflow-y-auto max-h-96">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-3">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover" />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.price.toLocaleString()} تومان</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => decreaseQty(item.id)} className="px-2 bg-gray-200 rounded hover:bg-gray-300 transition">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)} className="px-2 bg-gray-200 rounded hover:bg-gray-300 transition">+</button>
                  </div>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <p className="flex justify-between mt-3 border-t pt-3">
          <span>جمع جزء</span>
          <span>{subtotal.toLocaleString()} تومان</span>
        </p>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">کد تخفیف</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="مثلاً OFF10"
              className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button onClick={handleApplyDiscount} className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 transition">
              اعمال
            </button>
          </div>
          {discount > 0 && (
            <p className="text-green-600 text-sm mt-1">✅ تخفیف {discount * 100}% اعمال شد</p>
          )}
        </div>

        <p className="flex justify-between mt-4 font-semibold">
          <span>هزینه ارسال</span>
          <span>{shippingCost.toLocaleString()} تومان</span>
        </p>

        <p className="flex justify-between mt-2 font-bold text-lg border-t pt-3">
          <span>جمع کل</span>
          <span>{(subtotal - subtotal * discount + shippingCost).toLocaleString()} تومان</span>
        </p>

        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded transition"
        >
          پرداخت نهایی
        </button>
      </div>
    </div>
  );
}

export default function CheckoutWrapper() {
  return (
    <ClientOnly>
      <CheckoutContent />
    </ClientOnly>
  );
}
