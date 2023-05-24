import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import {RiLockPasswordLine} from 'react-icons/ri';
import {motion} from 'framer-motion';

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

            <div className='w-full md:w-[550px] flex flex-col space-y-5 text-center p-5 shadow-cardShadow rounded-lg'>

                <RiLockPasswordLine className='text-effectColor text-[30px] self-center'/>

                <form className='flex flex-col space-y-5' onSubmit={sendCode}>
                    <input type="email" required placeholder='البريد الإالكتروني' className='outline-none shadow-lg'/>
                    <button className='self-center'>ارسل الكود</button>
                </form>

                {
                    displayCode && (
                        <motion.form initial={{opacity:0,y:'-100%'}} animate={{opacity:1,y:'0'}} transition={{ ease: "easeInOut", duration: 0.3 }} className='flex flex-col space-y-5' onSubmit={checkCode}>
                            <input type="number" required placeholder='ادخل الكود الذي تم إرساله إليك' className='outline-none shadow-lg'/>
        
                            <button className='self-center'> تحقق من الكود</button>
                        </motion.form>
                    )
                }

                {
                    displayPwd && (
                        <motion.form initial={{opacity:0,y:'-100%'}} animate={{opacity:1,y:'0'}} transition={{ ease: "easeInOut", duration: 0.3 }} className='flex flex-col space-y-5' onSubmit={(e)=>e.preventDefault()}>
                            <input type="password" required placeholder=' ادخل كلمة المرور الجديدة' className='outline-none shadow-lg'/>
                            <input type="password" required placeholder='أكد كلمة المرور الجديدة' className='outline-none shadow-lg'/>
                            <input type="number" required placeholder='PIN' className='outline-none shadow-lg text-start'/>
                            <button className='self-center'>تحديث كلمة المرور</button>
                        </motion.form>
                    )
                }

            </div>

        </div>
    </>
  )
}

export default ForgetPassword