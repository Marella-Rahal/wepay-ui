import React from 'react'

const ShippingBimo = (props) => {
  return (
    <form className='w-full lg:w-[90%] xl:w-[70%] flex flex-col space-y-10 justify-between items-end text-end text-sm'>

        <div className='flex flex-col space-y-5 w-full xl:w-fit'>

            <div className='text-effectColor text-md md:text-lg'>بنك بيمو السعودي الفرنسي</div>


        </div>

        <div className='w-full flex space-x-5'>
            <button className='w-1/2 py-1 md:py-2'>تأكيد العملية</button> 
            <button className='w-1/2 py-1 md:py-2' onClick={()=>props.setTypeOfShipping('general')}>الرجوع</button>
        </div>

    </form>
  )
}

export default ShippingBimo