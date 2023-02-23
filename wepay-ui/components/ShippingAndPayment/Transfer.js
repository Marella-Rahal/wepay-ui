import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
const QrReader = dynamic(()=>import('react-qr-scanner'),{
    ssr:false
})

const Transfer = () => {
    const [reader,setReader]=useState();
    const [code,setCode]=useState();
    
    //! every time the camera will open and get the code i will check if the code is empty or does have our qrcode if it does have the code i will close the QrReader by setting the reader to empty and then i will put the code value in the input
    useEffect(()=>{
        if(code){
            setReader();
            document.getElementById('inputCode').value=code;
            document.getElementById('inputCodeRepeat').value=code;
        }
    },[code])

    //! to put our QrReader in the reader and open the camera to scan
    const read = ()=>{
        setReader(
            <QrReader
            facingMode='rear'
            delay={300}
            style={{width:'100%',height:'100%'}}
            onScan={data=> data?setCode(data.text):setCode('')}
            onError={error=>alert(error)}
            />
        );
    } 

  return (
    <form className='w-full lg:w-[90%] xl:w-[70%] flex flex-col space-y-20 justify-between text-sm text-end text-effectColor font-bold'>

        <div className='flex flex-col space-y-10'>

            <div className='md:hidden flex flex-col space-y-10'>

                <div className='flex justify-between items-center space-x-5 text-center'>
                    <div type='button' className='rounded-lg p-2 cursor-pointer text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo hover:bg-gradient-to-l' onClick={read}>QRCode امسح رمز</div>
                    <div className='text-[gray] dark:text-textColor2'>
                        ادخل الكود يدوياً أو
                    </div>
                </div>    

                {reader}
                

            </div>

            {/* //! one */}
            <div className='flex flex-col space-y-5'>

                <div className='flex space-x-5 items-center'>
                    <label className='w-1/2 pr-2'>أعد إدخال كود التحويل</label>
                    <label className='w-1/2 pr-2'>كود التحويل</label>
                </div>

                <div className='flex space-x-5'>
                    <input id="inputCode" type="number" required className='w-1/2 outline-none shadow-lg text-start'/>
                    <input id="inputCodeRepeat" type="number" required className='w-1/2 outline-none shadow-lg text-start'/>
                </div>

            </div>

            {/* //! two */}
            <div className='flex flex-col space-y-5'>

                <div className='flex space-x-5 items-center'>
                    <label className='w-1/2 pr-2'>أعد إدخال  المبلغ المراد إرساله</label>
                    <label className='w-1/2 pr-2'>المبلغ المراد إرساله</label>
                </div>

                <div className='flex space-x-5'>
                    <input type="number" required className='w-1/2 outline-none shadow-lg text-start'/>
                    <input type="number" required className='w-1/2 outline-none shadow-lg text-start'/>
                </div>

            </div>

            {/* //! three */}
            <div className='flex flex-col space-y-5'>
                <label className='pr-2'>PIN ادخل رمز ال</label>
                <input type="number" required className='outline-none shadow-lg text-start'/>
            </div>
            

        </div>

        <button className='w-[60%] self-center lg:self-start'>ادفع الآن</button>

    </form>
  )
}

export default Transfer