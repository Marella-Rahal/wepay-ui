import React from 'react';
import {AiFillCaretDown} from 'react-icons/ai';

const PriceClassification = () => {
  return (
        <div className='relative group'>

            <div className='p-2 rounded-lg shadow-cardShadow self-start flex w-[220px] justify-between items-center cursor-pointer group-hover:scale-[1.05]'>
                <AiFillCaretDown className='w-6 h-6'/>
                :  تصنيف حسب السعر
            </div>

            <div className='hidden group-hover:flex absolute bg-textColor2 rounded-md flex-col text-sm font-bold text-center'>
                <div className='p-3 rounded-t-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2 border-b-[1px] border-textColor'>من الأغلى إلى الأرخص</div>
                <div className='p-3 rounded-b-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2'>من الأرخص إلى الأغلى</div>
            </div>

        </div>
  )
}

export default PriceClassification