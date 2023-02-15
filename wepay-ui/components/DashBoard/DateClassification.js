import React from 'react';
import {AiFillCaretDown} from 'react-icons/ai';

const DateClassification = () => {
  return (
    <div className='relative group w-fit'>

        <div className='p-2 rounded-lg shadow-cardShadow self-start flex w-[220px] justify-between items-center cursor-pointer group-hover:hover:scale-[1.05]'>
            <AiFillCaretDown className='w-6 h-6'/>
            : تصنيف حسب التاريخ
        </div>

        <div className='hidden group-hover:flex absolute bg-textColor2 rounded-md flex-col text-sm font-bold text-center'>
            <div className='p-3 rounded-t-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2 border-b-[1px] border-textColor'>من الأحدث إلى الأقدم</div>
            <div className='p-3 rounded-b-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2'>من الأقدم إلى الأحدث</div>
        </div>

    </div>
  )
}

export default DateClassification