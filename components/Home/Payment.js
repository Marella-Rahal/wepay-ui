import { useRouter } from 'next/router'
import React from 'react'
import {motion} from 'framer-motion'
import { parseCookies } from 'nookies'

const Payment = () => {

  const router=useRouter();
  const cookies = parseCookies();
  const token = cookies.token

  return (
    <div className='bg-bgColor shadow-bgShadow w-full px-4 md:px-8 py-14 flex flex-col-reverse items-center md:flex-row md:justify-between md:space-x-10 text-end'>
        <motion.div
        initial={{opacity:0,scale:0.5}}
        whileInView={{opacity:1,scale:1}}
        // viewport={{once:true}}
        transition={{ease:'easeInOut',duration:0.7}}
        className='flex flex-col space-y-5 items-end font-bold'>

            <span>: ارسل و استقبل المال  عن طريق</span>
            
            <span>بالكاميرا مباشرة QRCode فحص رمز </span>

            <span>او الارسال عن طريق الكود المخصص لكل مستخدم</span>

            <button onClick={()=>{
              token ? router.push('/shippingAndPayment') : router.push('/login')
            }}>ادفع الآن</button>

            <div className='flex'>
                <img src='../../appleStore.svg'className='cursor-pointer hover:scale-[1.1] w-24'/>
                <img src='../../googlePlay.svg' className='cursor-pointer hover:scale-[1.1] w-32 -mr-2'/>
            </div>

        
        </motion.div>

        <div className='flex flex-col space-y-10 items-center md:space-y-0 md:flex-row md:space-x-10 mb-14 md:mb-0 w-full md:w-2/3'>
            <motion.img
            initial={{opacity:0,scale:0.5}}
            whileInView={{opacity:1,scale:1}}
            // viewport={{once:true}}
            transition={{ease:'easeInOut',duration:0.7}}
            src="../../payment1.svg" className='w-full md:w-1/2 h-40'/>
            <motion.img
            initial={{opacity:0,scale:0.5}}
            whileInView={{opacity:1,scale:1}}
            // viewport={{once:true}}
            transition={{ease:'easeInOut',duration:0.7}}
            src="../../payment2.svg" className='w-full md:w-1/2 h-40'/>
        </div>
        
    </div>
  )
}

export default Payment