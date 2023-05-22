import React from 'react'

const ContactUs = () => {
  return (
    <form className='bg-bgColor shadow-bgShadow w-full pt-14 flex flex-col space-y-10'>

        <div className='px-4 md:px-8 flex flex-col-reverse md:flex-row md:space-x-10 md:justify-between'>
            <textarea
            id='textarea'
            required 
            placeholder='محتوى الرسالة'
            className='md:w-1/2 text-end px-2 py-1 bg-transparent border-2 border-gray-500 rounded-lg outline-none mt-16 md:mt-0 h-36 md:h-auto dark:text-textColor2'
            />

            <div className='md:w-1/2 flex flex-col space-y-10'>
                <input 
                type="text"
                required 
                placeholder='الاسم الكامل' className='bg-transparent border-b-2 border-gray-500 outline-none rounded-none dark:text-textColor2'/>
                <input 
                type="email"
                required 
                placeholder='البريد الإلكتروني' className='bg-transparent border-b-2 border-gray-500 outline-none rounded-none dark:text-textColor2'/>
                <input 
                type="text"
                required 
                placeholder='الموضوع' 
                className='bg-transparent border-b-2 border-gray-500 outline-none rounded-none dark:text-textColor2'/>

            </div>
        </div>

        <button className='self-center'>إرسال</button>

        <div className='border-t-2 border-gray-400 py-5 md:pr-8 flex flex-col-reverse md:flex-row md:justify-between md:space-x-5 items-center'>
            <div>
                <img src='../../logo.svg' className='w-32 md:w-40 h-20'/>
            </div>

            <div className="font-bold text-end flex flex-col items-center"> 
             جميع الحقوق محفوظة
             <span>2023 &copy;</span>
            </div>
        </div>

        <style jsx>{`
        
            /* width */
            #textarea::-webkit-scrollbar {
                width: 0px;
                height:0px;
            }

        `}</style>

    </form>
  )
}

export default ContactUs