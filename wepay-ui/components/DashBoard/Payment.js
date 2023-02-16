import React from 'react';
import {useRouter} from 'next/router';

const Payment = (props) => {
  const router=useRouter()  
  return (
    <div className='rounded-xl shadow-cardShadow px-3 py-5 flex flex-col space-y-10 w-full md:justify-between md:h-60 md:w-[350px] text-[12px] xs:text-sm my-5 md:mx-3'>

        <div className='flex flex-col space-y-3'>

            <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                <span>{props.type} </span> 
                : نوع الدفعة
            </span>

            <span className='flex flex-wrap-reverse justify-center md:justify-end'>   
                <span> {props.value} SYP </span> 
                : قيمة الدفعة 
            </span>
            <span className='flex flex-wrap-reverse justify-center md:justify-end'>   
                <span> {props.name} </span> 
                : اسم الدفعة 
            </span>
            <span className='flex flex-wrap-reverse justify-center md:justify-end'>   
                <span> {props.date} </span> 
                 : آخر موعد للدفع
            </span>

        </div>

        <div className={props.type=='قسط شهري'?'flex justify-center':'flex justify-center space-x-3 md:justify-between'}>
            <button className='py-1 px-3'>حذف الدفعة</button>
            {
               ( props.type != "قسط شهري" ) && (
                    <button className='py-1 px-3' onClick={()=>router.push('/shippingAndPayment')}>ادفع الآن</button>
               )
            }
            
        </div>

    </div>
  )
}

export default Payment