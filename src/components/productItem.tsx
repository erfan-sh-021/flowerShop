import { IProductItem } from "@/app/store/page";

export interface IProductList {
  first: number | null;
  items: number | null;
  last: number | null;
  next: number | null;
  pages: number ;
  prev: number | null;
  data:IProductItem[]
}
async function ProductItem({ image, title, price }: IProductItem) {
  return (
    <div className="shadow-md boxWidth">
      <img src={image} alt="" />
      <div className="p-2 text-right rtl ">
        <h3 className="font-bold">{title}</h3>
        <p>
          {" "}
          قیمت :<span>{price}t</span>
        </p>
      </div>
    </div>
  );
}

export default ProductItem;
