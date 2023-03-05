import React from 'react'
import {motion} from 'framer-motion'
const Services = () => {
  return (
    <div className='bg-bgColor shadow-bgShadow
     w-full px-4 md:px-8 py-14 flex flex-col items-center space-y-14 md:space-y-0 md:flex-row md:space-x-10 text-center'>
        <motion.div
        initial={{opacity:0,scale:0.5}}
        whileInView={{opacity:1,scale:1}}
        // viewport={{once:true}}
        transition={{ease:'easeInOut',duration:0.7}}
        className='flex flex-col space-y-7 w-[225px] md:w-1/3'>
            <img src='../../feature1.svg' className='w-full h-[225px]'/>
            <h3 className='md:h-[75px] flex justify-center items-center'>إدارة المال والاحصائيات</h3>
            <div className='md:h-[125px]'>
            تتبع أموالك , تفقد المصاريف المستحقة<br/>
              أدر النفقات الخاصة بك <br/>
             احصل على نصائح لحياة مالية أفضل           
            </div>
        </motion.div>

        <motion.div
        initial={{opacity:0,scale:0.5}}
        whileInView={{opacity:1,scale:1}}
        // viewport={{once:true}}
        transition={{ease:'easeInOut',duration:0.7}}
        className='flex flex-col space-y-7 w-[225px] md:w-1/3'>
            <img src='../../feature2.svg'  className='w-full h-[225px]'/>
            <h3 className='md:h-[75px] flex justify-center items-center'>أدفع اين ما كنت </h3>
            <div className='md:h-[125px]'>
            تصفح المتاجر المشتركة معنا <br/>
            اطلب الشراء  من احد المتاجر<br/>
             ادفع بكل سهولة عن طريق <br/>
             WEPAY         
            </div>
        </motion.div>

        <motion.div
        initial={{opacity:0,scale:0.5}}
        whileInView={{opacity:1,scale:1}}
        // viewport={{once:true}}
        transition={{ease:'easeInOut',duration:0.7}} 
        className='flex flex-col space-y-7 w-[225px] md:w-1/3'>
            <img src='../../feature3.svg'  className='w-full h-[225px]'/>
            <h3 className='md:h-[75px] flex justify-center items-center'>أرسل و استقبل الأموال</h3>
            <div className='md:h-[125px]'>
              خدمة 
              <span> WEPAY </span>  
              في   <br/>
              إرسال واستقبال المال دون قيود <br/>
              اشحن رصيدك تعامل بكل حرية     
            </div>
        </motion.div>
     </div>
  )
}

export default Services