import { useEffect,useState } from "react";
import AddToCart from "./AddToCart";
import axios from "axios";
import { IProductItem } from "@/app/store/page";

interface IcartItemProps{
    id:number,
    qty:number
}

function CardItem({id,qty}:IcartItemProps) {
    const [data,setData] = useState({} as IProductItem);
    useEffect(()=>{
        axios(`http://localhost:3001/product/${id}`).then(result=>{
            const{data}=result
            setData(data);
        })
    },[])
    return (
        <>
            <div className="mb-4 bg-slate-100 grid grid-cols-12">
                <div className="col-span-10 text-right p-4">
                    <h2 className="text-xl font-bold">{data.title}</h2>
                    <p>تعداد حصول: <span>{qty}</span></p>
                    <p className="rtl"> قیمت محصول : <span>{data.price}t</span></p>
                    <AddToCart id={id.toString()} />
                </div>
                <img className="col-span-2" src={data.image} alt="" />

            </div>
        </>
    );
}

export default CardItem;