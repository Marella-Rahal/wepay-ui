import React from 'react'

const Activity = (props) => {
  return (
        <div className='p-3 rounded-lg shadow-cardShadow flex flex-col-reverse items-center md:flex-row md:justify-between md:space-x-3 text-center text-[12px] xs:text-sm'>

            <div className='flex flex-col items-center mt-3 md:mt-0 md:w-[150px]'>
                <span> : التاريخ والوقت  </span>
                {props.date}
            </div>

            <div className='flex flex-col items-center mt-3 md:mt-0 md:w-[200px]'>
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
                {
                    props.type == "سحب" && (
                        <span> : قيمة السحب </span>
                    )
                }        
                {props.value} SYP
            </div>
            
            <span className='self-center mt-3 md:mt-0 md:w-[250px]'>{props.msg}</span>

            <span className='self-center md:w-[150px]'>   نوع النشاط : {props.type}</span>

        </div>
  )
}

export default Activity