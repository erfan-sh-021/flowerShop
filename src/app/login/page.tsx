'use client'
import Container from "@/components/container";
import { useState } from "react";
import cookie from 'js-cookie';
import { useRouter } from "next/navigation";

function Login() {
    const [userName,setUserName]= useState("");
    const [password,setPassword]= useState("");
    const router = useRouter();
    const handleLogin =()=> {

        const response = {
            token: "sdlfkjeiosjfskjfeoij",
            expire:7
        };
        cookie.set("token",response.token);
       router.push("/dashboard")
    }
    return ( 
        <>
            <Container>
                <div className="border p-4 flex flex-col w-100 mx-auto  rtl mt-15" >
                    <input className="bg-slate-300 text-black mb-2" placeholder="نام کاربری" onChange={(e)=>setUserName(e.target.value)} type="text" />
                    <input className="bg-slate-300 text-black" placeholder="رمز ورود" onChange={(e)=>setPassword(e.target.value)} type="password" />

                    <button className="bg-sky-500 text-white w-25 mx-auto mt-3 rounded p-1 pointer" onClick={handleLogin}>ورود</button>
                </div>
            </Container>
        </>
     );
}

export default Login;