import { parseCookies } from 'nookies';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveUser, selectUser } from '../../Redux/Slices/userSlice';
import { showPopUpNote } from '../PopUp/NotePopUp';
import axios from 'axios';

const PHONE_REGEX=/^09\d{8}$/

const WithdrawSyriatel = (props) => {

  const dispatch = useDispatch();
  const cookies = parseCookies();
  const token = cookies.token;
  const user = useSelector(selectUser); 
  
  const [reciverPhone,setReciverPhone]=useState(user?.syriatelCash !== undefined ? user?.syriatelCash :'');
  const [amountValue,setAmountValue]=useState('');
  const [cashType,setCashType]=useState('')
  const [pin,setPin]=useState('');

  const withdrawSyriatel = async (e) => {

        e.preventDefault();

        if( !PHONE_REGEX.test(reciverPhone) ){
            props.setNoteMsg(
                <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                    <span>رقم هاتف غير صالح</span> 
                    <span>يجب أن يبدأ ب 09 ويكون مؤلف من 10 أرقام</span> 
                </h5>
            );
            showPopUpNote();
            return;
        }
    
        if( pin.length !== 4 ){
            props.setNoteMsg(
                <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                    <span> غير صالح pin</span>
                    <span> يجب أن يكون مؤلف من 4 أرقام </span>   
                </h5>
            );
            showPopUpNote();
            return;
        }

        try {

            props.setSendingStatus(true);
        
            const res = await axios.post(`${process.env.server_url}/api/v1.0/transaction/withdrawRequest`, {
                reciverPhone,amountValue,cashType,pin,processType:'سحب-كاش'
            } , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
    
            props.setWithdrawActions( (prev) => [res.data.activity,...prev.slice(0,4)] );
                
            dispatch(saveUser(res.data.user));
    
            setReciverPhone(user?.syriatelCash !== undefined ? user?.syriatelCash :'');
            setAmountValue('');
            setCashType('');
            setPin('');
    
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
    <form
    onSubmit={withdrawSyriatel} 
    className='w-full lg:w-[90%] xl:w-[70%] flex flex-col space-y-10 justify-between items-end text-end text-sm'>


        <div className='w-full flex flex-col space-y-7'>

            <div className='flex flex-col space-y-2'>
                
                <div className='text-effectColor text-md md:text-lg'>   سيرياتيل كاش - syriatel cash</div>

                <diV>: بيانات المرسل </diV>

                <div>اسم المرسل : علي حسن الديوب</div>

                <div>رقم المرسل : 0912345678</div>

                <div>نوع حساب المرسل : حساب تاجر , الدفع اليدوي</div>

            </div>

            <div className='w-full flex flex-col space-y-3'>

                <div className='w-full flex space-x-5 items-center text-effectColor'>
                    <label className='w-1/2 pr-2'>قيمة المبلغ المراد سحبه </label>
                    <label className='w-1/2 pr-2'>رقم المستقبل</label>
                </div>

                <div className='w-full flex space-x-5 items-center'>
                    <input 
                    type="number" 
                    required
                    min={100}
                    max={1000000}
                    value={amountValue}
                    onChange={e=>setAmountValue(e.target.value)} 
                    className='outline-none shadow-lg w-1/2 text-start'/>
                    <input 
                    type="number" 
                    required
                    value={reciverPhone}
                    onChange={e => setReciverPhone(e.target.value)}  
                    className='outline-none shadow-lg w-1/2 text-start'/>
                </div>

            </div>

            <div className='w-full flex flex-col space-y-3'>

                <div className='w-full flex space-x-5 items-center text-effectColor'>
                    <label className='w-1/2 pr-2'> PIN رمز ال</label>
                    <label className='w-1/2 pr-2'>نوع حساب المستقبل</label>
                </div>

                <div className='w-full flex space-x-5 items-center'>
                    <input 
                    type="number" 
                    required
                    value={pin}
                    onChange={e => setPin(e.target.value)} 
                    className='outline-none shadow-lg w-1/2 text-start'/>
                    <select 
                    name="typeOfAccount"
                    required
                    value={cashType}
                    onChange={(e)=>setCashType(e.target.value)} 
                    className='outline-none shadow-lg w-1/2 text-end bg-white text-textColor px-3 py-2 rounded-lg'>
                        <option value="">نوع حساب المستقبل</option>
                        <option value="حساب تاجر , الدفع اليدوي">حساب تاجر , الدفع اليدوي</option>
                        <option value="حساب مستخدم , التحويل اليدوي">حساب مستخدم , التحويل اليدوي</option>
                    </select>
                </div>

            </div>

        </div>


        <div className='w-full flex space-x-5'>
            <button type='submit' className='bg-gradient-to-b from-gradientFrom to-gradientTo w-1/2 py-1 md:py-2'>تأكيد العملية</button> 
            <button type='button' className='bg-gradient-to-b from-gradientFrom to-gradientTo w-1/2 py-1 md:py-2' onClick={()=>props.setTypeOfWithdraw('general')}>الرجوع</button>
        </div>


    </form>
  )
}

export default WithdrawSyriatel