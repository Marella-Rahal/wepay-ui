import React, { useState } from 'react';
import { showPopUpNote } from '../PopUp/NotePopUp';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser, selectUser } from '../../Redux/Slices/userSlice';
import { parseCookies } from 'nookies';
import axios from 'axios';

const PHONE_REGEX=/^09\d{8}$/
const NAME_REGEX=/^([\p{L}\s]+ ){2}[\p{L}\s]+$/u;
const PROCESSNUMBER_REGEX= /^\d{4}-\d{4}-\d{4}$/;

const ShippingHaram = (props) => {

  const dispatch = useDispatch();
  const cookies = parseCookies();
  const token = cookies.token;
  const user=useSelector(selectUser);  

  const [senderName,setSenderName]=useState('');
  const [senderPhone,setSenderPhone]=useState(user?.haram !== undefined ? user?.haram : '');
  const [processNumber,setProcessNumber]=useState('');
  const [amountValue,setAmountValue]=useState('')  
  const [processImageUrl,setProcessImageUrl]=useState('')
  const [previewProcessImageUrl,setPreviewProcessImageUrl]=useState('shipping.svg')

  const updateImage=(e)=>{
    if(e.target.files[0]){
        setPreviewProcessImageUrl(URL.createObjectURL(e.target.files[0]));
        setProcessImageUrl(e.target.files[0]);
    }
  } 
  
  const shippingHaram = async (e) => {

    e.preventDefault();
    
    if(!processImageUrl){
        props.setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                <span>الرجاء إرسال صورة الوصل </span>   
            </h5>
          );
        showPopUpNote();
        return;
    }

    if( !NAME_REGEX.test(senderName) ){
        props.setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                <span>  الرجاء إدخال الاسم الثلاثي </span>   
            </h5>
          );
        showPopUpNote();
        return;
    }

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

    if( !PROCESSNUMBER_REGEX.test(processNumber) ){
        props.setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                <span>رقم عملية الإرسال غير صالح</span> 
                <span>يجب أن يكون بالشكل</span> 
                <span>####-####-####</span> 
            </h5>
        );
        showPopUpNote();
        return;
    }

    const fd=new FormData();
    fd.append('senderName',senderName);
    fd.append('senderPhone',senderPhone);
    fd.append('amountValue',amountValue);
    fd.append('processNumber',processNumber);
    fd.append('processImageUrl',processImageUrl,processImageUrl.name);
    fd.append('processType','شحن-هرم');

    try {

        props.setSendingStatus(true);
        
        const res = await axios.post(`${process.env.server_url}/api/v1.0/transaction/depositRequest`, fd , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        props.setShippingActions( (prev) => [res.data.activity,...prev.slice(0,4)] );
            
        dispatch(saveUser(res.data.user));

        setSenderName('');
        setSenderPhone(user?.haram !== undefined ? user?.haram : '');
        setAmountValue('');
        setProcessNumber('');
        setProcessImageUrl('');
        setPreviewProcessImageUrl('shipping.svg')

        props.setSendingStatus(false);

    } catch (error) {

        props.setSendingStatus(false);

        alert(error?.response?.data?.message);
    }

  }

  return (
    <form
    onSubmit={shippingHaram}
    className='w-full flex flex-col space-y-5 md:space-y-10 justify-between items-end text-end text-sm'>

        <div className='w-full flex flex-col space-y-5'>

            {/* //! one */}
            <div className='flex flex-col space-y-1'>

                <div className='text-effectColor text-md md:text-lg'>شركة الهرم للحوالات المالية</div>

                <div>: بيانات استقبال الرصيد  </div>

                <div className='flex flex-col space-y-1'>
                    <div>اسم المستقبل : علي حسن الديوب</div>
                    <div>عنوان المستقبل : حمص</div>
                </div>

                <div>رقم المستقبل : 0987654321</div>
                
            </div>

            {/* //! two */}
            <div className='w-full flex flex-col-reverse md:flex-row'>

                <div className='md:w-1/2 md:pr-3 pt-3 md:py-3 text-effectColor md:border-r-[1px] border-effectColor flex flex-col space-y-3'>

                    <label className='w-full pr-2'>رقم عملية الإرسال</label>
                    <input 
                    type="text" 
                    required
                    value={processNumber}
                    onChange={e => setProcessNumber(e.target.value)} 
                    className='outline-none shadow-lg text-start'/>

                    <label className='w-full pr-2'>صورة الوصل</label>

                    <label htmlFor='imgHaram' className='bg-[gray] text-textColor2 shadow-lg rounded-lg px-3 py-2 cursor-pointer text-center'>رفع ملف</label>
                    <input 
                    accept="image/*" 
                    type='file' 
                    className='hidden' 
                    id="imgHaram" onChange={updateImage}/>

                    <img src={previewProcessImageUrl} className='self-center w-[150px] h-[200px] md:w-[100px] md:h-[90px]'/>


                </div>

                <div className='md:w-1/2 md:pl-3 md:py-3 text-effectColor flex flex-col space-y-3'>

                    <label className='w-full pr-2'>اسم المرسل</label>
                    <input 
                    type="text" 
                    required
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)} 
                    className='outline-none shadow-lg'/>

                    <label className='pr-2'>رقم المرسل</label>
                    <input 
                    type="number" 
                    required
                    value={senderPhone}
                    onChange={e => setSenderPhone(e.target.value)} 
                    className='outline-none shadow-lg text-start'/>

                    <label className='pr-2'>قيمة المبلغ المرسل</label>
                    <input 
                    type="number" 
                    required
                    max={2000000}
                    value={amountValue}
                    onChange={e => setAmountValue(e.target.value)} 
                    className='outline-none shadow-lg text-start'/>

                </div>

            </div>

        </div>

        <div className='w-full flex space-x-5'>
            <button type='submit' className='bg-gradient-to-b from-gradientFrom to-gradientTo w-1/2 py-1 md:py-2'>تأكيد العملية</button>
            <button type='button' className='bg-gradient-to-b from-gradientFrom to-gradientTo w-1/2 py-1 md:py-2' onClick={()=>props.setTypeOfShipping('general')}>الرجوع</button>
        </div>

    </form>
  )
}

export default ShippingHaram