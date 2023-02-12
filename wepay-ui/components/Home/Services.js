import React from 'react'

const Services = () => {
  return (
    <div className='bg-bgColor shadow-bgShadow
     w-full px-4 md:px-8 py-14 flex flex-col items-center space-y-14 md:space-y-0 md:flex-row md:space-x-10 text-center'>
        <div
        data-aos="zoom-in"
         className='flex flex-col space-y-5 md:justify-between w-[225px] md:w-1/3 md:h-[500px]'>
            <img src='../../feature1.svg' className='w-full h-[225px]'/>
            <h3>إدارة المال والاحصائيات</h3>
            <div>
            تتبع أموالك , تفقد المصاريف المستحقة<br/>
              أدر النفقات الخاصة بك <br/>
             احصل على نصائح لحياة مالية أفضل           
            </div>
        </div>

        <div
         data-aos="zoom-in"
         className='flex flex-col space-y-5 md:justify-between w-[225px] md:w-1/3 md:h-[500px]'>
            <img src='../../feature2.svg'  className='w-full h-[225px]'/>
            <h3>أدفع اين ما كنت </h3>
            <div>
            تصفح المتاجر المشتركة معنا <br/>
            اطلب الشراء  من احد المتاجر<br/>
             ادفع بكل سهولة عن طريق <br/>
             WEPAY         
            </div>
        </div>

        <div
        data-aos="zoom-in" 
        className='flex flex-col space-y-5 md:justify-between w-[225px] md:w-1/3 md:h-[500px]'>
            <img src='../../feature3.svg'  className='w-full h-[225px]'/>
            <h3>أرسل و استقبل الأموال</h3>
            <div>
              خدمة 
              <span> WEPAY </span>  
              في   <br/>
              إرسال واستقبال المال دون قيود <br/>
              اشحن رصيدك تعامل بكل حرية     
            </div>
        </div>
     </div>
  )
}

export default Services