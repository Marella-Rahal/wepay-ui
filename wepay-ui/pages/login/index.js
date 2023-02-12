import Link from 'next/link';
import React from 'react';
import Navbar from '../../components/Navbar';

const Login = () => {
  return (
    <>

        <Navbar/>
        <div className='pt-28 px-4 md:px-8 pb-14 bg-bgColor shadow-bgShadow w-full min-h-screen flex flex-col space-y-20 items-center md:space-y-0 md:flex-row md:space-x-10 md:justify-between'>

            <div className='w-full md:w-1/2 flex items-center justify-center'>
                <img src='login.svg'/>
            </div>

            <div className='w-full md:w-[550px] flex flex-col space-y-14 text-center'>

                <div className='flex flex-col space-y-7'>
                    <h2>تسجيل الدخول لحسابك الشخصي</h2>
                    <Link href="/signup" className='text-[#8488ED] hover:underline
                    '>لا تملك حساب ؟ قم بالتسجيل و الاشتراك الآن</Link>
                </div>

                <form className='py-14 px-5 shadow-lg shadow-gray-400 rounded-lg flex flex-col space-y-10'>

                    <input type="email" required placeholder='البريد الإلكتروني' className='outline-none shadow-lg'/>
                    <input type="password" required placeholder='كلمة السر' className='outline-none shadow-lg'/>
                    <input type="number" required placeholder='PIN' className='outline-none shadow-lg text-start'/>

                    
                    <div className='flex justify-between items-center space-x-5'>
                        <Link href="/login/forgetPassword" className='text-[#8488ED] hover:underline'>هل نسيت كلمة السر</Link>

                        <button>تسجيل الدخول</button>
                    </div>

                </form>
                
                

            </div>

        </div>

    </>
  )
}

export default Login