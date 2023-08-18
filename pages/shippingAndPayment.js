import React, { useState } from 'react'
import Activity from '../components/DashBoard/Activity';
import TotalCash from '../components/DashBoard/TotalCash';
import Navbar from '../components/Navbar';
import {motion} from 'framer-motion';
import Transfer from '../components/ShippingAndPayment/Transfer';
import WithdrawHaram from '../components/ShippingAndPayment/WithdrawHaram';
import WithdrawSyriatel from '../components/ShippingAndPayment/WithdrawSyriatel';
import ShippingBimo from '../components/ShippingAndPayment/ShippingBimo';
import ShippingSyriatel from '../components/ShippingAndPayment/ShippingSyriatel';
import WithdrawBimo from '../components/ShippingAndPayment/WithdrawBimo';
import ShippingHaram from '../components/ShippingAndPayment/ShippingHaram';
import { parseCookies ,setCookie } from 'nookies';
import axios from 'axios';
import FailToGet from '../components/FailToGet'
import Lottie from "lottie-react";
import emptyResult from "../public/empty.json";
import { ThreeDots } from 'react-loader-spinner'
import NotePopUp, { showPopUpNote } from '../components/PopUp/NotePopUp'
import { wrapper } from '../Redux/Store';
import { saveUser } from '../Redux/Slices/userSlice';
import ShippingRequests from '../components/ShippingAndPayment/ShippingRequests';
import WithdrawRequests from '../components/ShippingAndPayment/WithdrawRequests';
import { useRouter } from 'next/router';
import ShoppingoPopUp from '../components/PopUp/ShoppingoPopUp';

