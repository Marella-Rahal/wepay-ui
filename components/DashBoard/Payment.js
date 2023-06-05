import React from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';

const Payment = (props) => {

  const router=useRouter();
  const cookies =parseCookies();
  const token = cookies.token;
  
  const deletePayment = async () => {

    const id = props.id ;

    try {

        props.setSendingStatus(true);

        const res = await axios.delete(`${process.env.server_url}/api/v1.0/payment/deletePayment/${id}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        props.setStatistic( prev => ({ 
            ...prev ,
            lastPayments : res.data.lastPayments !== undefined ? res.data.lastPayments : []
        }))

        props.setAllPayments( prev => prev.filter( p => p._id !== id) )

        props.setSendingStatus(false);
        
    } catch (error) {

        props.setSendingStatus(false);

        alert(error?.response?.data?.message)
        
    }

  }

  return (
    <div dir='ltr' className='rounded-xl shadow-cardShadow px-3 py-5 flex flex-col space-y-10 w-full md:justify-between md:h-60 md:w-[350px] text-[12px] xs:text-sm text-textColor dark:text-textColor2 my-5 md:mx-3'>

        <div className='flex flex-col space-y-3'>

            <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                <span>{props.paymentType} </span> 
                : نوع الدفعة
            </span>

            <span className='flex flex-wrap-reverse justify-center md:justify-end'>   
                <span> {props.paymentValue} SYP </span> 
                : قيمة الدفعة 
            </span>
            <span className='flex flex-wrap-reverse justify-center md:justify-end'>   
                <span> {props.paymentInfo} </span> 
                : تفاصيل الدفعة 
            </span>
            <span className='flex flex-wrap-reverse justify-center md:justify-end'>   
                <span> {props.date} </span> 
                 : آخر موعد للدفع
            </span>

        </div>

        <div className={ props.isPayable == 0 ? 'flex justify-center' : 'flex justify-center space-x-3 md:justify-between' }>
            <button className='py-1 px-3' onClick={deletePayment}>حذف الدفعة</button>
            {
               ( props.isPayable == 1 ) && (
                    <button className='py-1 px-3' onClick={()=>router.push('/shippingAndPayment')}>ادفع الآن</button>
               )
            }
            
        </div>

    </div>
  )
}

export default Payment