import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Payment from '../components/DashBoard/Payment';
import PriceClassification from '../components/DashBoard/PriceClassification';
import DateClassification from '../components/DashBoard/DateClassification';
import Activity from '../components/DashBoard/Activity';
import StatisticPayment from '../components/DashBoard/StatisticPayment';
import StatisticActivity from '../components/DashBoard/StatisticActivity';
import ChartClassification from '../components/DashBoard/ChartClassification';
import TotalCash from '../components/DashBoard/TotalCash';
import BarChart from '../components/DashBoard/BarChart';
import {motion} from 'framer-motion';

const yearlyData = {

    labels: [
      "Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec",
    ],
    datasets: [
      {
        label:"إجمالي الصرف خلال هذا الشهر ",
        data:[
          200,30,40,60,20,35,20,30,40,60,20,35,
        ],
        backgroundColor:["#3fb37f","#8488ED"],
        hoverBackgroundColor:["#29b23d","#565bd0"],
        borderRadius:10,
      }
    ]
  
}

const Dashboard = () => {

    //todo to visulize the data on chart
    const [chartClass,setChartClass]=useState(yearlyData);

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
                <div className='w-full md:w-1/2 xl:w-2/3 h-[550px] md:min-h-full flex flex-col space-y-5 mt-10 md:mt-0'>

                    <ChartClassification setChartClass={setChartClass}/>
                    <BarChart data={chartClass}/>
                

                </div>
                {/* //! right section */}
                
                <TotalCash>
                        
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

                </TotalCash>


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
                    <motion.div initial={{opacity:0}} animate={{opacity:1}}
                    transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex flex-col items-center space-y-10 md:space-y-0 md:flex-row md:space-x-10 md:justify-evenly text-end'>

                        {/* //! left section */}
                        <div className='md:p-5 md:rounded-lg md:shadow-cardShadow w-full md:w-1/2 xl:w-1/3 flex flex-col space-y-5 text-effectColor dark:text-textColor2 font-bold'>
                
                            <div className='self-end pb-2 border-b-[2px] border-effectColor text-effectColor'>
                            : آخر الأنشطة
                            </div>
                            
                            <StatisticActivity msg="دفع لمتجر أبو عبدو ماركت" value="+1000000000000"/>
                            <StatisticActivity msg="دفع لمتجر أبو عبدو ماركت" value="-1000000000000"/>
                            <StatisticActivity msg="دفع لمتجر أبو عبدو ماركت" value="-1000000000000"/>
                            <StatisticActivity msg="دفع لمتجر أبو عبدو ماركت" value="+1000000000000"/>
                            <StatisticActivity msg="دفع لمتجر أبو عبدو ماركت" value="+1000000000000"/>


                            <button className='text-[12px] xs:text-base self-start p-1 px-3' onClick={()=>setDashboardInfo("activity")}>عرض الكل</button>
                        </div>
                        {/* //!right section */}
                        <div className='md:p-5 md:rounded-lg md:shadow-cardShadow w-full md:w-1/2 xl:w-1/3 flex flex-col space-y-5 text-effectColor dark:text-textColor2 font-bold'>
        
                            {/* ************** */}
                            <div className='self-end pb-2 border-b-[2px] border-effectColor text-effectColor'>
                            : أهم المدفوعات المستحقة 
                            </div>

                            <StatisticPayment type="قسط شهري" msg="دين لمتجر أبو عبدو ماركت" value="1000000000000" date="31/12/2023"/>
                            <StatisticPayment type="دين" msg="دين لمتجر أبو عبدو ماركت" value="10000000000000" date="دفع كل شهر/ متبقي 29 أيام"/>
                            <StatisticPayment type="دين" msg="دين لمتجر " value="10000000" date="--/--/--"/>
                
                            <div className='flex space-x-3 justify-between'>
                                <button className='text-[12px] xs:text-base p-1 px-3' onClick={()=>setDashboardInfo("payment")}>عرض الكل</button>
                                <button className='text-[12px] xs:text-base p-1 px-3'>إضافة المزيد</button>
                            </div>
                        </div>
                    </motion.div>
                )
            }

            {/* //! third section activity */}

            {
                ( dashboardInfo == "activity" ) && (
                    
                    <motion.div initial={{opacity:0}} animate={{opacity:1}}
                    transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex flex-col space-y-10 items-center text-effectColor dark:text-textColor2 font-bold text-center'>
                        {/* ******************** */}
                        <div className='md:w-full flex flex-col-reverse items-center md:flex-row md:justify-end md:space-x-10'>

                            <div className='flex space-x-10 mt-10 md:mt-0'>

                                <div className={typeOfAct=="withdraw"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo"} onClick={()=>setTypeOfAct("withdraw")}>عمليات  السحب</div>


                                <div className={typeOfAct=="shipping"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo"} onClick={()=>setTypeOfAct("shipping")}>عمليات الشحن</div>

                            </div>

                            <div className='flex space-x-10 mt-10 md:mt-0'>

                                <div className={typeOfAct=="transfer"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo"} onClick={()=>setTypeOfAct("transfer")}>عمليات التحويل</div>

        
                                <div className={typeOfAct=="payAct"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo"} onClick={()=>setTypeOfAct("payAct")}>عمليات الدفع للمتاجر</div>

                            </div>

                            <div className='flex space-x-10'>

                                <div className={typeOfAct=='recieve'?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo"} onClick={()=>setTypeOfAct("recieve")}>عمليات استلام الرصيد</div>

            
                                <div className={typeOfAct=="allOperation"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo"} onClick={()=>setTypeOfAct("allOperation")}> كل العمليات </div>

                            </div>
    
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
                         
                    </motion.div>
                )
            }


            {/* //! third section payment */}

            {
                (dashboardInfo == 'payment') && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}}
                    transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex flex-col space-y-10 items-center text-effectColor dark:text-textColor2 font-bold text-center'>

                        {/* ******************** */}
                        <div className='md:w-full flex flex-col-reverse items-center md:flex-row md:justify-end md:space-x-10'>

                            <div className={typeOfPayment=='otherPayment'?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo mt-10 md:mt-0"} onClick={()=>setTypeOfPayment("otherPayment")}>مدفوعات أخرى  </div>

                            <div className='flex space-x-10 mt-10 md:mt-0'>

                                <div className={typeOfPayment=="storeDebt"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo"} onClick={()=>setTypeOfPayment("storeDebt")}>ديون المتاجر  </div>
            
                                <div className={typeOfPayment=="monthlyPayment"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo "} onClick={()=>setTypeOfPayment("monthlyPayment")}> الأقساط الشهرية</div>

                            </div>

                            <div className='flex space-x-10'>

                                <div className={typeOfPayment=="debt"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo "} onClick={()=>setTypeOfPayment("debt")}> الديون</div>
            
                                <div className={typeOfPayment=="allPayment"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo':"p-2 rounded-lg shadow-cardShadow hover:text-textColor2 cursor-pointer hover:bg-gradient-to-b from-gradientFrom to-gradientTo"} onClick={()=>setTypeOfPayment("allPayment")}> كل الدفوعات </div>

                            </div>
        

                        </div>
                        {/* ********************* */}
                        <div className='md:w-full flex flex-col space-y-10 items-center md:space-y-0 md:flex-row md:justify-between md:space-x-5 text-textColor dark:text-textColor2 font-normal'>

                            <PriceClassification/>

                            <button>إضافة مدفوعات أخرى</button>

                            <DateClassification/>


                        </div>
                        {/* *********************** */}
                        <div className='w-full flex flex-col md:flex-row md:justify-evenly md:flex-wrap'>


                            <Payment type="دين" value="1000000000000000" name="دين لغيث عثمان" date="31/12/2023"/>
                            <Payment type="قسط شهري" value="1000000000000000" name="دين لغيث عثمان" date="دفع كل شهر/ متبقي 3 أيام"/>
                            <Payment type="دين" value="1000000000000000" name="دين لغيث عثمان" date="31/12/2023"/>
                            <Payment type="دين" value="1000000000000000" name="دين لغيث عثمان" date="31/12/2023"/>
                            <Payment type="دين" value="1000000000000000" name="دين لغيث عثمان" date="31/12/2023"/>
                            <Payment type="دين" value="1000000000000000" name="دين لغيث عثمان" date="31/12/2023"/>
                            <Payment type="دين" value="1000000000000000" name="دين لغيث عثمان" date="31/12/2023"/>
                            
                            

                        </div>

                    </motion.div>
                )
            }


           

        </div>
    </>
  )
}

export default Dashboard