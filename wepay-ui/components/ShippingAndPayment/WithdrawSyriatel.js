import React from 'react'

const WithdrawSyriatel = (props) => {
  return (
    <form className='w-full lg:w-[90%] xl:w-[70%] flex flex-col space-y-10 justify-between items-end text-end text-sm'>


        <div className='w-full flex flex-col space-y-7'>

            <div className='text-effectColor text-md md:text-lg'>سيرياتيل كاش - syriatel cash</div>

            <div className='w-full flex flex-col space-y-3'>

                <div className='w-full flex space-x-5 items-center text-effectColor'>
                    <label className='w-1/2 pr-2'>قيمة المبلغ</label>
                    <label className='w-1/2 pr-2'>رقم المستقبل</label>
                </div>

                <div className='w-full flex space-x-5 items-center'>
                    <input type='number' required className='outline-none shadow-lg w-1/2 text-start'/>
                    <input type='number' required className='outline-none shadow-lg w-1/2 text-start'/>
                </div>

            </div>

            <div className='w-full flex flex-col space-y-3'>

                <div className='w-full flex space-x-5 items-center text-effectColor'>
                    <label className='w-1/2 pr-2'> PIN رمزك ال</label>
                    <label className='w-1/2 pr-2'>نوع حساب المستقبل</label>
                </div>

                <div className='w-full flex space-x-5 items-center'>
                    <input type='number' required className='outline-none shadow-lg w-1/2 text-start'/>
                    <select name="typeOfAccount" className='outline-none shadow-lg w-1/2 text-end bg-white text-textColor px-3 py-2 rounded-lg'>
                        <option value="seller">حساب تاجر , الدفع اليدوي</option>
                        <option value="user">حساب مستخدم , التحويل اليدوي</option>
                    </select>
                </div>

            </div>

        </div>


        <div className='w-full flex space-x-5'>
            <button className='w-1/2 py-1 md:py-2'>تأكيد العملية</button> 
            <button className='w-1/2 py-1 md:py-2' onClick={()=>props.setTypeOfWithdraw('general')}>الرجوع</button>
        </div>


    </form>
  )
}

export default WithdrawSyriatel