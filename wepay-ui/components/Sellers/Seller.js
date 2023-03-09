import React from 'react'

const Seller = (props) => {
  return (
    <div
    dir="ltr"
    style={{ boxShadow: "0px 0px 5px 5px rgba(0,0,0,0.15)" }}
    className={props.storeId==props.id?'flex items-center text-end justify-end space-x-3 p-3 font-semibold text-textColor2 bg-gradient-to-r from-gradientFrom to-gradientTo border-[2px] border-l-gradientFrom border-r-gradientTo border-y-transparent rounded-lg cursor-pointer min-h-fit':'flex items-center text-end justify-end space-x-3 p-3 font-semibold text-effectColor dark:text-textColor2 border-[2px] border-transparent hover:border-effectColor rounded-lg cursor-pointer min-h-fit'}
    onClick={
      ()=>props.id==props.storeId?props.setStoreId(''):props.setStoreId(props.id)
    }
    >
        <div className='flex flex-col'>
            <span>{props.name}</span>
            <span className='text-[10px] sm:text-[12px]'>{props.type}</span>
            <span className='text-[10px] sm:text-[12px]'>{props.address}</span>
        </div>
        <img src={props.img} className="w-[80px]"/>
    </div>
  )
}

export default Seller