import axios from 'axios';
import { parseCookies } from 'nookies';
import React from 'react'

const WithdrawRequests = (props) => {

  const cookies = parseCookies();
  const token = cookies.token;

  const confirmWithdraw = async () => {

      const id = props.id;

      try {

          props.setSendingStatus(true);  

          const res = await axios.put(`${process.env.server_url}/api/v1.0/transaction/withdrawResponse/${id}`,{},{
                headers : {
                    Authorization : `Bearer ${token}`
                }
          })

          props.setWithdrawActions( prev => prev.filter( a => a._id !== id ) );
          
          props.setSendingStatus(false);
        
      } catch (error) {

          props.setSendingStatus(false);
          
          alert(error?.response?.data?.message);
        
      }

  }

  return (
    <div dir='ltr' className='my-5 md:mx-3 rounded-xl shadow-cardShadow px-3 py-5 flex flex-col space-y-10 md:justify-between w-full md:w-[350px] text-[12px] xs:text-sm text-textColor dark:text-textColor2'>

        <div className='flex flex-col space-y-3 text-center md:text-end'>

            <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                <span> {props.type} </span> 
                : طريقة السحب
            </span>
            <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                <span> {props.value} </span> 
                : قيمة المبلغ المراد سحبه
            </span>
            <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                <span> {props.date} </span> 
                : تاريخ طلب السحب 
            </span>
            {
                props.type == 'سحب-هرم' && (
                    <>
                        <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                                <span> {props.name} </span> 
                                : اسم المستقبل 
                        </span>
                        <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                                <span> {props.phone} </span> 
                                :  رقم المستقبل 
                        </span>
                        <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                                <span> {props.city} </span> 
                                : عنوان المستقبل 
                        </span>    
                    </>
                )
            }
            {
                props.type == 'سحب-كاش' && (
                    <>

                        <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                                <span> {props.phone} </span> 
                                :  رقم المستقبل 
                        </span>
                        <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                                <span> {props.cashType} </span> 
                                : نوع حساب المستقبل 
                        </span>
                    
                    </>
                )
            } 
            {
                props.type == 'سحب-بيمو' && (
                    <>
                        <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                                <span> {props.accountID} </span> 
                                :  رقم حساب بنك بيمو للمستقبل 
                        </span>
                    </>
                )
            } 

        </div>

        <button className='self-center' onClick={confirmWithdraw}>معالجة الطلب</button>

    </div>
  )
}

export default WithdrawRequests