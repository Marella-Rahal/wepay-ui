import React, { useState } from 'react'
import Activity from '../components/DashBoard/Activity';
import TotalCash from '../components/DashBoard/TotalCash';
import Navbar from '../components/Navbar';
import {motion} from 'framer-motion';

const ShippingAndPayment = () => {
  const [shippingAndPaymentInfo,setShippingAndPaymentInfo]=useState('transfer');

  return (
    <>
        <Navbar/>
        <div className='pt-28 pb-14 px-4 md:px-8 w-full min-h-screen bg-bgColor shadow-bgShadow flex flex-col space-y-10'>

          {/* //!first section */}
          <div className='flex flex-col-reverse items-center md:flex-row md:space-x-10'>

            {/* //!left section */}
            {
              shippingAndPaymentInfo == 'transfer' && (

                <form className='w-full md:w-1/2 xl:w-2/3 rounded-lg shadow-cardShadow mt-10 md:mt-0 p-5 flex flex-col space-y-10'>

               
          
                  <button className='w-[40%] self-center'>ادفع الآن</button>
  
                </form>

              )
            }


            {/* //!right section */}

            <TotalCash>

                  <div className={shippingAndPaymentInfo=="transfer"?'text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow py-2 cursor-pointer':"text-effectColor dark:text-textColor2 hover:text-textColor2 hover:bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow py-2 cursor-pointer"} 
                  onClick={()=>setShippingAndPaymentInfo("transfer")}>
                            الدفع و التحويل 
                  </div>

                  <div className={shippingAndPaymentInfo=='shipping'?'text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow py-2 cursor-pointer':'text-effectColor dark:text-textColor2 hover:text-textColor2 hover:bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow py-2 cursor-pointer'} 
                  onClick={()=>setShippingAndPaymentInfo("shipping")}>
                            شحن الرصيد 
                  </div>

                  <div className={shippingAndPaymentInfo=='withdraw'?'text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow py-2 cursor-pointer':'text-effectColor dark:text-textColor2 hover:text-textColor2 hover:bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow py-2 cursor-pointer'}
                  onClick={()=>setShippingAndPaymentInfo("withdraw")}>
                            سحب الرصيد 
                  </div>

            </TotalCash>

          </div>

          {/* //! second section */}

          <div className='w-full flex items-center'>
                <div className='w-1/2 h-[1px] bg-effectColor'/>
                <img src="logo.svg"/>
                <div className='w-1/2 h-[1px] bg-effectColor'/>
          </div>

          {/* //!third section */}

          <div className='w-full flex flex-col space-y-10'>

                {
                  shippingAndPaymentInfo == 'transfer' && (
                    <>

                        <motion.div initial={{opacity:0}} animate={{opacity:1}} className='self-end pb-2 text-effectColor border-b-[2px] border-effectColor'>آخر عمليات الدفع والتحويل</motion.div>

                        <motion.div initial={{opacity:0}} animate={{opacity:1}} className='w-full flex flex-col space-y-10 [&>*:nth-child(even)]:bg-effectColor [&>*:nth-child(even)]:text-textColor2'>

                            <Activity type="دفع لمتجر" msg="دفع لمتجر أبو عبدو ماركت" value="1000000000000" date="02:30 PM 31/12/2023"/>
                            <Activity type="دفع لمتجر" msg="دفع لمتجر أبو عبدو ماركت" value="1000000000000" date="02:30 PM 31/12/2023"/>
                            <Activity type="تحويل" msg=" تحويل لحساب آخر" value="1000000000000" date="02:30 PM 31/12/2023"/>
                            <Activity type="تحويل" msg="تحويل لحساب آخر" value="1000000000000" date="02:30 PM 31/12/2023"/>
                            <Activity type="دفع لمتجر" msg="دفع لمتجر أبو عبدو ماركت" value="1000000000000" date="02:30 PM 31/12/2023"/>

                        </motion.div>

                    </>
                  )
                }

                {
                  ( shippingAndPaymentInfo == 'shipping' ) && (
                    <>

                        <motion.div initial={{opacity:0}} animate={{opacity:1}} className='self-end pb-2 text-effectColor border-b-[2px] border-effectColor'>آخر عمليات الشحن</motion.div>

                        <motion.div initial={{opacity:0}} animate={{opacity:1}} className='w-full flex flex-col space-y-10 [&>*:nth-child(even)]:bg-effectColor [&>*:nth-child(even)]:text-textColor2'>

                            <Activity type="شحن" msg=" شحن رصيد الحساب " value="1000000000000" date="02:30 PM 31/12/2023"/>
                            <Activity type="شحن" msg="شحن رصيد الحساب" value="1000000000000" date="02:30 PM 31/12/2023"/>
                            <Activity type="شحن" msg=" شحن رصيد الحساب" value="1000000000000" date="02:30 PM 31/12/2023"/>
                            <Activity type="شحن" msg="شحن رصيد الحساب" value="1000000000000" date="02:30 PM 31/12/2023"/>
                            <Activity type="شحن" msg="شحن رصيد الحساب" value="1000000000000" date="02:30 PM 31/12/2023"/>

                        </motion.div>
                    
                    </>
                  )
                }

                {
                  ( shippingAndPaymentInfo == "withdraw" ) && (

                    <>

                        <motion.div initial={{opacity:0}} animate={{opacity:1}} className='self-end pb-2 text-effectColor border-b-[2px] border-effectColor'>آخر عمليات السحب</motion.div>

                        <motion.div initial={{opacity:0}} animate={{opacity:1}} className='w-full flex flex-col space-y-10 [&>*:nth-child(even)]:bg-effectColor [&>*:nth-child(even)]:text-textColor2'>

                          <Activity type="سحب" msg=" سحب رصيد الحساب " value="1000000000000" date="02:30 PM 31/12/2023"/>
                          <Activity type="سحب" msg="سحب رصيد الحساب" value="1000000000000" date="02:30 PM 31/12/2023"/>
                          <Activity type="سحب" msg=" سحب رصيد الحساب" value="1000000000000" date="02:30 PM 31/12/2023"/>
                          <Activity type="سحب" msg="سحب رصيد الحساب" value="1000000000000" date="02:30 PM 31/12/2023"/>
                          <Activity type="سحب" msg="سحب رصيد الحساب" value="1000000000000" date="02:30 PM 31/12/2023"/>

                        </motion.div>

                    </>

                  )
                }


          </div>

        </div>
    </>
  )
}

export default ShippingAndPayment