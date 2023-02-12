import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import {RiLockPasswordLine} from 'react-icons/ri';

const ForgetPassword = () => {
    const [displayCode, setDisplayCode] = useState(false);
    const [displayPwd, setDisplayPwd] = useState(false);
  
    const sendCode = (e) => {
      e.preventDefault();
      setDisplayCode(true);
    };
  
    const checkCode = (e) => {
      e.preventDefault();
      setDisplayPwd(true);
    };
  return (
    <>
        <Navbar/>
        <div className='pt-28 px-4 md:px-8 pb-14 bg-bgColor shadow-bgShadow w-full min-h-screen flex flex-col space-y-20 items-center md:space-y-0 md:flex-row md:space-x-10 md:justify-between'>

            <div className='w-full md:w-1/2 flex items-center justify-center'>
                <img src='../forget_password.svg'/>
            </div>

            <div className='w-full md:w-[550px] flex flex-col space-y-5 text-center py-10 px-5 shadow-lg shadow-gray-400 rounded-lg'>

                <RiLockPasswordLine data-aos="fade-down" className='text-effectColor text-[30px] self-center'/>

                <form className='flex flex-col space-y-5' onSubmit={sendCode}>
                    <input data-aos="fade-right" type="email" required placeholder='البريد الإالكتروني' className='outline-none shadow-lg'/>
                    <button data-aos="fade-up" className='self-center'>ارسل الكود</button>
                </form>

                {
                    displayCode && (
                        <form className='flex flex-col space-y-5' onSubmit={checkCode}>
                            <input data-aos="fade-right" type="number" required placeholder='ادخل الكود الذي تم إرساله إليك' className='outline-none shadow-lg'/>
        
                            <button data-aos="fade-up" className='self-center'> تحقق من الكود</button>
                        </form>
                    )
                }

                {
                    displayPwd && (
                        <form className='flex flex-col space-y-5' onSubmit={(e)=>e.preventDefault()}>
                            <input data-aos="fade-right" type="password" required placeholder='ادخل كلمة المرور' className='outline-none shadow-lg'/>
                            <input data-aos="fade-right" type="password" required placeholder='أكد كلمة المرور' className='outline-none shadow-lg'/>
                            <button data-aos="fade-up" className='self-center'>تحديث كلمة المرور</button>
                        </form>
                    )
                }

            </div>

        </div>
    </>
  )
}

export default ForgetPassword