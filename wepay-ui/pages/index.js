import { useSelector } from "react-redux";
import { saveUser, selectUser } from "../Redux/Slices/userSlice";
import { wrapper } from "../Redux/Store";
import FailToGet from "../components/FailToGet";
import ContactUs from "../components/Home/ContactUs";
import Main from "../components/Home/Main";
import Payment from "../components/Home/Payment";
import Services from "../components/Home/Services";
import ShippingAndDeposit from "../components/Home/ShippingAndDeposit";
import Navbar from "../components/Navbar";
import axios from 'axios';

export default function Home( { role } ) {

  const user=useSelector(selectUser);

  return (
    <>
      {
        role.length !== 0 ? (
          <>
            <Navbar role={role} user={user}/>
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
        ) : (
          <FailToGet/>
        )

      }
      
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps( store => async (context) =>{

    const { req } = context;
    const cookie = req.headers.cookie;

    try {

          const res = await axios.get(`${process.env.server_url}/api/v1.0/auth/getUserInfo`,{
            headers: {
              Cookie: cookie,
            },
          });

          const data=res.data;

          if( data.role !== "guest" ){
            store.dispatch(saveUser(data.user))
          }

          return {
            props : {
              role : data.role
            }
          }
      
    } catch (error) {

          return {
            props : {
              role : ""
            }
          }
      
    }


})
