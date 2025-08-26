import { Truck, Handshake, ThumbsUp, ReceiptText } from "lucide-react";

const services = [
    {
        id:1,
        icon:<ReceiptText className="w-10 h-10 mx-auto text-white"/>,
        title:"پرداخت در محل برای تهران"
    },
    {
        id:2,
        icon:<ThumbsUp className="w-10 h-10 mx-auto text-white"/>,
        title:"شرایط فیزیکی سالم"
    },
    {
        id:3,
        icon:<Handshake className="w-10 h-10 mx-auto text-white"/>,
        title:"ارسال سریع"
    },
    {
        id:1,
        icon:<Truck className="w-10 h-10 mx-auto text-white"/>,
        title:"تضمین کیفیت"
    },
]

export default function ServicesSection(){
    return(
        <section className="bg-green py-10 mt-5">
            <h2 className="text-center text-gray-600 mb-8">
                خدماتی که ما ارائه میدهیم
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {services.map((service,index)=>(
                    <div className="flex flex-col items-center " key={index}>
                        {service.icon}
                        <p className="mt-3 text-sm md:text-base text-white text-">{service.title}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}