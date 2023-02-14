import React, { useState } from 'react';
import Chart from '../components/DashBoard/Chart';
import Navbar from '../components/Navbar';
import {AiFillCaretDown} from 'react-icons/ai';
import Payment from '../components/DashBoard/Payment';
import PriceClassification from '../components/DashBoard/PriceClassification';
import DateClassification from '../components/DashBoard/DateClassification';
import Activity from '../components/DashBoard/Activity';

const Dashboard = () => {

    //todo what type of payment are displayed
    const [typeOfPayment,setTypeOfPayment]=useState('allPayment');

    //todo what type of atctivity are displayed
    const [typeOfAct,setTypeOfAct]=useState('allOperation');

    //todo what info are displayed 
   const [dashboardInfo,setDashboardInfo]=useState("statistic");  
 
  return (
    <>
        <Navbar/>
        <div className='pt-28 pb-14 px-4 md:px-8 w-full min-h-screen bg-bgColor shadow-bgShadow flex flex-col space-y-10'>

            {/* //! first Section */}
            <div className='flex flex-col-reverse items-center md:flex-row md:space-x-10'>
                {/* //! left section */}
                <div className='w-full md:w-1/2 xl:w-2/3 flex flex-col space-y-5 mt-10 md:mt-0'>
                    <div className='relative group'>

                        <div className='p-2 rounded-lg shadow-cardShadow self-start flex w-[170px] justify-between items-center cursor-pointer group-hover:scale-[1.05]'>
                            <AiFillCaretDown className='w-6 h-6'/>
                            : تصنيف حسب 
                        </div>

                        <div className='hidden group-hover:flex absolute bg-textColor2 rounded-md flex-col text-sm font-bold text-center'>
                            <div className='p-3 rounded-t-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2 border-b-[1px] border-textColor'>السنوات</div>

                            <div className='p-3 border-b-[1px] border-textColor cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2'>الأشهر</div>

                            <div className='p-3 rounded-b-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2'>الأيام</div>
                        </div>

                    </div>
                    
                    <Chart/>
                </div>
                {/* //! right section */}
                <div className='w-full md:w-1/2 xl:w-1/3 shadow-cardShadow rounded-lg p-5 flex flex-col space-y-10 text-center font-bold'>
                    {/* ****************************** */}
                    <div className='flex pb-5 border-b-[1px] border-effectColor'>

                        <div className='w-1/2 flex flex-col space-y-3 pt-1 px-2 border-r-[1px] border-effectColor text-[10px] xs:text-sm'>
                            <span>: إجمالي الصرف </span>
                            <span>1000000000 SYP</span>
                        </div>

                        <div className='w-1/2 flex flex-col space-y-3 pt-1 px-2 text-[10px] xs:text-sm'>
                            <span>: إجمالي الدخل </span>
                            <span>1000000000 SYP</span>
                        </div>

                    </div>
                    {/* *********************** */}
                    <div className='pb-5 px-2 border-b-[1px] border-effectColor text-[10px] xs:text-sm'>
                    1000000000 SYP : رصيد الحساب 
                    </div>
                    {/* ************************** */}

                    <div className={dashboardInfo=="statistic"?'text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow py-2 cursor-pointer':"text-effectColor dark:text-textColor2 hover:text-textColor2 hover:bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow py-2 cursor-pointer"} 
                    onClick={()=>setDashboardInfo("statistic")}>
                        أهم الإحصائيات
                    </div>

                    <div className={dashboardInfo=='activity'?'text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow py-2 cursor-pointer':'text-effectColor dark:text-textColor2 hover:text-textColor2 hover:bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow py-2 cursor-pointer'} 
                    onClick={()=>setDashboardInfo("activity")}>
                        كل الأنشطة
                    </div>

                    <div className={dashboardInfo=='payment'?'text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow py-2 cursor-pointer':'text-effectColor dark:text-textColor2 hover:text-textColor2 hover:bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow py-2 cursor-pointer'}
                    onClick={()=>setDashboardInfo("payment")}>
                        المدفوعات المستحقة
                    </div>

                </div>

            </div>

            {/* //! second section */}

            <div className='w-full flex items-center'>
                <div className='w-1/2 h-[1px] bg-effectColor'/>
                <img src="logo.svg"/>
                <div className='w-1/2 h-[1px] bg-effectColor'/>
            </div>

            {/* //! third section statistic */}

            {
                ( dashboardInfo=='statistic' ) && (
                    <div className='w-full flex flex-col items-center space-y-10 md:space-y-0 md:flex-row md:space-x-10 md:justify-evenly text-end'>

                        {/* //! left section */}
                        <div className='p-5 rounded-lg shadow-cardShadow w-full md:w-1/2 lg:w-1/3 flex flex-col space-y-5 text-effectColor dark:text-textColor2 font-bold'>
                            {/* ************** */}
                            <div className='self-end pb-2 border-b-[2px] border-effectColor text-effectColor'>
                            : آخر الأنشطة
                            </div>
                            {/* **************** */}
                            <div className='px-2 py-4 text-[10px] xs:text-sm rounded-lg shadow-cardShadow flex justify-between items-center space-x-3'>
                                <div className='self-center text-center'>-2000000000 SYP</div>
                                <div>دفع لمتجر أبو عبدو ماركت</div>
                            </div>
                            {/* ************** */}
                            <div className='px-2 py-4 text-[10px] xs:text-sm rounded-lg shadow-cardShadow flex justify-between items-center space-x-3'>
                                <div className='self-center text-center'>+2000000000 SYP</div>
                                <div>شحن رصيد الحساب</div>
                            </div>
                            {/* ************ */}
                            <div className='px-2 py-4 text-[10px] xs:text-sm rounded-lg shadow-cardShadow flex justify-between items-center space-x-3'>
                                <div className='self-center text-center'>+2000000000 SYP</div>
                                <div>شحن رصيد الحساب</div>
                            </div>
                            {/* ************ */}
                            <div className='px-2 py-4 text-[10px] xs:text-sm rounded-lg shadow-cardShadow flex justify-between items-center space-x-3'>
                                <div className='self-center text-center'>+2000000000 SYP</div>
                                <div>شحن رصيد الحساب</div>
                            </div>
                            {/* ************ */}
                            <div className='px-2 py-4 text-[10px] xs:text-sm rounded-lg shadow-cardShadow flex justify-between items-center space-x-3'>
                                <div className='self-center text-center'>+2000000000 SYP</div>
                                <div>شحن رصيد الحساب</div>
                            </div>
                            {/* ************ */}
                            <button className='text-[12px] xs:text-base self-start p-1 px-3' onClick={()=>setDashboardInfo("activity")}>عرض الكل</button>
                        </div>
                        {/* //!right section */}
                        <div className='p-5 rounded-lg shadow-cardShadow w-full md:w-1/2 lg:w-1/3 flex flex-col space-y-5 text-effectColor dark:text-textColor2 font-bold'>
        
                            {/* ************** */}
                            <div className='self-end pb-2 border-b-[2px] border-effectColor text-effectColor'>
                            : أهم المدفوعات المستحقة 
                            </div>
                            {/* **************** */}
                            <div className='px-2 py-4 text-[10px] xs:text-sm rounded-lg shadow-cardShadow flex space-x-3 justify-between items-center'>
                                <div className='flex flex-col space-y-3'>
                                    <button className='text-[12px] xs:text-base p-1 px-3 self-start'>ادفع الآن</button>
                                    <div className='text-start'>آخر موعد للدفع 30/7/2023</div>
                                </div>
                                <div className='flex flex-col space-y-3'>
                                    <div>دين لمتجر أبو عبدو ماركت</div>
                                    <div className='flex flex-col'>
                                        <span>: قيمة الدفعة</span>
                                        <span>1000000000 SYP </span> 
                                    </div>
                                </div>
                            </div>
                            {/* **************** */}
                            <div className='px-2 py-3 text-[10px] xs:text-sm rounded-lg shadow-cardShadow flex space-x-3 justify-between items-center'>
                                <div className='flex flex-col space-y-3'>
                                    <button className='text-[12px] xs:text-base p-1 px-3 self-start'>ادفع الآن</button>
                                    <div className='text-start'>
                                    --/--/-- آخر موعد للدفع 
                                    </div>
                                </div>
                                <div className='flex flex-col space-y-3'>
                                    <div>دين لمتجر أبو عبدو ماركت</div>
                                    <div className='flex flex-col'>
                                        <span>: قيمة الدفعة</span>
                                        <span>1000000000 SYP </span> 
                                    </div>
                                </div>
                            </div>
                            {/* **************** */}
                            <div className='px-2 py-3 text-[10px] xs:text-sm rounded-lg shadow-cardShadow flex space-x-3 justify-between items-center'>
                                <div className='flex flex-col space-y-3'>
                                    <div className='text-start'>آخر موعد للدفع 30/7/2023</div>
                                </div>
                                <div className='flex flex-col space-y-3'>
                                    <div>قسط بنك التسليف</div>
                                    <div className='flex flex-col'>
                                        <span>: قيمة الدفعة</span>
                                        <span>1000000000 SYP </span> 
                                    </div>
                                </div>
                            </div>
                            {/* ************** */}
                            <div className='flex space-x-3 justify-between'>
                                <button className='text-[12px] xs:text-base p-1 px-3' onClick={()=>setDashboardInfo("payment")}>عرض الكل</button>
                                <button className='text-[12px] xs:text-base p-1 px-3'>إضافة المزيد</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* //! third section activity */}

            {
                ( dashboardInfo == "activity" ) && (
                    
                    <div className='w-full flex flex-col space-y-10 items-center text-effectColor dark:text-textColor2 font-bold text-center'>
                        {/* ******************** */}
                        <div className='md:w-full flex flex-col-reverse items-center md:flex-row md:justify-end md:space-x-10'>
                            <div className={typeOfAct=='recieve'?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0"} onClick={()=>setTypeOfAct("recieve")}>عمليات استلام الرصيد</div>
        
                            <div className={typeOfAct=="payAct"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0"} onClick={()=>setTypeOfAct("payAct")}>عمليات الدفع للمتاجر</div>
        
                            <div className={typeOfAct=="shipping"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0"} onClick={()=>setTypeOfAct("shipping")}>عمليات الشحن</div>
        
                            <div className={typeOfAct=="transfer"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0"} onClick={()=>setTypeOfAct("transfer")}>عمليات التحويل</div>
        
                            <div className={typeOfAct=="allOperation"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo"} onClick={()=>setTypeOfAct("allOperation")}> كل العمليات </div>
                        </div>
                        {/* ********************* */}
                        <div className='md:w-full flex flex-col space-y-10 items-center md:space-y-0 md:flex-row md:justify-between md:space-x-5 text-textColor dark:text-textColor2 font-normal'>

                            <PriceClassification/>
                            
                            <DateClassification/>
                            
                        </div>
                        {/* *********************** */}
                        <div className='w-full flex flex-col space-y-10 [&>*:nth-child(even)]:bg-effectColor
                        [&>*:nth-child(even)]:text-textColor2'>

                            <Activity type="استلام" msg="استلام رصيد من حساب آخر" value="1000000000000" date="02:30 PM 31/12/2023"/>
                            <Activity type="شحن" msg="استلام رصيد من حساب آخر" value="1000000000000" date="02:30 PM 31/12/2023"/>
                            <Activity type="دفع لمتجر" msg="استلام رصيد من حساب آخر" value="1000000000000" date="02:30 PM 31/12/2023"/>
                            <Activity type="تحويل" msg="استلام رصيد من حساب آخر" value="1000000000000" date="02:30 PM 31/12/2023"/>
                            <Activity type="شحن" msg="استلام رصيد من حساب آخر" value="1000000000000" date="02:30 PM 31/12/2023"/>
                          
                        </div>
                         
                    </div>
                )
            }


            {/* //! third section payment */}

            {
                (dashboardInfo == 'payment') && (
                    <div className='w-full flex flex-col space-y-10 items-center text-effectColor dark:text-textColor2 font-bold text-center'>

                        {/* ******************** */}
                        <div className='md:w-full flex flex-col-reverse items-center md:flex-row md:justify-end md:space-x-10'>
                            <div className={typeOfPayment=='otherPayment'?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0"} onClick={()=>setTypeOfPayment("otherPayment")}>مدفوعات أخرى  </div>
        
                            <div className={typeOfPayment=="storeDebt"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0"} onClick={()=>setTypeOfPayment("storeDebt")}>ديون المتاجر  </div>
        
                            <div className={typeOfPayment=="monthlyPayment"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0"} onClick={()=>setTypeOfPayment("monthlyPayment")}> الأقساط الشهرية</div>
        
                            <div className={typeOfPayment=="debt"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0"} onClick={()=>setTypeOfPayment("debt")}> الديون</div>
        
                            <div className={typeOfPayment=="allPayment"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo"} onClick={()=>setTypeOfPayment("allPayment")}> كل الدفوعات </div>
                        </div>
                        {/* ********************* */}
                        <div className='md:w-full flex flex-col space-y-10 items-center md:space-y-0 md:flex-row md:justify-between md:space-x-5 text-textColor dark:text-textColor2 font-normal'>

                            <PriceClassification/>

                            <button>إضافة مدفوعات أخرى</button>

                            <DateClassification/>


                        </div>
                        {/* *********************** */}
                        <div className='flex flex-col md:flex-row md:justify-evenly md:flex-wrap'>


                            <Payment type="دين" value="1000000000000000" name="دين لغيث عثمان" date="31/12/2023"/>
                            <Payment type="قسط شهري" value="1000000000000000" name="دين لغيث عثمان" date="دفع كل شهر/ متبقي 3 أيام"/>
                            <Payment type="دين" value="1000000000000000" name="دين لغيث عثمان" date="31/12/2023"/>
                            <Payment type="دين" value="1000000000000000" name="دين لغيث عثمان" date="31/12/2023"/>
                            <Payment type="دين" value="1000000000000000" name="دين لغيث عثمان" date="31/12/2023"/>
                            <Payment type="دين" value="1000000000000000" name="دين لغيث عثمان" date="31/12/2023"/>
                            <Payment type="دين" value="1000000000000000" name="دين لغيث عثمان" date="31/12/2023"/>
                            
                            

                        </div>

                    </div>
                )
            }


           

        </div>
    </>
  )
}

export default Dashboard