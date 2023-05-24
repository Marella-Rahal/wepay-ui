import ContactUs from "../components/Home/ContactUs";
import Main from "../components/Home/Main";
import Payment from "../components/Home/Payment";
import Services from "../components/Home/Services";
import ShippingAndDeposit from "../components/Home/ShippingAndDeposit";
import Navbar from "../components/Navbar";

export default function Home() {

  return (
    <>
        <Navbar/>
        <Main/>
        <h2 className="w-full py-5 text-center text-effectColor">
              خدماتنا
        </h2>
        <Services/>
        <h2 className="w-full py-5 text-center text-effectColor">
              الشحن و الإيداع
        </h2>
        <ShippingAndDeposit/>
        <h2 className="w-full py-5 text-center text-effectColor">
              الدفع والعمليات 
        </h2>
        <Payment/>
        <h2 className="w-full py-5 text-center text-effectColor">
            تواصل معنا 
        </h2>
        <ContactUs/>
    </>
  )
}
