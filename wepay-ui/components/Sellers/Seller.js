import React from 'react'

const Seller = (props) => {
  return (
    <div
    style={{ boxShadow: "0px 0px 5px 5px rgba(0,0,0,0.15)" }}
    className='flex flex-col-reverse items-center text-center sm:text-end sm:justify-end sm:flex-row sm:space-x-3 p-3 text-effectColor dark:text-textColor2 font-semibold hover:text-textColor2 hover:bg-gradient-to-r from-gradientFrom to-gradientTo rounded-lg cursor-pointer'>
        <div className='flex flex-col space-y-2 justify-center'>
            <span>{props.name}</span>
            <span className='text-[12px]'>{props.type}</span>
            <span className='text-[12px]'>{props.address}</span>
        </div>
        <img src={props.img} className="w-[80px]"/>
    </div>
  )
}

export default Seller