import React from 'react'

const Payment = () => {
  return (
    <div className='bg-bgColor shadow-bgShadow w-full px-4 md:px-8 py-14 flex flex-col-reverse items-center md:flex-row md:justify-between md:space-x-10 text-end'>
        <div
         data-aos="zoom-in"
         className='flex flex-col space-y-5 items-end font-bold'>

            <span>: ارسل و استقبل المال  عن طريق</span>
            
            <span>بالكاميرا مباشرة QRCode فحص رمز </span>

            <span>او الارسال عن طريق الكود المخصص لكل مستخدم</span>

            <button>ادفع الآن</button>

            <div className='flex'>
                <img src='../../appleStore.svg'className='cursor-pointer hover:scale-[1.1] w-24'/>
                <img src='../../googlePlay.svg' className='cursor-pointer hover:scale-[1.1] w-32 -mr-2'/>
            </div>

        
        </div>

        <div className='flex flex-col space-y-10 items-center md:space-y-0 md:flex-row md:space-x-10 mb-14 md:mb-0 w-full md:w-2/3'>
            <img
              data-aos="zoom-in"
             src="../../payment1.svg" className='w-full md:w-1/2 h-40'/>
            <img
              data-aos="zoom-in"
             src="../../payment2.svg" className='w-full md:w-1/2 h-40'/>
        </div>
        
    </div>
  )
}

export default Payment