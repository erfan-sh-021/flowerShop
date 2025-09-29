"use client";

import { useEffect, useState } from "react";
import useCartStore from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    getTotalPrice,
    clearCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCartStore();

  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const shippingCost = 50000; // هزینه ارسال ثابت

  useEffect(() => {
    if (items.length === 0) {
      router.push("/store");
    }
  }, [items, router]);

  const handleApplyDiscount = () => {
    if (discountCode.trim().toLowerCase() === "off10") {
      setDiscount(0.1);
    } else {
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
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount + shippingCost;

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-center mb-6">تکمیل خرید</h1>

      <div className="bg-white shadow-md rounded-lg p-4 border">
        {/* لیست آیتم‌ها */}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded object-cover"
              />
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {item.price.toLocaleString()} تومان
                </p>

                {/* کنترل تعداد */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* دکمه حذف */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        {/* Subtotal */}
        <p className="flex justify-between mt-3 border-t pt-3">
          <span>جمع جزء</span>
          <span>{subtotal.toLocaleString()} تومان</span>
        </p>

        {/* Discount Code */}
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
            <button
              onClick={handleApplyDiscount}
              className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 transition"
            >
              اعمال
            </button>
          </div>
          {discount > 0 && (
            <p className="text-green-600 text-sm mt-1">
              ✅ تخفیف {discount * 100}% اعمال شد
            </p>
          )}
        </div>

        {/* Shipping */}
        <p className="flex justify-between mt-3">
          <span>هزینه ارسال</span>
          <span>{shippingCost.toLocaleString()} تومان</span>
        </p>

        {/* Total */}
        <p className="flex justify-between text-lg font-bold mt-4 border-t pt-3">
          <span>جمع کل</span>
          <span>{total.toLocaleString()} تومان</span>
        </p>

        {/* Checkout Button */}
        <button
          onClick={handlePayment}
          className="bg-green text-white w-full py-3 mt-4 rounded-lg hover:bg-darkgreen transition"
        >
          پرداخت نهایی
        </button>
      </div>
    </div>
  );
}
