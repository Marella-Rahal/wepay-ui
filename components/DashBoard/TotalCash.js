import React from 'react'

const TotalCash = ({children, balance, totalIncome, totalPayment}) => {
  return (
    <div className='w-full md:w-1/2 xl:w-1/3 shadow-cardShadow rounded-lg p-5 flex flex-col space-y-10 text-center font-bold'>
            <div className='flex pb-5 border-b-[1px] border-effectColor'>

                <div className='h-24 px-2 w-1/2 flex flex-col justify-center space-y-3 border-r-[1px] border-effectColor text-[12px] xs:text-sm'>
                    <span> إجمالي الصرف </span>
                    <span>{totalPayment} SYP</span>
                </div>

                <div className='h-24 px-2 w-1/2 flex flex-col justify-center space-y-3 text-[12px] xs:text-sm'>
                    <span> إجمالي الدخل </span>
                    <span>{totalIncome} SYP</span>
                </div>

            </div>

            <div className='h-24 pb-10 px-2 border-b-[1px] border-effectColor text-[12px] xs:text-sm flex flex-col space-y-3'>        
                <span> رصيد الحساب </span>  
                <span>{balance} SYP</span>
            </div>

            {children}

    </div>
  )
}

export default TotalCash