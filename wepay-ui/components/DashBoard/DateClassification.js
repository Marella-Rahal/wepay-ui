import React from 'react';
import {AiFillCaretDown} from 'react-icons/ai';

const DateClassification = () => {
  return (
    <div className='relative group w-fit text-[12px] md:text-base'>

        <div className='p-2 rounded-lg shadow-cardShadow flex space-x-3 items-end cursor-pointer group-hover:scale-[1.05]'>

          <div>
            <AiFillCaretDown className='w-4 h-4 md:w-5 md:h-5'/>
          </div>
          <div>تصنيف حسب التاريخ</div>
        
        </div>

        <div className='hidden group-hover:flex absolute bg-textColor2 rounded-md flex-col font-bold text-center'>
            <div className='p-3 rounded-t-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2 border-b-[1px] border-textColor'>من الأحدث إلى الأقدم</div>
            <div className='p-3 rounded-b-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2'>من الأقدم إلى الأحدث</div>
        </div>

    </div>
  )
}

export default DateClassification