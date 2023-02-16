import React from 'react'

const Transfer = () => {
  return (
    <form className='w-full lg:w-[90%] xl:w-[70%] flex flex-col space-y-20 justify-between text-sm text-end text-effectColor font-bold'>

        <div className='flex flex-col space-y-5'>

        <div className='flex space-x-3 items-center'>
            <label className='w-1/2 pr-3'>أعد إدخال كود التحويل</label>
            <label className='w-1/2 pr-3'>كود التحويل</label>
        </div>

        <div className='flex space-x-3'>
            <input type="number" required className='w-1/2 outline-none shadow-lg text-start'/>
            <input type="number" required className='w-1/2 outline-none shadow-lg text-start'/>
        </div>

        <div className='flex space-x-3 items-center'>
            <label className='w-1/2 pr-3'>أعد إدخال  المبلغ المراد إرساله</label>
            <label className='w-1/2 pr-3'>المبلغ المراد إرساله</label>
        </div>

        <div className='flex space-x-3'>
            <input type="number" required className='w-1/2 outline-none shadow-lg text-start'/>
            <input type="number" required className='w-1/2 outline-none shadow-lg text-start'/>
        </div>

        <label className='pr-3'>PIN ادخل رمز ال</label>
        <input type="number" required className='outline-none shadow-lg text-start'/>

        </div>

        <button className='w-[60%] self-center lg:self-start'>ادفع الآن</button>

    </form>
  )
}

export default Transfer