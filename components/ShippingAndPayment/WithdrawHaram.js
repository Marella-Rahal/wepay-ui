import React from 'react'

const WithdrawHaram = (props) => {
  return (
    <form className='w-full lg:w-[90%] xl:w-[70%] flex flex-col space-y-10 justify-between items-end text-end text-sm'>

        <div className='w-full flex flex-col space-y-7'>

            {/* //! one */}

            <div className='flex flex-col space-y-3'>

                <div className='text-effectColor text-md md:text-lg'> شركة الهرم للحوالات المالية</div>

                <diV>: بيانات استلام الرصيد</diV>

                <div>اسم المرسل : علي حسن الديوب</div>

                <div>رقم المرسل : 0912345678</div>

            </div>

            {/* //! two */}

            <div className='w-full flex flex-col space-y-3'>

                <div className='w-full flex space-x-5 items-center text-effectColor'>
                    <label className='w-1/2 pr-2'>قيمة المبلغ</label>
                    <label className='w-1/2 pr-2'>اسم المستقبل</label>
                </div>

                <div className='w-full flex space-x-5 items-center'>
                    <input type='number' required className='outline-none shadow-lg w-1/2 text-start'/>
                    <input type='text' required className='outline-none shadow-lg w-1/2'/>
                </div>

            </div>

            {/* //! three */}

            <div className='w-full flex flex-col space-y-3'>

                <div className='w-full flex space-x-5 items-center text-effectColor'>
                    <label className='w-1/2 pr-2'>وجهة الحوالة</label>
                    <label className='w-1/2 pr-2'>رقم هاتف المستقبل</label>
                </div>

                <div className='w-full flex space-x-5 items-center'>
                    <input type='text' required className='outline-none shadow-lg w-1/2'/>
                    <input type='number' required className='outline-none shadow-lg w-1/2 text-start'/>
                </div>

            </div>

            {/* //! four */}

            <input type='number' required placeholder='PIN' className='outline-none shadow-lg w-full text-start'/>


        </div>  

        <div className='w-full flex space-x-5'>
            <button className='w-1/2 py-1 md:py-2'>تأكيد العملية</button> 
            <button className='w-1/2 py-1 md:py-2' onClick={()=>props.setTypeOfWithdraw('general')}>الرجوع</button>
        </div>

    </form>
  )
}

export default WithdrawHaram