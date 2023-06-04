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
import { wrapper } from '../Redux/Store';
import { parseCookies, setCookie } from 'nookies';
import axios from 'axios';
import { saveUser, selectUser } from '../Redux/Slices/userSlice';
import FailToGet from '../components/FailToGet';
import NotePopUp from '../components/PopUp/NotePopUp';
import Lottie from "lottie-react";
import emptyResult from "../public/empty.json";
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';
import { useEffect } from 'react';

const yearlyData ={

    labels: [
      "Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec",
    ],
    datasets: [
      {
        label:"إجمالي الصرف خلال هذا الشهر ",
        data:Array(12).fill(0),
        backgroundColor:["#3fb37f","#8488ED"],
        hoverBackgroundColor:["#29b23d","#565bd0"],
        borderRadius:10,
      }
    ]
  
  }
const Dashboard = (props) => {

    const cookies = parseCookies();
    const token = cookies.token;
    const user=useSelector(selectUser);
    const [sendingStatus,setSendingStatus]=useState(false);
    const [chartStatus,setChartStatus]=useState(false);
    const [noteMsg,setNoteMsg]=useState("");

    //todo to visulize the data on chart
    const [yearlyData,setYearlyData]=useState({

        labels: [
          "Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec",
        ],
        datasets: [
          {
            label:"إجمالي الصرف خلال هذا الشهر ",
            data:Array(12).fill(0),
            backgroundColor:["#3fb37f","#8488ED"],
            hoverBackgroundColor:["#29b23d","#565bd0"],
            borderRadius:10,
          }
        ]
      
    });
    const [chartClass,setChartClass]=useState(()=>{
        props?.chartData?.forEach( element => {
            yearlyData.datasets[0].data[element._id - 1] = element.totalAmount
        });
        return yearlyData
    });

    //todo what type of payment are displayed
    const [typeOfPayment,setTypeOfPayment]=useState('allPayment');
    //todo what type of atctivity are displayed
    const [typeOfAct,setTypeOfAct]=useState('allOperation');
    //todo what info are displayed 
   const [dashboardInfo,setDashboardInfo]=useState("statistic");


    const [statistic,setStatistic]=useState({
        lastActivities : props.lastActivities,
        lastPayments : props.lastPayments
    });

    const [allActions,setAllActions]=useState();
    const [filteredActions,setFilteredActions]=useState([]);

    const getAllActions = async () => {

        if(allActions === undefined){

            try {

                setSendingStatus(true);

                const res= await axios.get(`${process.env.server_url}/api/v1.0/transaction/getActions`, {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })

                if(res.data.data !== undefined){
                    setAllActions(res.data.data);
                    setFilteredActions(res.data.data);
                }else{
                    setAllActions([]);
                    setFilteredActions([]);
                }
        
                setDashboardInfo("activity");

                setSendingStatus(false);
                
            } catch (error) {

                setSendingStatus(false);

                alert(error?.response?.data?.message)  

            }

        }else{

            setDashboardInfo("activity");

        }

    }

    const handleFilteredActions = (filterType) => {

        if(filterType == 'recieve'){

            setFilteredActions(allActions.filter(a => a.reciverAction=='استلام رصيد' && user._id == a.reciver));

        }else if(filterType == 'payAct'){

            setFilteredActions(allActions.filter(a => a.senderAction=='دفع المتجر' && user._id == a.sender));
            
        }else if(filterType == 'transfer'){

            setFilteredActions(allActions.filter(a => a.senderAction=='تحويل' && user._id == a.sender));

        }else if(filterType == 'withdraw'){

            setFilteredActions(allActions.filter(a => a.senderAction=='سحب' && user._id == a.sender));

        }else if(filterType == 'shipping'){

            setFilteredActions(allActions.filter(a => a.reciverAction=='شحن' && user._id == a.reciver));

        }else {

            setFilteredActions(allActions)

        }

        setTypeOfAct(filterType);
        
    }

    //* 𝗥𝗲𝗮𝗰𝘁-𝗣𝗮𝗴𝗶𝗻𝗮𝘁𝗲 *********************************************************

    const [activityPerPage,setActivityPerPage]=useState(5);

    const [currentPage, setCurrentPage] = useState(0); // Current page state
    const [activityDisplayed, setActivityDisplayed] = useState( filteredActions.slice(0,activityPerPage) );
    const [FirstArrow, setFirstArrow] = useState(false);
    const [LastArrow, setLastArrow] = useState(filteredActions.length > activityPerPage);

    //* 𝗰𝗵𝗮𝗻𝗴𝗶𝗻𝗴 𝘁𝗵𝗲 𝗳𝗶𝗿𝘀𝘁𝗔𝗿𝗿𝗼𝘄 , 𝗹𝗮𝘀𝘁𝗔𝗿𝗿𝗼𝘄 , 𝗰𝘂𝗿𝗿𝗲𝗻𝘁𝗣𝗮𝗴𝗲 𝗮𝗻𝗱 𝘁𝗵𝗲 𝗱𝗲𝗹𝗲𝗴𝗮𝘁𝗲𝘀𝗗𝗶𝘀𝗽𝗹𝗮𝘆𝗲𝗱 𝗯𝗮𝘀𝗲𝗱 𝗼𝗻 𝘁𝗵𝗲 𝗻𝗲𝘄 𝘀𝗲𝗹𝗲𝗰𝘁𝗲𝗱 𝗱𝗮𝘁𝗮

    const handleChange = (data) => {

        // 𝗳𝗼𝗿 𝗹𝗲𝗳𝘁 𝗮𝗿𝗿𝗼𝘄
        if ( data.selected == 0 ) setFirstArrow(false);
        else setFirstArrow(true);

        // 𝗳𝗼𝗿 𝗿𝗶𝗴𝗵𝘁 𝗮𝗿𝗿𝗼𝘄
        if ( data.selected == ( Math.ceil(filteredActions.length / activityPerPage) - 1 ) ) setLastArrow(false);
        else setLastArrow(true);

        setCurrentPage(data.selected)

        setActivityDisplayed(filteredActions.slice(data.selected * activityPerPage, data.selected * activityPerPage + activityPerPage));

    };

    //* 𝗰𝗵𝗮𝗻𝗴𝗶𝗻𝗴 𝘁𝗵𝗲 𝗳𝗶𝗿𝘀𝘁𝗔𝗿𝗿𝗼𝘄 , 𝗹𝗮𝘀𝘁𝗔𝗿𝗿𝗼𝘄 , 𝗰𝘂𝗿𝗿𝗲𝗻𝘁𝗣𝗮𝗴𝗲 𝗮𝗻𝗱 𝘁𝗵𝗲 activityDisplayed 𝗯𝗮𝘀𝗲𝗱 𝗼𝗻 𝘁𝗵𝗲 𝗻𝗲𝘄 𝗶𝗻𝗳𝗼

    useEffect(()=>{

        setCurrentPage(0);

        setActivityDisplayed(filteredActions.slice(0,activityPerPage))

        setFirstArrow(false);

        setLastArrow(filteredActions.length > activityPerPage)

    },[filteredActions])

    //*************************************************************************/
 
  return (
    <>
        {
            props.success ? (
                <>
                    { 
                        sendingStatus && (
                        <div className='fixed z-[100] w-full h-full bg-black/30 flex justify-center items-center'>
                            <ThreeDots
                            width="75"
                            color="white"
                            visible={true}
                            /> 
                        </div>
                        )
                    }
                    <NotePopUp noteMsg={noteMsg}/>
                    <Navbar/>
                    <div className='pt-28 pb-14 px-4 md:px-8 w-full min-h-screen bg-bgColor shadow-bgShadow flex flex-col space-y-10'>

                        {/* //! first Section */}
                        <div className='flex flex-col-reverse md:flex-row md:space-x-10'>
                            {/* //! left section */}
                            <div className='relative w-full md:w-1/2 xl:w-2/3 h-[550px] md:min-h-full flex flex-col mt-10 md:mt-0'>

                                {
                                    chartStatus && (
                                    <div className='absolute z-10 w-full h-full bg-black/20 rounded-md flex justify-center items-center'>
                                        <ThreeDots
                                        width="75"
                                        color="white"
                                        visible={true}
                                        /> 
                                    </div>          
                                    )
                                }
                                <ChartClassification yearlyData={yearlyData} setChartClass={setChartClass} setChartStatus={setChartStatus}/>
                                <BarChart data={chartClass}/>
                            

                            </div>
                            {/* //! right section */}
                            
                            <TotalCash>
                                    
                                <div className={dashboardInfo=="statistic"?'text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow cursor-pointer h-10 flex justify-center items-center':"text-effectColor dark:text-textColor2 hover:border-[1px] border-effectColor rounded-lg shadow-cardShadow cursor-pointer h-10 flex justify-center items-center"} 
                                onClick={()=>setDashboardInfo("statistic")}>
                                        أهم الإحصائيات
                                </div>

                                <div className={dashboardInfo=='activity'?'text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow cursor-pointer h-10 flex justify-center items-center':'text-effectColor dark:text-textColor2 hover:border-[1px] border-effectColor rounded-lg shadow-cardShadow cursor-pointer h-10 flex justify-center items-center'} 
                                onClick={getAllActions}>
                                        كل الأنشطة
                                </div>

                                <div className={dashboardInfo=='payment'?'text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow cursor-pointer h-10 flex justify-center items-center':'text-effectColor dark:text-textColor2 hover:border-[1px] border-effectColor rounded-lg shadow-cardShadow cursor-pointer h-10 flex justify-center items-center'}
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
                                transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex flex-col space-y-10 md:space-y-0 md:flex-row md:space-x-10 md:justify-evenly text-end'>

                                    {/* //! left section */}
                                    <div className='md:p-5 md:rounded-lg md:shadow-cardShadow w-full md:w-1/2 xl:w-1/3 flex flex-col justify-between space-y-5 text-effectColor dark:text-textColor2 '>
                            
                                        <div className='self-end pb-2 border-b-[2px] border-effectColor text-effectColor font-bold'>
                                        : آخر الأنشطة
                                        </div>

                                        {
                                            statistic.lastActivities.length !== 0 ? (
                                                statistic.lastActivities.map((activity,index)=>{
                                                    return <StatisticActivity
                                                            key={index} 
                                                            msg={ user._id == activity.sender ? activity.senderDetails : activity.reciverDetails } 
                                                            value={activity.amountValue}/>
                                                })
                                            ) : (
                                                <div className='flex justify-center h-full'>
                                                    <Lottie animationData={emptyResult} loop={true} />
                                                </div>
                                            )
                                        }
                                        {
                                            statistic.lastActivities.length !== 0 && (
                                                <button className='text-[12px] xs:text-base self-start p-1 px-3' onClick={getAllActions}>عرض الكل</button>
                                            )
                                        }

                                    </div>
                                    {/* //!right section */}
                                    <div className='md:p-5 md:rounded-lg md:shadow-cardShadow w-full md:w-1/2 xl:w-1/3 flex flex-col justify-between space-y-5 text-effectColor dark:text-textColor2'>
                    
                                        {/* ************** */}
                                        <div className='self-end pb-2 border-b-[2px] border-effectColor text-effectColor font-bold'>
                                        : أهم المدفوعات المستحقة 
                                        </div>

                                        {
                                            statistic.lastPayments.length !== 0 ? (
                                                statistic.lastPayments.map((payment,index)=>{
                                                    const formattedDate= new Date(payment.createdAt).toLocaleString();
                                                    return <StatisticPayment
                                                            key={index} 
                                                            type={payment.paymentType} 
                                                            msg={payment.paymentInfo} 
                                                            value={payment.paymentValue} 
                                                            date={formattedDate}/>
                                                })
                                                
                                            ) : (
                                                <div className='flex justify-center items-center'>
                                                    <Lottie animationData={emptyResult} loop={true} />
                                                </div>
                                            )
                                        }
                            
                                        <div className='flex space-x-3 justify-between'>
                                            {
                                                statistic.lastPayments.length !== 0 && (
                                                    <button className='text-[12px] xs:text-base p-1 px-3' onClick={()=>setDashboardInfo("payment")}>عرض الكل</button>
                                                )
                                            }
                                            <button className='text-[12px] xs:text-base p-1 px-3' onClick={()=>setDashboardInfo("addPayment")}>إضافة المزيد</button>
                                        </div>

                                    </div>
                                </motion.div>
                            )
                        }

                        {/* //! third section activity */}

                        {
                            ( dashboardInfo == "activity" ) && (
                                
                                <motion.div initial={{opacity:0}} animate={{opacity:1}}
                                transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex flex-col space-y-10 items-center text-effectColor dark:text-textColor2 text-center'>

                                    {/* ******************** */}

                                    <div dir='rtl' className='w-full h-20 rounded-lg text-[12px] md:text-sm overflow-x-auto XScrollbar flex items-center justify-between font-bold'>


                                            <div className={typeOfAct=="allOperation"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo min-w-[100px]':"p-2 rounded-lg shadow-cardShadow cursor-pointer hover:border-[1px] border-effectColor min-w-[100px]"} onClick={()=>handleFilteredActions("allOperation")}> كل العمليات </div>


                                            <div className={typeOfAct=='recieve'?'mr-3 p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo min-w-[155px]':"mr-3 p-2 rounded-lg shadow-cardShadow cursor-pointer hover:border-[1px] border-effectColor min-w-[155px]"} onClick={()=>handleFilteredActions("recieve")}>عمليات استلام الرصيد</div>


                                            <div className={typeOfAct=="payAct"?'mr-3 p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo min-w-[155px]':"mr-3 p-2 rounded-lg shadow-cardShadow cursor-pointer hover:border-[1px] border-effectColor min-w-[155px]"} onClick={()=>handleFilteredActions("payAct")}>عمليات الدفع للمتاجر</div>

                                            <div className={typeOfAct=="transfer"?'mr-3 p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo min-w-[120px]':"mr-3 p-2 rounded-lg shadow-cardShadow cursor-pointer hover:border-[1px] border-effectColor min-w-[120px]"} onClick={()=>handleFilteredActions("transfer")}>عمليات التحويل</div>

                                        
                                            <div className={typeOfAct=="withdraw"?'mr-3 p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo min-w-[120px]':"mr-3 p-2 rounded-lg shadow-cardShadow cursor-pointer hover:border-[1px] border-effectColor min-w-[120px]"} onClick={()=>handleFilteredActions("withdraw")}>عمليات  السحب</div>


                                            <div className={typeOfAct=="shipping"?'mr-3 p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo min-w-[120px]':"mr-3 p-2 rounded-lg shadow-cardShadow cursor-pointer hover:border-[1px] border-effectColor min-w-[120px]"} onClick={()=>handleFilteredActions("shipping")}>عمليات الشحن</div>

                    
                                    </div>
                                    {/* ********************* */}
                                    <div className='w-full flex items-center justify-between space-x-5 text-textColor dark:text-textColor2'>

                                        <PriceClassification setFiltered={setFilteredActions} filtered={filteredActions}/>
                                        
                                        <DateClassification setFiltered={setFilteredActions} filtered={filteredActions}/>
                                        
                                    </div>
                                    {/* *********************** */}
                                    <div className='w-full flex flex-col space-y-10 [&>*:nth-child(even)]:bg-effectColor
                                    [&>*:nth-child(even)]:text-textColor2'>

                                        {   
                                            filteredActions.length !== 0 ? (
                                                
                                                activityDisplayed.map((activity,index)=>{
                                                    const formattedDate= new Date(activity.createdAt).toLocaleString();
                                                    return <Activity
                                                            key={index} 
                                                            type={ user._id == activity.sender ? activity.senderAction : activity.reciverAction }
                                                            msg={ user._id == activity.sender ? activity.senderDetails : activity.reciverDetails } 
                                                            value={activity.amountValue} 
                                                            date={formattedDate}
                                                            status={activity.status}/>
                                                })     
                                                
                                            ) : (
                                                <div className='flex justify-center items-center'>
                                                    <Lottie animationData={emptyResult} loop={true} />
                                                </div>
                                            )
                                            
                                        }
                                    
                                    </div>

                                    <ReactPaginate
                                        breakLabel={<span>...</span>}
                                        nextLabel={
                                            LastArrow && (
                                            <BsChevronRight />
                                            )
                                        }
                                        forcePage={currentPage} // Set the current active page
                                        onPageChange={handleChange}
                                        pageRangeDisplayed={1} // Display 1 page buttons on either side of the active page button
                                        marginPagesDisplayed={1} // Display 1 page button on either side of the first and last page buttons
                                        pageCount={ Math.ceil(filteredActions.length / activityPerPage) }
                                        previousLabel={
                                            FirstArrow && (
                                            <BsChevronLeft />
                                            )
                                        }
                                        containerClassName="flex items-center justify-center space-x-1 md:space-x-3 pt-3 text-[grey] dark:text-white"
                                        pageClassName="text-[grey] bg-textColor2 text-sm flex items-center justify-center rounded-lg px-3 py-2 select-none"
                                        activeClassName="text-[white] bg-gradient-to-b from-gradientTo to-gradientTo"
                                    />
                                    
                                </motion.div>
                            )
                        }


                        {/* //! third section payment */}

                        {
                            (dashboardInfo == 'payment') && (
                                <motion.div initial={{opacity:0}} animate={{opacity:1}}
                                transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex flex-col space-y-10 items-center text-effectColor dark:text-textColor2 text-center'>

                                    {/* ******************** */}
                                    <div dir='rtl' className='w-full h-20 rounded-lg text-[12px] md:text-sm overflow-x-auto XScrollbar flex items-center justify-between font-bold'>


                                        <div className={typeOfPayment=="allPayment"?'p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo min-w-[100px]':"p-2 rounded-lg shadow-cardShadow cursor-pointer hover:border-[1px] border-effectColor min-w-[100px]"} onClick={()=>setTypeOfPayment("allPayment")}> كل الدفوعات </div>

                                        
                                        <div className={typeOfPayment=="debt"?'mr-3 p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo min-w-[100px]':"mr-3 p-2 rounded-lg shadow-cardShadow cursor-pointer hover:border-[1px] border-effectColor min-w-[100px]"} onClick={()=>setTypeOfPayment("debt")}> الديون</div>

                                        <div className={typeOfPayment=="monthlyPayment"?'mr-3 p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo min-w-[120px]':"mr-3 p-2 rounded-lg shadow-cardShadow cursor-pointer hover:border-[1px] border-effectColor min-w-[120px]"} onClick={()=>setTypeOfPayment("monthlyPayment")}> الأقساط الشهرية</div>


                                        <div className={typeOfPayment=="storeDebt"?'mr-3 p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo min-w-[120px]':"mr-3 p-2 rounded-lg shadow-cardShadow cursor-pointer hover:border-[1px] border-effectColor min-w-[120px]"} onClick={()=>setTypeOfPayment("storeDebt")}>ديون المتاجر  </div>

                                        <div className={typeOfPayment=='otherPayment'?'mr-3 p-2 rounded-lg shadow-cardShadow text-textColor2 cursor-pointer bg-gradient-to-b from-gradientFrom to-gradientTo min-w-[120px]':"mr-3 p-2 rounded-lg shadow-cardShadow cursor-pointer hover:border-[1px] border-effectColor min-w-[120px]"} onClick={()=>setTypeOfPayment("otherPayment")}>مدفوعات أخرى  </div>

                        

                                    </div>

                                    {/* ********************* */}

                                    <button className='md:hidden w-full flex justify-center items-center text-[12px]' onClick={()=>setDashboardInfo("addPayment")}>إضافة مدفوعات أخرى</button>

                                    {/* ********************* */}
                                    <div className='w-full flex items-center justify-between space-x-5 text-textColor dark:text-textColor2'>

                                        <PriceClassification/>

                                        <button className='hidden md:flex' onClick={()=>setDashboardInfo("addPayment")}>إضافة مدفوعات أخرى</button>

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

                        {/* //! third section add new payment */}

                        {
                            ( dashboardInfo == 'addPayment' ) && (
                                <motion.form initial={{opacity:0}} animate={{opacity:1}}
                                transition={{ ease: "easeInOut", duration: 1 }} className="flex flex-col space-y-10 text-end text-effectColor" onSubmit={(e)=>e.preventDefault()}>

                                    {/* //! one */}
                                    <div className='self-end pb-2 border-b-[2px] border-effectColor'>
                                        :  إدخال مدفوعات مستحقة
                                    </div>

                                    {/* //! two */}
                                    <div className='flex flex-col space-y-3'>
                                        <div className='w-full flex space-x-5 justify-evenly items-center'>
                                            <label className='w-1/2 md:w-1/3 pr-2'>قيمة الدفعة</label>
                                            <label className='w-1/2 md:w-1/3 pr-2'>نوع الدفعة</label>
                                        </div>

                                        <div className='w-full flex space-x-5 justify-evenly'>

                                            <input type="number" required className='w-1/2 md:w-1/3 outline-none shadow-cardShadow text-start'/>

                                            <select name='typeOfPayment' className='bg-white text-end text-textColor rounded-lg px-3 py-2 w-1/2 md:w-1/3 outline-none shadow-cardShadow'>
                                                <option value="otherPayment">مدفوعات أخرى</option>
                                                <option value="debt">دين</option>
                                                <option value="monthlyPayment">قسط شهري</option>
                                                <option value="storeDebt">دين لمتجر</option>
                                            </select>
                                            
                                        </div>
                                    </div>

                                    {/* //!three */}
                                    <div className='flex flex-col space-y-3'>

                                        <div className='w-full flex space-x-5 justify-evenly items-center'>
                                            <label className='w-1/2 md:w-1/3 pr-2'>تفاصيل الدفعة</label>
                                            <label className='w-1/2 md:w-1/3 pr-2'>آخر موعد للدفعة</label>
                                        </div>

                                        <div className='w-full flex space-x-5 justify-evenly'>

                                            <input type="text" required className='w-1/2 md:w-1/3 outline-none shadow-cardShadow'/>

                                            <input type="date" required className='w-1/2 md:w-1/3 outline-none shadow-cardShadow'/>
                                            
                                        </div>

                                    </div>

                                    <button className='self-center w-1/2 md:w-1/4'>إدخال</button>

                                </motion.form>
                            )
                        }
                    

                    </div>
                </>
            ) : (
                <FailToGet/>
            )
        }
    </>
  )
}

export default Dashboard

export const getServerSideProps = wrapper.getServerSideProps( store => async (context) =>{

    const cookies=parseCookies(context);
    const token=cookies.token;

    try {

          const res = await axios.get(`${process.env.server_url}/api/v1.0/transaction/getDashboard`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setCookie(context, 'role', res.data.user.role, {
            path:'/',
            secure:true,
            sameSite:'none'
          })

          setCookie(context, 'imgURL',res.data.user.imgURL, {
            path:'/',
            secure:true,
            sameSite:'none'
          })

          store.dispatch(saveUser(res.data.user))

          return {
            props : {
              success : true ,
              lastActivities : res.data.lastActivities !== undefined ? res.data.lastActivities : [] ,
              lastPayments : res.data.lastPayments !== undefined ? res.data.lastPayments : [] ,
              chartData : res.data.chartData !== undefined ? res.data.chartData : []
            }
          }
  
    } catch (error) {

          if(error?.response?.status == 401){

            return {
              redirect: {
                destination: '/login',
                permanent: false, // Set to false if it's a temporary redirect
              },
            }

          }else{

              return {
                props : {
                  success : false
                }
              }

          }
      
    }
})