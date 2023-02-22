import Link from 'next/link';
import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import {motion} from 'framer-motion'

const Signup = () => {

  //todo transition between sign info  
  const [first,setFirst]=useState(true);
  const [second,setSecond]=useState(false);
  const [last,setLast]=useState(false);
  const signChange=(e)=>{
    if(e.target.value=='first'){
        setFirst(true);
        setSecond(false);
        setLast(false);
    }else if(e.target.value=='second'){
        setFirst(false);
        setSecond(true);
        setLast(false);
    }else{
        setFirst(false);
        setSecond(false);
        setLast(true);
    }
  }
  const signNext=()=>{
    if(first==true){
        setFirst(false);
        setSecond(true);
    }else if(second==true){
        setSecond(false);
        setLast(true);
    }
  }
  //todo *****************************

  return (
    <>
        <Navbar/>
        <div className='pt-28 px-4 md:px-8 pb-14 bg-bgColor shadow-bgShadow w-full min-h-screen flex flex-col space-y-20 items-center md:space-y-0 md:flex-row md:space-x-10 md:justify-between'>

            <div className='w-full md:w-1/2 flex items-center justify-center'>
                <img src='signup.svg'/>
            </div>

            <div className='w-full md:w-[550px] flex flex-col space-y-10 text-center'>
                  

                <div className='flex flex-col space-y-5'>
                    <h3>WEPAY ادر أموالك الآن عن طريق التسجيل في</h3>
                    <Link href="/login" className='text-[#8488ED] hover:underline
                    '>لديك حساب ؟ </Link>
                </div>

                <form className='py-10 px-5 shadow-cardShadow rounded-lg flex flex-col space-y-7'>

                    {
                        first && (

                            <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }} className='flex flex-col space-y-7'>
                                <input 
                                type="text" 
                                placeholder='الأسم الأول' 
                                className='outline-none shadow-lg'/>
                                <input 
                                type="text" 
                                placeholder='الاسم الأوسط' 
                                className='outline-none shadow-lg'/>
                                <input 
                                type="text" 
                                placeholder='الاسم الأخير' 
                                className='outline-none shadow-lg'/>
                            </motion.div>
                            
                        )
                    }

                    {
                        second && (

                            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{ ease: "easeInOut", duration: 1 }} className='flex flex-col space-y-7'>
                                <input
                                type="text" 
                                placeholder='اسم المستخدم' 
                                className='outline-none shadow-lg'/>
                                <input 
                                type="email" 
                                placeholder='البريد الإلكتروني' 
                                className='outline-none shadow-lg'/>
                                <input 
                                type="tel"
                                pattern='[0][9][0-9]{2}-[0-9]{3}-[0-9]{3}' 
                                placeholder='0912-345-678' 
                                className='outline-none shadow-lg text-start'/>
                            </motion.div>

                        )
                    }

                    {
                        last && (
                            <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }} className='flex flex-col space-y-7'>
                                <input 
                                type="password"  
                                placeholder='ادخل كلمة المرور' 
                                className='outline-none shadow-lg'/>
                                <input 
                                type="password"  
                                placeholder='أكد كلمة المرور' 
                                className='outline-none shadow-lg'/>
                                <input 
                                type="number"  
                                placeholder='PIN' 
                                className='outline-none shadow-lg text-start'/>

                            </motion.div>
                        )
                    }
 

                    <div className='flex justify-center space-x-3'>

                        <input 
                        type="radio" 
                        name="sign" 
                        value="last"
                        checked={last} 
                        className='relative w-3 h-3 after:absolute after:top-0 after:left-0 after:w-3 after:h-3 after:rounded-full after:bg-textColor after:checked:bg-gradient-to-b after:checked:from-gradientFrom after:checked:to-gradientTo cursor-pointer hover:scale-[1.1]' onChange={signChange}/>

                        <input 
                        type="radio" 
                        name="sign" 
                        value="second" 
                        checked={second}
                        className='relative w-3 h-3 after:absolute after:top-0 after:left-0 after:w-3 after:h-3 after:rounded-full after:bg-textColor after:checked:bg-gradient-to-b after:checked:from-gradientFrom after:checked:to-gradientTo cursor-pointer hover:scale-[1.1]' onChange={signChange}/>

                        <input 
                        type="radio" 
                        name="sign" 
                        value="first"
                        checked={first} 
                        className='relative w-3 h-3 after:absolute after:top-0 after:left-0 after:w-3 after:h-3 after:rounded-full after:bg-textColor after:checked:bg-gradient-to-b after:checked:from-gradientFrom after:checked:to-gradientTo cursor-pointer hover:scale-[1.1]' onChange={signChange}/>
                       
                    </div>

                    {
                        ( first || second ) && (

                            <motion.button initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 0.5 }} type='button' className='bg-gradient-to-b from-gradientFrom to-gradientTo self-center' onClick={signNext}>التالي</motion.button>

                        )
                    }

                    {
                        last && (
                            <motion.button initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 0.5 }} type='submit' className='bg-gradient-to-b from-gradientFrom to-gradientTo self-center'>إنشاء حساب</motion.button>
                        )
                    }

                    

                </form>
                
                

            </div>

        </div>
    </>
  )
}

export default Signup