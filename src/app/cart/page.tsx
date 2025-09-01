"use client";
import CardItem from "@/components/cardItem";
import Container from "@/components/container";
import { useshopingCartContext } from "@/context/shopingCartContext";
import { useEffect, useState } from "react";
import { IProductItem } from "../../store/page";
import axios from "axios";
import { formatNumberWhithCommas } from "@/utils/number";

interface IDiscountData {
  id: number;
  code: string;
  percentage: number;
}
function Cart() {
  const { cartItems } = useshopingCartContext();
  const [data, setData] = useState<IProductItem[]>([]);
  const [discountCode, setdiscountCode] = useState("");
  const [finalprice, setFinalprice] = useState(0);
  const [diCountedPrice, setdiCountedPrice] = useState(0);

  useEffect(() => {
    axios(`http://json-server:3001/product`).then((result) => {
      const { data } = result;
      setData(data);
    });
  }, []);

  let totalPrice = cartItems.reduce((total, item) => {
    let selectedProduct = data.find(
      (product) => product.id == item.id.toString()
    );
    return total + (selectedProduct?.price || 0) * item.qty;
  }, 0);

  const handleSubmitDiscount = () => {
    axios(`http://localhost:3001/discounts?code=${discountCode}`).then(
      (result) => {
        const data = result.data as IDiscountData[];
        let diCountedPrice = (totalPrice * data[0].percentage) / 100;
        let finalPrice = totalPrice - diCountedPrice;
        setdiCountedPrice(diCountedPrice);
        setFinalprice(finalPrice);
      }
    );
  };
  return (
    <>
      <Container>
        <div>
          <h1 className="text-right my-4">سبد خرید </h1>
          {cartItems.map((item) => (
            <CardItem key={item.id} {...item} />
          ))}
        </div>
        <div className="border shadow-md text-right p-4 bg-white">
          <h3 className="rtl">
            قیمت کل :<span>{formatNumberWhithCommas(totalPrice)}t</span>
          </h3>
          <h3 className="rtl">
            سود شما از این خرید :{" "}
            <span>{formatNumberWhithCommas(diCountedPrice)}t</span>
          </h3>
          <h3 className="rtl">
            قیمت نهایی : <span>{formatNumberWhithCommas(finalprice)}t</span>
          </h3>

          <button
            onClick={handleSubmitDiscount}
            className="bg-sky-600 text-white px-4 py-1 rounded"
          >
            اعمال
          </button>
          <input
            onChange={(e) => setdiscountCode(e.target.value)}
            className="rtl text-right bg-amber-100 ml-3 p-1 rounded pr-3"
            placeholder="کدتخفیف را وارد کنید"
            type="text"
          />
        </div>
      </Container>
    </>
  );
}

export default Cart;
