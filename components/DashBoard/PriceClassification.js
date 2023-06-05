import React from 'react';
import { useState } from 'react';
import {AiFillCaretDown} from 'react-icons/ai';

const PriceClassification = (props) => {

  const [visible,setVisible]=useState(false);

  const handlePriceFilter = (filterType) => {

        const sortedData=[...props.filtered];
    
        if(filterType == 'HTL'){
          
          sortedData.sort( (a,b)=> ( props.type == 'action' ? b.amountValue : b.paymentValue ) - ( props.type == 'action' ? a.amountValue : a.paymentValue ) )
          
        }else{
    
          sortedData.sort( (a,b)=> ( props.type == 'action' ? a.amountValue : a.paymentValue ) - ( props.type == 'action' ? b.amountValue : b.paymentValue ) )
    
        }
    
        props.setFiltered( sortedData );

        setVisible(false);
    
  }  
  return (
        <div className='relative z-10 w-fit text-[12px] md:text-base select-none'>

            <div onClick={ () => setVisible(prev=>!prev) } className='p-2 rounded-lg shadow-cardShadow flex space-x-3 items-end cursor-pointer hover:scale-[1.05]'>    
                <div>
                    <AiFillCaretDown className='w-4 h-4 md:w-5 md:h-5'/>
                </div>
                <div> تصنيف حسب السعر </div>
            </div>

            <div className={` ${ visible ? 'flex' : 'hidden' } absolute bg-textColor2 rounded-md flex-col text-sm font-semibold text-center`}>
                <div className='p-3 rounded-t-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2 border-b-[1px] border-textColor' onClick={()=>handlePriceFilter("HTL")}>من الأغلى إلى الأرخص</div>
                <div className='p-3 rounded-b-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2' onClick={()=>handlePriceFilter("LTH")}>من الأرخص إلى الأغلى</div>
            </div>

        </div>
  )
}

export default PriceClassification