const ShippingAndPayment = (props) => {

  const router = useRouter();
  const { objects } = router.query;

  const cookies = parseCookies();
  const token = cookies.token;
  const role = cookies.role;
  const [sendingStatus,setSendingStatus]=useState(false);
  const [noteMsg,setNoteMsg]=useState("");  

  const [shippingAndPaymentInfo,setShippingAndPaymentInfo]=useState('transfer');
  const [typeOfShipping,setTypeOfShipping]=useState('general');
  const [typeOfWithdraw,setTypeOfWithdraw]=useState('general');

  const [actions,setActions]=useState(props.actions)
  const [shippingActions,setShippingActions]=useState()
  const [withdrawActions,setWithdrawActions]=useState()

  const getShippingActions = async () => {

    if(shippingActions === undefined){

      try {
      
          setSendingStatus(true);

          if(role !== 'admin'){

              const res= await axios.get(`${process.env.server_url}/api/v1.0/transaction/getActions?actionType=deposit`, {
                headers : {
                  Authorization : `Bearer ${token}`
                }
              })
        
              const info = res.data.data;

              info !== undefined ? setShippingActions(info.slice(0,5)) : setShippingActions([]) ;

          }else{

              const res= await axios.get(`${process.env.server_url}/api/v1.0/transaction/getAllDepositRequest`, {
                headers : {
                  Authorization : `Bearer ${token}`
                }
              })
              
              const info = res.data.depositRequests;

              info !== undefined ? setShippingActions(info) : setShippingActions([]) ;

          }
    
          setShippingAndPaymentInfo("shipping");

          setSendingStatus(false);
  
      } catch (error) {

          setSendingStatus(false);
    
          setSendingStatus(false);
    
          setNoteMsg(<h5 className='text-red-600 text-center'>
            {
                error?.response?.data?.message !== undefined ? error?.response?.data?.message : error?.message
            }
          </h5>)

          showPopUpNote();
        
      }

    }else{

      setShippingAndPaymentInfo("shipping")

    }

  }

  const getWithdrawActions = async () => {

    if(withdrawActions === undefined){

      try {
      
          setSendingStatus(true);

          if(role !== 'admin'){

              const res= await axios.get(`${process.env.server_url}/api/v1.0/transaction/getActions?actionType=withdraw`, {
                headers : {
                  Authorization : `Bearer ${token}`
                }
              })
        
              const info = res.data.data;
        
              info !== undefined ? setWithdrawActions(info.slice(0,5)) : setWithdrawActions([]) ;

          }else{

              const res= await axios.get(`${process.env.server_url}/api/v1.0/transaction/getAllWithdrawRequest`, {
                headers : {
                  Authorization : `Bearer ${token}`
                }
              })
              
              const info = res.data.withdrawRequest;
        
              info !== undefined ? setWithdrawActions(info) : setWithdrawActions([]) ;

          }
    
          setShippingAndPaymentInfo("withdraw");

          setSendingStatus(false);
  
      } catch (error) {

          setSendingStatus(false);
    
          setNoteMsg(<h5 className='text-red-600 text-center'>
            {
                error?.response?.data?.message !== undefined ? error?.response?.data?.message : error?.message
            }
          </h5>)

          showPopUpNote();
        
      }

    }else{

      setShippingAndPaymentInfo("withdraw")

    }

  }

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
              {
                objects !== undefined && (
                  <ShoppingoPopUp objects={JSON.parse(objects)} setNoteMsg={setNoteMsg} setSendingStatus={setSendingStatus}/>
                )
              } 
              <Navbar/>
              <div className='pt-28 pb-14 px-4 md:px-8 w-full min-h-screen bg-bgColor shadow-bgShadow flex flex-col space-y-10'>

                {/* //!first section */}
                <div className='flex flex-col-reverse md:flex-row md:space-x-10'>

                  {/* //!left section */}

                  <div className='w-full md:w-1/2 xl:w-2/3 rounded-lg shadow-cardShadow mt-10 md:mt-0 p-5 flex md:min-h-[532px]'>

                      {
                        ( shippingAndPaymentInfo == 'transfer' || role === 'admin' ) && (

                              <motion.div initial={{opacity:0}} animate={{opacity:1}}
                              transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex justify-center'>

                                <Transfer setSendingStatus={setSendingStatus} setNoteMsg={setNoteMsg} setActions={setActions}/>

                              </motion.div>

                        )
                      }

                      {/* //! end of transfer section */}

                      {
                        ( shippingAndPaymentInfo == 'shipping' && typeOfShipping == 'general' && role !== 'admin' ) && (

                            <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex flex-col space-y-10 md:space-y-20 items-center text-center font-semibold'>

                              <span className='w-[90%] md:w-[50%]'>اختر طريقة الشحن المستخدمة</span>

                              <button className='w-[90%] md:w-[80%] md:py-5' onClick={()=>setTypeOfShipping('haram')}>شركة الهرم للحوالات المالية</button>
                              <button className='w-[90%] md:w-[80%] md:py-5' onClick={()=>setTypeOfShipping('syriatel')}>Syriatel Cash سيرياتيل كاش </button>
                              <button className='w-[90%] md:w-[80%] md:py-5' onClick={()=>setTypeOfShipping('bimo')}>بنك بيمو السعودي الفرنسي</button>

                            </motion.div>

                        )
                      }

                      {
                        (shippingAndPaymentInfo == 'shipping' && typeOfShipping == 'haram') && (
                          <motion.div initial={{opacity:0}} animate={{opacity:1}}
                          transition={{ ease: "easeInOut", duration: 1 }} className="w-full">

                            <ShippingHaram setTypeOfShipping={setTypeOfShipping} setSendingStatus={setSendingStatus} setNoteMsg={setNoteMsg} setShippingActions={setShippingActions}/>  

                          </motion.div>
                        )
                      }

                      {
                        (shippingAndPaymentInfo == 'shipping' && typeOfShipping == 'syriatel') && (
                          <motion.div initial={{opacity:0}} animate={{opacity:1}}
                          transition={{ ease: "easeInOut", duration: 1 }} className="w-full flex justify-end">

                            <ShippingSyriatel setTypeOfShipping={setTypeOfShipping} setSendingStatus={setSendingStatus} setNoteMsg={setNoteMsg} setShippingActions={setShippingActions}/>

                          </motion.div>
                        )
                      }

                      {
                        (shippingAndPaymentInfo == 'shipping' && typeOfShipping == 'bimo') && (
                          <motion.div initial={{opacity:0}} animate={{opacity:1}}
                          transition={{ ease: "easeInOut", duration: 1 }} className="w-full flex justify-end">

                            <ShippingBimo setTypeOfShipping={setTypeOfShipping} setSendingStatus={setSendingStatus} setNoteMsg={setNoteMsg} setShippingActions={setShippingActions}/>

                          </motion.div>
                        )
                      }

                      {/* //! end of shipping section */}

                      {
                        ( shippingAndPaymentInfo == 'withdraw' && typeOfWithdraw == 'general' && role !== 'admin' ) && (

                            <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex flex-col space-y-10 md:space-y-20 items-center text-center font-semibold'>

                              <span className='w-[90%] md:w-[50%]'>اختر طريقة السحب المستخدمة</span>

                              <button className='w-[90%] md:w-[80%] md:py-5' onClick={()=>setTypeOfWithdraw('haram')}>شركة الهرم للحوالات المالية</button>
                              <button className='w-[90%] md:w-[80%] md:py-5' onClick={()=>setTypeOfWithdraw('syriatel')}>Syriatel Cash سيرياتيل كاش </button>
                              <button className='w-[90%] md:w-[80%] md:py-5' onClick={()=>setTypeOfWithdraw('bimo')}>بنك بيمو السعودي الفرنسي</button>

                            </motion.div>

                        )
                      }

                      {
                        (shippingAndPaymentInfo == 'withdraw' && typeOfWithdraw == 'haram') && (
                          <motion.div initial={{opacity:0}} animate={{opacity:1}}
                          transition={{ ease: "easeInOut", duration: 1 }} className="w-full flex justify-end">

                            <WithdrawHaram setTypeOfWithdraw={setTypeOfWithdraw} setSendingStatus={setSendingStatus} setNoteMsg={setNoteMsg} setWithdrawActions={setWithdrawActions}/>                     

                          </motion.div>
                        )
                      }

                      {
                        (shippingAndPaymentInfo == 'withdraw' && typeOfWithdraw == 'syriatel') && (
                          <motion.div initial={{opacity:0}} animate={{opacity:1}}
                          transition={{ ease: "easeInOut", duration: 1 }} className="w-full flex justify-end">

                            <WithdrawSyriatel setTypeOfWithdraw={setTypeOfWithdraw} setSendingStatus={setSendingStatus} setNoteMsg={setNoteMsg} setWithdrawActions={setWithdrawActions}/>

                          </motion.div>
                        )
                      }

                      {
                        (shippingAndPaymentInfo == 'withdraw' && typeOfWithdraw == 'bimo') && (
                          <motion.div initial={{opacity:0}} animate={{opacity:1}}
                          transition={{ ease: "easeInOut", duration: 1 }} className="w-full flex justify-end">

                            <WithdrawBimo setTypeOfWithdraw={setTypeOfWithdraw} setSendingStatus={setSendingStatus} setNoteMsg={setNoteMsg} setWithdrawActions={setWithdrawActions}/>

                          </motion.div>
                        )
                      }

                      {/* //! end of withdraw section */}

                  </div>    

                  {/* //!right section */}

                  <TotalCash>

                        <div className={shippingAndPaymentInfo=="transfer"?'text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow cursor-pointer h-10 flex justify-center items-center':"text-effectColor dark:text-textColor2 hover:border-[1px] border-effectColor rounded-lg shadow-cardShadow cursor-pointer h-10 flex justify-center items-center"} 
                        onClick={()=>setShippingAndPaymentInfo("transfer")}>
                                  الدفع و التحويل 
                        </div>

                        <div className={shippingAndPaymentInfo=='shipping'?'text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow cursor-pointer h-10 flex justify-center items-center':'text-effectColor dark:text-textColor2 hover:border-[1px] border-effectColor rounded-lg shadow-cardShadow cursor-pointer h-10 flex justify-center items-center'} 
                        onClick={getShippingActions}>
                          {
                            role !== 'admin' ? 'شحن الرصيد' : 'طلبات الشحن'
                          } 
                        </div>

                        <div className={shippingAndPaymentInfo=='withdraw'?'text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo rounded-lg shadow-cardShadow cursor-pointer h-10 flex justify-center items-center':'text-effectColor dark:text-textColor2 hover:border-[1px] border-effectColor rounded-lg shadow-cardShadow cursor-pointer h-10 flex justify-center items-center'}
                        onClick={getWithdrawActions}>
                          {
                            role !== 'admin' ? 'سحب الرصيد' : 'طلبات السحب'
                          } 
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
                                  transition={{ ease: "easeInOut", duration: 1 }} className='self-end text-end pb-2 text-effectColor border-b-[2px] border-effectColor'>آخر عمليات الدفع والتحويل</motion.div>

                              <motion.div initial={{opacity:0}} animate={{opacity:1}}
                                  transition={{ ease: "easeInOut", duration: 1 }} className='w-full flex flex-col space-y-10 [&>*:nth-child(even)]:bg-effectColor [&>*:nth-child(even)]:text-textColor2'>

                                  {
                                      ( actions.length !== 0 ) ? (

                                        actions.map((action,index)=>{
                                          const formattedDate= new Date(action.createdAt).toLocaleString();
                                          return <Activity key={index} type={action.senderAction} msg={action.senderDetails} value={action.amountValue} date={formattedDate} status={action.status}/>
                                        })

                                      ) : (

                                        <div className='flex justify-center items-center'>
                                          <Lottie animationData={emptyResult} loop={true} />
                                        </div>

                                      )
                                  }

                              </motion.div>

                          </>
                        )
                      }

                      {
                        ( shippingAndPaymentInfo == 'shipping' ) && (
                          <>

                              <motion.div 
                              initial={{opacity:0}} animate={{opacity:1}}
                              transition={{ ease: "easeInOut", duration: 1 }} className='self-end text-end pb-2 text-effectColor border-b-[2px] border-effectColor'>
                              {
                                role !== 'admin' ? 'آخر عمليات الشحن' : 'طلبات الشحن'
                              }      
                              </motion.div>

                              <motion.div
                              dir={role !== 'admin' ? 'ltr' : 'rtl'} 
                              initial={{opacity:0}} animate={{opacity:1}}
                              transition={{ ease: "easeInOut", duration: 1 }} className={ role !== 'admin' ? 'w-full flex flex-col space-y-10 [&>*:nth-child(even)]:bg-effectColor [&>*:nth-child(even)]:text-textColor2' : 'w-full flex flex-col md:flex-row md:justify-evenly md:flex-wrap' }>

                                  {
                                      ( shippingActions.length !== 0 ) ? (

                                        shippingActions.map((action,index)=>{
                                          const formattedDate= new Date(action.createdAt).toLocaleString();
                                          return (
                                            role !== 'admin' 
                                            ? <Activity 
                                                key={index} 
                                                type={action.reciverAction} 
                                                msg={action.reciverDetails} 
                                                value={action.amountValue} 
                                                date={formattedDate} 
                                                status={action.status}/> 
                                            : <ShippingRequests 
                                                key={index}
                                                id={action._id}
                                                type={action.processType}
                                                value={action.amountValue}
                                                date={formattedDate}
                                                processImageUrl={action.processImageUrl}
                                                processNumber={action.processNumber}
                                                city={action.senderCity}
                                                name={action.senderName}
                                                phone={action.senderPhone}
                                                accountID={action.accountID}
                                                setSendingStatus={setSendingStatus}
                                                setActions={setActions}
                                                setShippingActions={setShippingActions}
                                              />
                                          )
                                        })

                                      ) : (

                                        <div className='flex justify-center items-center'>
                                          <Lottie animationData={emptyResult} loop={true} />
                                        </div>

                                      )
                                  }

                              </motion.div>
                          
                          </>
                        )
                      }

                      {
                        ( shippingAndPaymentInfo == "withdraw" ) && (

                          <>

                              <motion.div 
                              initial={{opacity:0}} animate={{opacity:1}}
                              transition={{ ease: "easeInOut", duration: 1 }} className='self-end text-end pb-2 text-effectColor border-b-[2px] border-effectColor'>
                              {
                                role !== 'admin' ? 'آخر عمليات السحب' : 'طلبات السحب'
                              }
                              </motion.div>

                              <motion.div
                              dir={role !== 'admin' ? 'ltr' : 'rtl'} 
                              initial={{opacity:0}} animate={{opacity:1}}
                              transition={{ ease: "easeInOut", duration: 1 }} className={ role !== 'admin' ? 'w-full flex flex-col space-y-10 [&>*:nth-child(even)]:bg-effectColor [&>*:nth-child(even)]:text-textColor2' : 'w-full flex flex-col md:flex-row md:justify-evenly md:flex-wrap' }>

                                  {
                                      ( withdrawActions.length !== 0 ) ? (

                                        withdrawActions.map((action,index)=>{
                                          const formattedDate= new Date(action.createdAt).toLocaleString();
                                          return (
                                            role !== 'admin' 
                                            ? <Activity 
                                                key={index} 
                                                type={action.senderAction} 
                                                msg={action.senderDetails} 
                                                value={action.amountValue} 
                                                date={formattedDate} 
                                                status={action.status}/>
                                            : <WithdrawRequests 
                                                key={index}
                                                id={action._id}
                                                type={action.processType}
                                                value={action.amountValue}
                                                date={formattedDate}
                                                city={action.reciverCity}
                                                name={action.reciverName}
                                                phone={action.reciverPhone}
                                                accountID={action.accountID}
                                                cashType={action.cashType}
                                                setSendingStatus={setSendingStatus}
                                                setWithdrawActions={setWithdrawActions}/> 
                                          )
                                        })

                                      ) : (

                                        <div className='flex justify-center items-center'>
                                          <Lottie animationData={emptyResult} loop={true} />
                                        </div>

                                      )
                                  }

                              </motion.div>

                          </>

                        )
                      }


                </div>

              </div>
            </>
          ) : (
            <FailToGet/>
          )
        }
    </>
  )
}

export default ShippingAndPayment

export const getServerSideProps = wrapper.getServerSideProps( store => async (context) =>{

    const cookies=parseCookies(context);
    const token=cookies.token;

    const {objects} = context.query;
    if(objects !== undefined){
      const objects1 = JSON.parse(objects);
      var queryString = encodeURIComponent(JSON.stringify(objects1))
    }

    try {

          const res = await axios.get(`${process.env.server_url}/api/v1.0/transaction/getShipping`,{
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
              actions : res.data.actions !== undefined ? res.data.actions : [] 
            }
          }
  
    } catch (error) {

          if(error?.response?.status == 401){

            return {
              redirect: {
                destination: objects !== undefined ? `/login?objects=${queryString}` : '/login',
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
