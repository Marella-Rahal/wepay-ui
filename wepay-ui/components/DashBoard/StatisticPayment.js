import React from 'react'

const StatisticPayment = (props) => {
  return (
        <div className='px-2 py-4 text-[12px] xs:text-sm rounded-lg shadow-cardShadow flex flex-col-reverse items-center md:flex-row md:space-x-3 md:justify-between text-center md:h-40'>
            <div className='flex flex-col space-y-3 mt-3 md:mt-0'>
                {
                    (props.type != "قسط شهري" ) && (
                        <button className='text-[12px] xs:text-base p-1 px-3 self-center md:self-start'>ادفع الآن</button>
                    )
                }
                <div className='flex flex-col space-y-2 md:space-y-0 md:max-w-[100px]'>
                    <span className='dark:text-effectColor'> آخر موعد للدفع</span>
                    <span> {props.date}</span>
                </div>          
            </div>
            <div className='flex flex-col space-y-3 md:text-end'>
                <div>{props.msg}</div>
                <div className='flex flex-col space-y-2 md:space-y-0'>
                    <span className='dark:text-effectColor'> قيمة الدفعة</span>
                    <span>{props.value} SYP </span> 
                </div>
            </div>
        </div>
  )
}

export default StatisticPayment