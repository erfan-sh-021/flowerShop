'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Container from "./container";
import { useshopingCartContext } from "@/context/shopingCartContext";
import Cookies from 'js-cookie';
function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const {cartTotalQty} = useshopingCartContext()
    const navLinks = [
        {
            href: "/",
            title: "خانه "
        }, {
            href: "/store",
            title: "فروشگاه"
        },{
            href: "/dashboard",
            title: "پنل"
        },{
            href: "/login",
            title: "ورود"
        }
    ]
    return (
        <nav className="shadow p-4">
            <Container>
                <div className="flex flex-row-reverse">
                {navLinks.map((nav) => (
                    <Link key={nav.href} href={nav.href} className={`mr-4 ${pathname === nav.href ? "text-sky-400" : ""}`}>{nav.title}</Link>
                ))
                }
                </div>
                <span className="px-2 py-1 text-white bg-red-500 rounded-full">{cartTotalQty}</span>
                <div>
                    <Link href={'/cart'}>سبد خرید</Link>
                    <button onClick={()=>{
                        Cookies.remove("token")
                        router.push("/")
                    }} className="ml-4 text-red-600" >خروج</button>
                </div>
            </Container>
        </nav >
    );
}

export default Navbar;