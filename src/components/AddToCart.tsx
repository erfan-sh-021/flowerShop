"use client"
import { useshopingCartContext } from '@/context/shopingCartContext';

interface IAddToCartProps{
    id: string;
    
}

function AddToCart({id}: IAddToCartProps) {
    const {cartItems,handleIncreseProductQty,getProductQty,handleDecreseProductQty,handleRemoveProduct} = useshopingCartContext ()
    console.log(cartItems)
    return (
        <>
            <div className="mt-4">
                <button onClick={()=> handleIncreseProductQty(parseInt(id))} className="px-4 py-2 rounded bg-sky-300">+</button>
                <span className="mx-4">{getProductQty(parseInt(id))}</span>
                <button onClick={()=>handleDecreseProductQty(parseInt(id))} className="px-4 py-2 rounded bg-sky-300">-</button>
            </div>
            <button onClick={()=>handleRemoveProduct(parseInt(id))} className="bg-red-600 text-white rounded px-7 py-2 mt-3">حذف از سبد </button> 
        </>
    );
}

export default AddToCart; 