import { parseCookies } from 'nookies';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showPopUpNote } from '../PopUp/NotePopUp';
import axios from 'axios';
import { saveUser, selectUser } from '../../Redux/Slices/userSlice';

const NAME_REGEX=/^([\p{L}\s]+ ){2}[\p{L}\s]+$/u;

const ShippingBimo = (props) => {

  const dispatch = useDispatch();
  const cookies = parseCookies();
  const token = cookies.token;
  const user=useSelector(selectUser);

  const [senderName,setSenderName]=useState('');
  const [accountID,setAccountID]=useState(user?.bemoBank !== undefined ? user?.bemoBank : '');
  const [amountValue,setAmountValue]=useState('');

  const shippingBimo = async (e) => {

    e.preventDefault();

    if( !NAME_REGEX.test(senderName) ){
      props.setNoteMsg(
          <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
              <span>  الرجاء إدخال الاسم الثلاثي </span>   
          </h5>
        );
      showPopUpNote();
      return;
    }

    if( accountID.length !== 7 ){
      props.setNoteMsg(
        <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
            <span>رقم حساب بنك بيمو غير صالح</span>
            <span>يجب أن يكون مؤلف من 7 أرقام </span>
        </h5>
      );
      showPopUpNote();
      return;
    }

    try {

      props.setSendingStatus(true);
        
      const res = await axios.post(`${process.env.server_url}/api/v1.0/transaction/depositRequest`, {
            senderName,
            accountID,
            amountValue,
            processType:'شحن-بيمو'
      } , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        props.setShippingActions( (prev) => [res.data.activity,...prev.slice(0,4)] );
            
        dispatch(saveUser(res.data.user));

        setSenderName('')
        setAccountID(user?.bemoBank !== undefined ? user?.bemoBank : '');
        setAmountValue('');

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
    <form onSubmit={shippingBimo} className='w-full lg:w-[90%] xl:w-[70%] flex flex-col space-y-10 justify-between items-end text-end text-sm'>

        <div className='flex flex-col space-y-5 w-full xl:w-fit'>

            {/* //! one */}
            <div className='flex flex-col space-y-3'>

              <div className='text-effectColor text-md md:text-lg'>بنك بيمو السعودي الفرنسي</div>

                <diV>: بيانات المستقبل</diV>

                <div>اسم المستقبل : علي حسن الديوب</div>

                <div>رقم حساب بنك بيمو للمستقبل : 0432123</div>

            </div>

            {/* //! two */}
            <div className='flex flex-col space-y-3'>
                <label className='text-effectColor pr-2'>اسم المرسل</label>
                <input 
                type="text" 
                required
                value={senderName}
                onChange={e=>setSenderName(e.target.value)} 
                className='outline-none shadow-lg'/>
            </div>

            {/* //! three */}
            <div className='flex flex-col space-y-3'>
                <label className='text-effectColor pr-2'>رقم حساب بنك بيمو للمرسل</label>
                <input 
                type="number" 
                required
                value={accountID}
                onChange={e=>setAccountID(e.target.value)} 
                className='outline-none shadow-lg text-start'/>
            </div>

            {/* //! four */}
            <div className='flex flex-col space-y-3'>
                <label className='text-effectColor pr-2'>قيمة المبلغ المرسل </label>
                <input 
                type="number" 
                required
                min={100}
                max={2000000}
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

export default ShippingBimo