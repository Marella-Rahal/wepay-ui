import { parseCookies } from 'nookies';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveUser, selectUser } from '../../Redux/Slices/userSlice';
import { showPopUpNote } from '../PopUp/NotePopUp';
import { useState } from 'react';
import axios from 'axios';

const PHONE_REGEX=/^09\d{8}$/

const ShippingSyriatel = (props) => {

  const dispatch = useDispatch();
  const cookies = parseCookies();
  const token = cookies.token;
  const user=useSelector(selectUser);

  const [senderPhone,setSenderPhone]=useState(user?.syriatelCash !== undefined ? user?.syriatelCash : '');
  const [processNumber,setProcessNumber]=useState('');
  const [amountValue,setAmountValue]=useState('');

  const shippingSyriatel = async (e)=>{

    e.preventDefault();

    if( !PHONE_REGEX.test(senderPhone) ){
        props.setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                <span>رقم هاتف غير صالح</span> 
                <span>يجب أن يبدأ ب 09 ويكون مؤلف من 10 أرقام</span> 
            </h5>
        );
        showPopUpNote();
        return;
    }

    if( processNumber.length !== 12 ){
        props.setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                <span>رقم عملية الإرسال غير صالح</span> 
                <span>يجب أن يكون مؤلف من 12 رقم</span> 
            </h5>
        );
        showPopUpNote();
        return;
    }

    try {

        props.setSendingStatus(true);
        
        const res = await axios.post(`${process.env.server_url}/api/v1.0/transaction/depositRequest`, {
            senderPhone,
            amountValue,
            processNumber,
            processType:'شحن-كاش'
        } , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        props.setShippingActions( (prev) => [res.data.activity,...prev.slice(0,4)] );
            
        dispatch(saveUser(res.data.user));

        setSenderPhone(user?.syriatelCash !== undefined ? user?.syriatelCash : '');
        setAmountValue('');
        setProcessNumber('');

        props.setSendingStatus(false);
 
        props.setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                <span> {res.data.message} </span>   
            </h5>
          );
  
        showPopUpNote();
        
    } catch (error) {

        props.setSendingStatus(false);

        alert(error?.response?.data?.message);
        
    }
  }

  return (
    <form onSubmit={shippingSyriatel} className='w-full lg:w-[90%] xl:w-[70%] flex flex-col space-y-10 justify-between items-end text-end text-sm'>

        <div className='flex flex-col space-y-5 w-full xl:w-fit'>

            {/* //! one */}
            <div className='flex flex-col space-y-2'>
                
                <div className='text-effectColor text-md md:text-lg'>   سيرياتيل كاش - syriatel cash</div>

                <diV>: بيانات المستقبل </diV>

                <div>اسم المستقبل : علي حسن الديوب</div>

                <div>رقم المستقبل : 0912345678</div>

                <div>نوع حساب المستقبل : حساب تاجر , الدفع اليدوي</div>
            </div>

            {/* //! two */}

            <div className='flex flex-col space-y-3'>
                <label className='text-effectColor pr-2'>رقم المرسل</label>
                <input 
                type="number" 
                required
                value={senderPhone}
                onChange={e=>setSenderPhone(e.target.value)} 
                className='outline-none shadow-lg text-start'/>
            </div>

            {/* //! three */}
            <div className='flex flex-col space-y-3'>
                <label className='text-effectColor pr-2'>رقم عملية التحويل</label>
                <input 
                type="number" 
                required
                value={processNumber}
                onChange={e=>setProcessNumber(e.target.value)} 
                className='outline-none shadow-lg text-start'/>
            </div>

            {/* //! four */}
            <div className='flex flex-col space-y-3'>
                <label className='text-effectColor pr-2'>قيمة المبلغ المرسل </label>
                <input 
                type="number" 
                required
                min={100}
                max={1000000}
                value={amountValue}
                onChange={e=>setAmountValue(e.target.value)} 
                className='outline-none shadow-lg text-start'/>
            </div>

        </div>

        <div className='w-full flex space-x-5'>
            <button type='submit' className='bg-gradient-to-b from-gradientFrom to-gradientTo w-1/2 py-1 md:py-2'>تأكيد العملية</button> 
            <button type='button' className='bg-gradient-to-b from-gradientFrom to-gradientTo w-1/2 py-1 md:py-2' onClick={()=>props.setTypeOfShipping('general')}>الرجوع</button>
        </div>

    </form>
  )
}

export default ShippingSyriatel