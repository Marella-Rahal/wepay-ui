import { parseCookies } from 'nookies';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveUser, selectUser } from '../../Redux/Slices/userSlice';
import { showPopUpNote } from '../PopUp/NotePopUp';
import axios from 'axios';

const PHONE_REGEX=/^09\d{8}$/
const NAME_REGEX=/^([\p{L}\s]+ ){2}[\p{L}\s]+$/u;

const WithdrawHaram = (props) => {

  const dispatch = useDispatch();
  const cookies = parseCookies();
  const token = cookies.token;
  const user=useSelector(selectUser); 

  const [reciverName,setReciverName]=useState('');
  const [amountValue,setAmountValue]=useState('');
  const [reciverPhone,setReciverPhone]=useState(user?.haram !== undefined ? user?.haram : '');
  const [reciverCity,setReciverCity]=useState('');
  const [pin,setPin]=useState('');

  const withdrawHaram = async (e) => {

    e.preventDefault();

    if( !NAME_REGEX.test(reciverName) ){
        props.setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                <span>  الرجاء إدخال الاسم الثلاثي </span>   
            </h5>
          );
        showPopUpNote();
        return;
    }

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

    if(pin.length!==4){
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
            reciverName,reciverPhone,reciverCity,amountValue,pin,processType:'سحب-هرم'
        } , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        props.setWithdrawActions( (prev) => [res.data.activity,...prev.slice(0,4)] );
            
        dispatch(saveUser(res.data.user));

        setReciverName('');
        setAmountValue('');
        setReciverPhone(user?.haram !== undefined ? user?.haram : '');
        setReciverCity('');
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
    onSubmit={withdrawHaram}
    className='w-full lg:w-[90%] xl:w-[70%] flex flex-col space-y-10 justify-between items-end text-end text-sm'>

        <div className='w-full flex flex-col space-y-7'>

            {/* //! one */}

            <div className='flex flex-col space-y-3'>

                <div className='text-effectColor text-md md:text-lg'> شركة الهرم للحوالات المالية</div>

                <diV>: بيانات  المرسل</diV>

                <div>اسم المرسل : علي حسن الديوب</div>

                <div>رقم المرسل : 0912345678</div>

                <div>عنوان المرسل : حمص</div>

            </div>

            {/* //! two */}

            <div className='w-full flex flex-col space-y-3'>

                <div className='w-full flex space-x-5 items-center text-effectColor'>
                    <label className='w-1/2 pr-2'> عنوان المستقبل</label>
                    <label className='w-1/2 pr-2'>اسم المستقبل</label>
                </div>

                <div className='w-full flex space-x-5 items-center'>
                    <select 
                    name='city' 
                    className='outline-none shadow-lg w-1/2 bg-textColor2 text-textColor text-end rounded-lg px-3 py-1'
                    required
                    value={reciverCity}
                    onChange={(e)=>setReciverCity(e.target.value)}>
                              <option value="">المحافظة</option>
                              <option value="حلب">حلب</option>
                              <option value="دمشق">دمشق</option>
                              <option value="حمص">حمص</option>
                              <option value="حماة">حماة</option>
                              <option value="اللاذقية">اللاذقية</option>
                              <option value="دير الزور">دير الزور</option>
                              <option value="السويداء">السويداء</option>
                              <option value="الرقة">الرقة</option>
                              <option value="الحسكة">الحسكة</option>
                              <option value="ريف دمشق">ريف دمشق</option>
                              <option value="درعا">درعا</option>
                              <option value="إدلب">إدلب</option>
                              <option value="طرطوس">طرطوس</option>
                              <option value="القنيطرة">القنيطرة</option>
                    </select>
                    
                    <input 
                    type="text" 
                    required
                    value={reciverName}
                    onChange={e => setReciverName(e.target.value)}
                    className='outline-none shadow-lg w-1/2'/>
                </div>

            </div>

            {/* //! three */}

            <div className='w-full flex flex-col space-y-3'>

                <div className='w-full flex space-x-5 items-center text-effectColor'>
                    <label className='w-1/2 pr-2'>قيمة المبلغ المراد سحبه </label>
                    <label className='w-1/2 pr-2'>رقم المستقبل</label>
                </div>

                <div className='w-full flex space-x-5 items-center'>

                    <input 
                    type="number" 
                    required
                    min={5000}
                    max={2000000}
                    value={amountValue}
                    onChange={e => setAmountValue(e.target.value)} 
                    className='outline-none shadow-lg w-1/2 text-start'/>

                    <input 
                    type="number" 
                    required
                    value={reciverPhone}
                    onChange={e => setReciverPhone(e.target.value)} 
                    className='outline-none shadow-lg w-1/2 text-start'/>
                </div>

            </div>

            {/* //! four */}

            <input 
            type="number" 
            required
            value={pin}
            onChange={e => setPin(e.target.value)} 
            placeholder='PIN' 
            className='outline-none shadow-lg w-full text-start'/>


        </div>  

        <div className='w-full flex space-x-5'>
            <button type='submit' className='bg-gradient-to-b from-gradientFrom to-gradientTo w-1/2 py-1 md:py-2'>تأكيد العملية</button> 
            <button type='button' className='bg-gradient-to-b from-gradientFrom to-gradientTo w-1/2 py-1 md:py-2' onClick={()=>props.setTypeOfWithdraw('general')}>الرجوع</button>
        </div>

    </form>
  )
}

export default WithdrawHaram