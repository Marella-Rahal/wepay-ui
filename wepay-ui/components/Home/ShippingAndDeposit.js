import React from 'react'

const ShippingAndDeposit = () => {
  return (
    <div className='bg-bgColor shadow-bgShadow w-full py-14 px-4 md:px-8 flex flex-col space-y-14 items-center md:space-y-0 md:flex-row md:space-x-10 text-center'>
        <div
        data-aos="zoom-in"
         className='flex flex-col space-y-5 w-[225px] md:w-1/3 md:h-[250px]'>
            <img src='../../shipping_deposit1.svg' className='w-full h-[150px]'/>
            <h3>إيداع بنكي </h3>
        </div>
        <div
        data-aos="zoom-in" 
        className='flex flex-col space-y-5 w-[225px] md:w-1/3 md:h-[250px]'>
            <img src='../../shipping_deposit2.svg' className='w-full h-[150px]'/>
            <h3> التعبئة اليدوية مع الباعة </h3>
        </div>
        <div
        data-aos="zoom-in"
         className='flex flex-col space-y-5 w-[225px] md:w-1/3 md:h-[250px]'>
            <img src='../../shipping_deposit3.svg' className='w-full h-[150px]'/>
            <h3>شركة الهرم للحوالات المالية </h3>
        </div>
    </div>
  )
}

export default ShippingAndDeposit