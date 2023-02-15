import React from 'react'

const Activity = (props) => {
  return (
        <div className='p-3 rounded-lg shadow-cardShadow flex flex-col-reverse items-center md:flex-row md:justify-between md:space-x-3 text-[12px] xs:text-sm'>

            <div className='flex flex-col items-center mt-3 md:mt-0'>
                <span> : التاريخ والوقت  </span>
                {props.date}
            </div>

            <div className='flex flex-col items-center mt-3 md:mt-0'>
                {
                    props.type == "دفع لمتجر" && (
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
                    props.type == "استلام" && (
                        <span> : قيمة الاستلام </span>
                    )
                }        
                {props.value} SYP
            </div>
            
            <span className='self-center mt-3 md:mt-0'>{props.msg}</span>

            <span className='self-center'>   نوع النشاط : {props.type}</span>

        </div>
  )
}

export default Activity