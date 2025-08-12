'use client'
import Container from "@/components/container";
import axios from "axios";
import { ChangeEvent, useState } from "react";

function Dashboard() {
    const [newProduct,setNewProduct]=useState({
        title:"",
        price:"",
        image:"",
        description:""
    });
    const handleChangeProduct = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const{value,name} = e.target;
        setNewProduct({
            ...newProduct,
            [name]:value
        })
    }
    const handleCreateProduct = () =>{
           axios({
            method:"POST",
            url:"http://localhost:3001/product",
            data:{
                id: Math.floor(Math.random()*1000).toString(),
                image:newProduct.image ,
                title:newProduct.title ,
                description:newProduct.description ,
                price:newProduct.price 
            }
           })
    }
  return (
    <>
      <div className="bg-slate-300 p-4 text-right rtl">
        <Container>
          <div className="grid grid-cols-3 gap-4  ">
            <input onChange={handleChangeProduct} name="title" className="bg-white mx-2 py-1 px-2  rounded" type="text" placeholder="عنوان" />
            <input onChange={handleChangeProduct} name="price" className="bg-white mx-2 py-1 px-2  rounded" type="text" placeholder="قیمت" />
            <input onChange={handleChangeProduct} name="image" className="bg-white mx-2 py-1 px-2  rounded" type="text" placeholder="عکس" />
          </div>
          <textarea onChange={handleChangeProduct} name="description" className="w-full mt-4 bg-white" placeholder="توضیحات"></textarea>
          <button onClick={handleCreateProduct} className="bg-sky-500 text-white rounded px-4 py-1">ساخت محصول جدید</button>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
