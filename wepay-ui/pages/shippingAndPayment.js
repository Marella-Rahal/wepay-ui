import React, { useState } from 'react'
import Activity from '../components/DashBoard/Activity';
import TotalCash from '../components/DashBoard/TotalCash';
import Navbar from '../components/Navbar';
import {motion} from 'framer-motion';
import Transfer from '../components/ShippingAndPayment/Transfer';

const ShippingAndPayment = () => {
  const [shippingAndPaymentInfo,setShippingAndPaymentInfo]=useState('transfer');
  const [typeOfShipping,setTypeOfShipping]=useState('general');
  const [typeOfWithdraw,setTypeOfWithdraw]=useState('general');

  return (
    <>
        <Navbar/>
        <div className='pt-28 pb-14 px-4 md:px-8 w-full min-h-screen bg-bgColor shadow-bgShadow flex flex-col space-y-10'>

          {/* //!first section */}
          <div className='flex flex-col-reverse items-center md:flex-row md:space-x-10'>

            {/* //!left section */}

            <div className='w-full md:w-1/2 xl:w-2/3 rounded-lg shadow-cardShadow mt-10 md:mt-0 px-5 py-10 flex md:min-h-[532px]'>

                {
                  shippingAndPaymentInfo == 'transfer' && (

                        <motion.div initial={{opacity:0}} animate={{opacity:1}}
                        transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex justify-end'>

                          <Transfer/>

                        </motion.div>

                  )
                }

                {/* //! end of transfer section */}

                {
                  ( shippingAndPaymentInfo == 'shipping' && typeOfShipping == 'general' ) && (

                      <motion.div initial={{opacity:0}} animate={{opacity:1}}
                      transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex flex-col justify-between space-y-10 items-center text-center font-semibold'>

                        <span className='w-[90%] md:w-[50%]'>اختر طريقة الشحن المستخدمة</span>

                        <button className='w-[90%] md:w-[50%] md:py-5' onClick={()=>setTypeOfShipping('haram')}>شركة الهرم للحوالات المالية</button>
                        <button className='w-[90%] md:w-[50%] md:py-5' onClick={()=>setTypeOfShipping('syriatel')}>Syriatel Cash سيرياتيل كاش </button>
                        <button className='w-[90%] md:w-[50%] md:py-5' onClick={()=>setTypeOfShipping('bimo')}>بنك بيمو السعودي الفرنسي</button>

                      </motion.div>

                  )
                }

                {
                  (shippingAndPaymentInfo == 'shipping' && typeOfShipping == 'haram') && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}}
                    transition={{ ease: "easeInOut", duration: 1 }} className="w-full flex justify-center items-center">

                      <button onClick={()=>setTypeOfShipping('general')}>الرجوع</button>

                    </motion.div>
                  )
                }

                {
                  (shippingAndPaymentInfo == 'shipping' && typeOfShipping == 'syriatel') && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}}
                    transition={{ ease: "easeInOut", duration: 1 }} className="w-full flex justify-center items-center">

                      <button onClick={()=>setTypeOfShipping('general')}>الرجوع</button>

                    </motion.div>
                  )
                }

                {
                  (shippingAndPaymentInfo == 'shipping' && typeOfShipping == 'bimo') && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}}
                    transition={{ ease: "easeInOut", duration: 1 }} className="w-full flex justify-center items-center">

                      <button onClick={()=>setTypeOfShipping('general')}>الرجوع</button>

                    </motion.div>
                  )
                }

                {/* //! end of shipping section */}

                {
                  ( shippingAndPaymentInfo == 'withdraw' && typeOfWithdraw == 'general' ) && (

                      <motion.div initial={{opacity:0}} animate={{opacity:1}}
                      transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex flex-col justify-between space-y-10 items-center text-center font-semibold'>

                        <span className='w-[90%] md:w-[50%]'>اختر طريقة السحب المستخدمة</span>

                        <button className='w-[90%] md:w-[50%] md:py-5' onClick={()=>setTypeOfWithdraw('haram')}>شركة الهرم للحوالات المالية</button>
                        <button className='w-[90%] md:w-[50%] md:py-5' onClick={()=>setTypeOfWithdraw('syriatel')}>Syriatel Cash سيرياتيل كاش </button>
                        <button className='w-[90%] md:w-[50%] md:py-5' onClick={()=>setTypeOfWithdraw('bimo')}>بنك بيمو السعودي الفرنسي</button>

                      </motion.div>

                  )
                }

                {
                  (shippingAndPaymentInfo == 'withdraw' && typeOfWithdraw == 'haram') && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}}
                    transition={{ ease: "easeInOut", duration: 1 }} className="w-full flex justify-center items-center">

                      <button onClick={()=>setTypeOfWithdraw('general')}>الرجوع</button>                      

                    </motion.div>
                  )
                }

                {
                  (shippingAndPaymentInfo == 'withdraw' && typeOfWithdraw == 'syriatel') && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}}
                    transition={{ ease: "easeInOut", duration: 1 }} className="w-full flex justify-center items-center">

                      <button onClick={()=>setTypeOfWithdraw('general')}>الرجوع</button>

                    </motion.div>
                  )
                }

                {
                  (shippingAndPaymentInfo == 'withdraw' && typeOfWithdraw == 'bimo') && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}}
                    transition={{ ease: "easeInOut", duration: 1 }} className="w-full flex justify-center items-center">

                      <button onClick={()=>setTypeOfWithdraw('general')}>الرجوع</button> 

                    </motion.div>
                  )
                }

                {/* //! end of withdraw section */}

            </div>    

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

                        <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }} className='self-end pb-2 text-effectColor border-b-[2px] border-effectColor'>آخر عمليات الدفع والتحويل</motion.div>

                        <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex flex-col space-y-10 [&>*:nth-child(even)]:bg-effectColor [&>*:nth-child(even)]:text-textColor2'>

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

                        <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }} className='self-end pb-2 text-effectColor border-b-[2px] border-effectColor'>آخر عمليات الشحن</motion.div>

                        <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex flex-col space-y-10 [&>*:nth-child(even)]:bg-effectColor [&>*:nth-child(even)]:text-textColor2'>

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

                        <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }} className='self-end pb-2 text-effectColor border-b-[2px] border-effectColor'>آخر عمليات السحب</motion.div>

                        <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex flex-col space-y-10 [&>*:nth-child(even)]:bg-effectColor [&>*:nth-child(even)]:text-textColor2'>

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