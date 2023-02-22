import React from 'react'

const ShippingSyriatel = (props) => {
  return (
    <form className='w-full lg:w-[90%] xl:w-[70%] flex flex-col space-y-10 justify-between items-end text-end text-sm'>

        <div className='flex flex-col space-y-5 w-full xl:w-fit'>

            {/* //! one */}
            <div className='flex flex-col space-y-3'>
                <div className='text-effectColor text-md md:text-lg'>   سيرياتيل كاش - syriatel cash</div>

                <diV>: بيانات استقبال الرصيد</diV>

                <div>رقم المستقبل : 0912345678</div>

                <div>نوع حساب المستقبل : حساب تاجر , الدفع اليدوي</div>
            </div>

            {/* //! two */}

            <div className='flex flex-col space-y-3'>
                <label className='text-effectColor pr-2'>رقم المرسل</label>
                <input type="number" required className='outline-none shadow-lg text-start'/>
            </div>

            {/* //! three */}
            <div className='flex flex-col space-y-3'>
                <label className='text-effectColor pr-2'>قيمة المبلغ  المرسل</label>
                <input type="number" required className='outline-none shadow-lg text-start'/>
            </div>

            {/* //! four */}
            <div className='flex flex-col space-y-3'>
                <label className='text-effectColor pr-2'>رقم عملية التحويل</label>
                <input type="number" required className='outline-none shadow-lg text-start'/>
            </div>

        </div>

        <div className='w-full flex space-x-5'>
            <button className='w-1/2 py-1 md:py-2'>تأكيد العملية</button> 
            <button className='w-1/2 py-1 md:py-2' onClick={()=>props.setTypeOfShipping('general')}>الرجوع</button>
        </div>

    </form>
  )
}

export default ShippingSyriatel