import Container from "@/components/container";
import { IProductItem } from "../page";
import AddToCart from "@/components/AddToCart";

export interface IProductProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{}>;
}
async function Product({ params }: IProductProps) {
  const { id } = await params;
  const result = await fetch(`http://json-server:3001/product/${id}`, { cache: 'no-store' });
  const data = (await result.json()) as IProductItem;

  return (
    <Container>
      <div className="grid grid-cols-12 m-t8 shadow-md ">
        <div className="col-span-9 rtl text-right rtl p-4">
          <h2 className="font-bold text-xl">{data.title}</h2>
          <p className="text-gray-600">{data.description}</p>
          <p className="rtl">
            قیمت : <span className="rtl">{data.price}t</span>
          </p>
          <AddToCart id={id} />
        </div>
        <div className="col-span-3 rtl text-right rtl ">
          <img src={data.image} alt="" />
        </div>
      </div>
    </Container>
  );
}

export default Product;
