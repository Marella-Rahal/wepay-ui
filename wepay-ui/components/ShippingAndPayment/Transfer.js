import React, { useEffect, useState } from 'react';
import { QrReader } from "react-qr-reader";

const Transfer = () => {
    const [code,setCode]=useState();
    const [reader,setReader]=useState();

    useEffect(()=>{
        if(code){
            setReader();
            document.getElementById('ReaderCode').value=code;
            document.getElementById('ReaderCodeRepeat').value=code;
        }
    },[code])

    const read=()=>{
        setReader(
            <QrReader
            onResult={ 

                (result, error) => {

                    if (result) {
                        setCode(result.text);
                    }
        
                    if (error) {
                        setCode('');
                    }
    
                } 
            }
            constraints={{ facingMode:  "environment"  }}
            style={{ width: "100%", height: "100%" }}
          />
        );
    }

  return (
    <form className='w-full lg:w-[90%] xl:w-[70%] flex flex-col space-y-20 justify-between text-sm text-end text-effectColor font-bold'>

        <div className='flex flex-col space-y-10'>

            <div className='md:hidden flex flex-col space-y-10'>

                <div className='flex justify-between space-x-5 items-center text-center'>
                    <div onClick={read} className='rounded-lg p-2 cursor-pointer text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo hover:bg-gradient-to-l'>
                        QRCode امسح رمز
                    </div>
                    <div className='text-[gray] dark:text-textColor2'>ادخل كود التحويل يدوياً أو</div>
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
                    <input id="ReaderCodeRepeat" type="number" required className='w-1/2 outline-none shadow-lg text-start'/>
                    <input id="ReaderCode" type="number" required className='w-1/2 outline-none shadow-lg text-start'/>
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