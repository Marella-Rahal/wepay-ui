import React from 'react'

const StatisticActivity = (props) => {
  return (
    <div className='px-2 py-4 text-center md:text-end text-[12px] xs:text-sm text-textColor dark:text-textColor2 rounded-lg shadow-cardShadow flex flex-col-reverse items-center md:flex-row md:justify-between  md:space-x-3 md:h-[88px]'>
        <div className='self-center text-center mt-3 md:mt-0'>{props.value} SYP</div>
        <div>{props.msg}</div>
    </div>
  )
}

export default StatisticActivity