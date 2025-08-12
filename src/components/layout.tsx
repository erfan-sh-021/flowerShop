import Navbar from "./navbar";
interface ILayoutProps{
    children:React.ReactNode;
}
function Layout({children}:ILayoutProps) {
    return ( 
        <>
            <Navbar/>
            {children}
        </>
     );
}

export default Layout;