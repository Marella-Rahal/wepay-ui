import React, { useState } from 'react'
import { showPopUpNote } from './NotePopUp';
import axios from 'axios';
import { parseCookies } from 'nookies';

const ShoppingoPopUp = ({objects,setSendingStatus,setNoteMsg}) => {

  const cookies=parseCookies();
  const token=cookies.token;  
  const [pin,setPin]=useState('');  
  
  const payNow = async (e) => {

    e.preventDefault();

    try {
        
        setSendingStatus(true);

        const codesWithPrices = JSON.stringify(objects);
        const res = await axios.post(`${process.env.server_url}/api/v1.0/transaction/payForShoppingo`,{
            codesWithPrices,pin
        },{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        
        const parentWindow = window.opener;
        parentWindow.postMessage({ returned: true }, '*');

        window.close()
        
    } catch (error) {

        setSendingStatus(false);

        setNoteMsg(<h5 className='text-red-600 text-center'>
            {
                error?.response?.data?.message !== undefined ? error?.response?.data?.message : error?.message
            }
        </h5>)

        showPopUpNote();

    }

  }  
   
  return (
    <div className="fullScreenNote fixed z-[99] w-full h-full bg-black/30 flex justify-center items-center">
        <div
        style={{ boxShadow: "0px 0px 5px 5px rgba(255,255,255,1)" }} 
        className='w-full h-[90%] mx-4 md:mx-8 p-3 md:p-5 font-semibold text-center bg-white rounded-lg flex flex-col justify-between space-y-5'>

            <div className='flex items-center space-x-3'>
                <span className='text-effectColor w-1/2 md:w-1/3'> مبلغ التحويل </span>
                <span className='text-effectColor w-1/3 hidden md:block'>كود التحويل</span>
                <span className='text-effectColor w-1/2 md:w-1/3'>اسم المتجر</span>
            </div>
            <line className='h-[1px] bg-effectColor'/>

            <div className='flex flex-col space-y-3 h-full overflow-y-auto XScrollbar'>
                
                {
                    objects.map((one,index)=>{
                        return (
                            <div key={index} className='flex items-center space-x-3'>
                                <span className='w-1/2 md:w-1/3'>{one.price}</span>
                                <span className='w-1/3 hidden md:block'>{one.code}</span>
                                <span className='w-1/2 md:w-1/3'>{one.storeName}</span>
                            </div>
                        )
                    })
                }
                

            </div>

            <line className='h-[1px] bg-effectColor'/>
            <form className='flex justify-between space-x-3 items-center' onSubmit={payNow}>
                <input type='number' value={pin} onChange={(e)=>setPin(e.target.value)} placeholder='PIN' required className='border-b-[1px] placeholder:font-normal border-effectColor rounded-none focus:outline-none focus:border-b-[2px] text-start w-1/2 md:w-1/4'/>
                <button className='w-1/2 md:w-fit'>ادفع الآن</button>
            </form>
        </div>
    </div>
  )
}

export default ShoppingoPopUp