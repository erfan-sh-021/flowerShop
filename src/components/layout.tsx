import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";
interface ILayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer palette={5}/>
    </>
  );
}

export default Layout;
