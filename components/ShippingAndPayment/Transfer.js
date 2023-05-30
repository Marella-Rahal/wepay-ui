import axios from 'axios';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { QrReader } from "react-qr-reader";
import { showPopUpNote } from '../PopUp/NotePopUp';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../Redux/Slices/userSlice';

const Transfer = (props) => {

    const dispatch = useDispatch();
    const cookies = parseCookies();
    const token = cookies.token;

    const [qrcode,setQrcode]=useState('');
    const [confirmQrcode,setConfirmQrcode]=useState('');
    const [amountValue,setAmountValue]=useState('');
    const [confirmAmountValue,setConfirmAmountValue]=useState('');
    const [pin,setPin]=useState('');

    const transfer = async (e) => {

        e.preventDefault();

        if(qrcode.length !== 6){
            props.setNoteMsg(
                <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                    <span>  كود تحويل غير صالح </span>
                    <span> يجب أن يكون مؤلف من 6 أرقام </span>   
                </h5>
            );
            showPopUpNote();
            return ;
        }

        if(qrcode !== confirmQrcode){
            props.setNoteMsg(
                <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                    <span> كود التحويل غير متطابق </span>   
                </h5>
              );
            showPopUpNote();
            return;
        }

        if(amountValue !== confirmAmountValue){
            props.setNoteMsg(
                <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                    <span> كمية النقود المرسلة غير متطابقة </span>   
                </h5>
              );
            showPopUpNote();
            return;
        }

        if(pin.length !== 4){
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

            const res = await axios.post(`${process.env.server_url}/api/v1.0/transaction/transferMoney`,{
                qrcode,amountValue,pin
            }, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })

            props.setActions( (prev) => [res.data.activity,...prev.slice(0,4)] );
            
            dispatch(saveUser(res.data.user));

            setQrcode('');
            setConfirmQrcode('');
            setAmountValue('');
            setConfirmAmountValue('');
            setPin('');

            props.setSendingStatus(false);
            
        } catch (error) {

            props.setSendingStatus(false);

            alert(error?.response?.data?.message);
            
        }
    }


    //* QRCode Reader *********************************************

    const [code,setCode]=useState();
    const [reader,setReader]=useState();

    useEffect(() => {
        if(code){
            setReader();
            setQrcode(code);
            setConfirmQrcode(code);
            setCode();
        }
    },[code])

    const read = () => {
        setReader(
            <QrReader
            onResult={ 

                (result, error) => {

                    if (result) {
                        setCode(result.text);
                    }
    
                } 
            }
            constraints={{ facingMode:  "environment"  }}
            />
        );
    }

  return (
    <form onSubmit={transfer} className='w-full lg:w-[90%] xl:w-[70%] flex flex-col space-y-20 justify-between text-sm text-end text-effectColor font-bold'>

        <div className='flex flex-col space-y-10'>

            <div className='md:hidden flex flex-col space-y-10'>

                <div className='flex justify-between space-x-5 items-center'>
                    <div onClick={read} className='rounded-lg p-2 cursor-pointer text-textColor2 bg-gradient-to-b from-gradientFrom to-gradientTo hover:bg-gradient-to-l text-center flex flex-wrap-reverse items-center justify-center'>
                        <span className='mx-1'> QRCode </span>
                        <span className='mx-1'> امسح رمز </span>
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
                    <input 
                    type="number" 
                    required
                    value={confirmQrcode}
                    onChange={(e) => setConfirmQrcode(e.target.value) } 
                    className='w-1/2 outline-none shadow-lg text-start'/>
                    <input 
                    type="number" 
                    required
                    value={qrcode}
                    onChange={(e) => setQrcode(e.target.value) } 
                    className='w-1/2 outline-none shadow-lg text-start'/>
                </div>

            </div>

            {/* //! two */}
            <div className='flex flex-col space-y-5'>

                <div className='flex space-x-5 items-center'>
                    <label className='w-1/2 pr-2'>أعد إدخال  المبلغ المراد إرساله</label>
                    <label className='w-1/2 pr-2'>المبلغ المراد إرساله</label>
                </div>

                <div className='flex space-x-5'>
                    <input 
                    type="number" 
                    required
                    min={100}
                    value={confirmAmountValue}
                    onChange={(e) => setConfirmAmountValue(e.target.value) } 
                    className='w-1/2 outline-none shadow-lg text-start'/>
                    <input 
                    type="number" 
                    required
                    min={100}
                    value={amountValue}
                    onChange={(e) => setAmountValue(e.target.value) } 
                    className='w-1/2 outline-none shadow-lg text-start'/>
                </div>

            </div>

            {/* //! three */}
            <div className='flex flex-col space-y-5'>
                <label className='pr-2'>PIN ادخل رمز ال</label>
                <input 
                type="number" 
                required
                value={pin}
                onChange={(e) => setPin(e.target.value) } 
                className='outline-none shadow-lg text-start'/>
            </div>
            

        </div>

        <button className='w-[50%] self-center'>
        ادفع الآن
        </button>

    </form>
  )
}

export default Transfer