import React from 'react'

const ShippingHaram = (props) => {

  const updateImage=(e)=>{
    if(e.target.files[0]){
        document.getElementById('imgFrame').src=URL.createObjectURL(e.target.files[0]);
    }
  }  

  return (
    <form className='w-full flex flex-col space-y-5 md:space-y-10 justify-between items-end text-end text-sm'>

        <div className='w-full flex flex-col space-y-5'>

            {/* //! one */}
            <div className='flex flex-col space-y-3'>
                <div className='text-effectColor text-md md:text-lg'>شركة الهرم للحوالات المالية</div>
                <div>: بيانات استقبال الرصيد  </div>
                <div>اسم المستقبل : علي حسن الديوب</div>
                <div>رقم المستقبل : 09876543211</div>
            </div>

            {/* //! two */}
            <div className='w-full flex flex-col-reverse md:flex-row'>

                <div className='md:w-1/2 md:pr-3 pt-3 md:py-3 text-effectColor md:border-r-[1px] border-effectColor flex flex-col space-y-3'>

                    <label className='w-full pr-2'>رقم عملية الإرسال</label>
                    <input type="number" required className='outline-none shadow-lg text-start'/>

                    <label className='w-full pr-2'>صورة الوصل</label>

                    <label htmlFor='imgHaram' className='bg-[gray] text-textColor2 shadow-lg rounded-lg px-3 py-2 cursor-pointer text-center'>رفع ملف</label>
                    <input accept="image/*" type='file' required className='hidden' id="imgHaram" onChange={updateImage}/>

                    <img src="shipping.svg" id="imgFrame" className='self-center w-[150px] h-[200px] md:w-[100px] md:h-[90px]'/>


                </div>

                <div className='md:w-1/2 md:pl-3 md:py-3 text-effectColor flex flex-col space-y-3'>

                    <label className='w-full pr-2'>اسم المرسل</label>
                    <input type="text" required className='outline-none shadow-lg'/>

                    <label className='pr-2'>رقم المرسل</label>
                    <input type="number" required className='outline-none shadow-lg text-start'/>

                    <label className='pr-2'>قيمة المبلغ المرسل</label>
                    <input type="number" required className='outline-none shadow-lg text-start'/>

                </div>

            </div>

        </div>

        <div className='w-full flex space-x-5'>
            <button className='w-1/2 py-1 md:py-2'>تأكيد العملية</button>
            <button className='w-1/2 py-1 md:py-2' onClick={()=>props.setTypeOfShipping('general')}>الرجوع</button>
        </div>

    </form>
  )
}

export default ShippingHaram