import React from 'react'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import { AiFillClockCircle } from 'react-icons/ai'

const Activity = (props) => {
  return (
        <div className='p-3 rounded-lg shadow-cardShadow flex flex-col-reverse items-center md:flex-row md:justify-between md:space-x-3 text-center text-[12px] xs:text-sm'>

            <div className='flex flex-col items-center mt-3 md:mt-0 md:w-1/5'>
                <span> :  حالة النشاط  </span>
                <div className='flex items-center space-x-2'>
                    {
                        props.status ? (
                            <>
                                <span>تمت بنجاح</span>
                                <IoCheckmarkDoneCircle className='text-effectColor text-[18px]'/>
                            </>
                        ) : (
                            <>
                                <span>قيد المعالجة</span>
                                <AiFillClockCircle className='text-[15px]'/>
                            </>
                        )
                    }
                    
                </div>
                
            </div>

            <div className='flex flex-col items-center mt-3 md:mt-0 md:w-1/5'>
                <span> : التاريخ والوقت  </span>
                {props.date}
            </div>

            <div className='flex flex-col items-center mt-3 md:mt-0 md:w-1/5'>
                {
                    props.type == "دفع المتجر" && (
                        <span> : قيمة الدفع </span>
                    )
                }

                {
                    props.type == "تحويل" && (
                        <span> : قيمة التحويل </span>
                    )
                }

                {
                    props.type == "شحن" && (
                        <span> : قيمة الشحن </span>
                    )
                }

                {
                    props.type == "استلام رصيد" && (
                        <span> : قيمة الاستلام </span>
                    )
                }
                {
                    props.type == "سحب" && (
                        <span> : قيمة السحب </span>
                    )
                }        
                {props.value} SYP
            </div>
            
            <span className='self-center mt-3 md:mt-0 md:w-1/5'>{props.msg}</span>

            <span className='self-center md:w-1/5'> نوع النشاط : {props.type}</span>

        </div>
  )
}

export default Activity