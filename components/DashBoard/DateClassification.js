import React from 'react';
import { useState } from 'react';
import {AiFillCaretDown} from 'react-icons/ai';

const DateClassification = (props) => {
  
  const [visible,setVisible]=useState(false);

  const handleDateFilter = (filterType) => {

    const sortedData=[...props.filtered];

    if(filterType == 'NTO'){
      
      sortedData.sort( (a,b)=> ( props.type == 'action' ? new Date(b.createdAt) : new Date(b.paymentDate) ) - ( props.type == 'action' ? new Date(a.createdAt) : new Date(a.paymentDate) ) )
      
    }else{

      sortedData.sort( (a,b)=> ( props.type == 'action' ? new Date(a.createdAt) : new Date(a.paymentDate) ) - ( props.type == 'action' ? new Date(b.createdAt) : new Date(b.paymentDate) ) )

    }

    props.setFiltered( sortedData );

    setVisible(false);

  }

  

  return (
    <div className='relative w-fit text-[12px] md:text-base select-none'>

        <div onClick={ () => setVisible(prev=>!prev) } className='p-2 rounded-lg shadow-cardShadow flex space-x-3 items-end cursor-pointer hover:scale-[1.05]'>

          <div>
            <AiFillCaretDown className='w-4 h-4 md:w-5 md:h-5'/>
          </div>
          <div>تصنيف حسب التاريخ</div>
        
        </div>

        <div className={` ${ visible ? 'flex' : 'hidden' } absolute bg-textColor2 rounded-md flex-col text-sm font-semibold text-center`}>
            <div className='p-3 rounded-t-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2 border-b-[1px] border-textColor' onClick={()=>handleDateFilter("NTO")}>من الأحدث إلى الأقدم</div>
            <div className='p-3 rounded-b-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2' onClick={()=>handleDateFilter("OTN")}>من الأقدم إلى الأحدث</div>
        </div>

    </div>
  )
}

export default DateClassification