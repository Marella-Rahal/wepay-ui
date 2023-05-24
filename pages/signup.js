import Link from 'next/link';
import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import {motion} from 'framer-motion';
import axios from 'axios';
import NotePopUp , {showPopUpNote} from '../components/PopUp/NotePopUp';
import { ThreeDots } from 'react-loader-spinner'
import { useRouter } from 'next/router';
import { setCookie } from 'nookies'

const EMAIL_REGEX=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_REGEX=/^09\d{8}$/

const Signup = () => {

  const router=useRouter();
  const [noteMsg,setNoteMsg]=useState("");  
  const [sendingStatus,setSendingStatus]=useState(false);

  // 𝘁𝗿𝗮𝗻𝘀𝗶𝘁𝗶𝗼𝗻 𝗯𝗲𝘁𝘄𝗲𝗲𝗻 𝘀𝗶𝗴𝗻 𝗶𝗻𝗳𝗼  
  const [first,setFirst]=useState(true);
  const [second,setSecond]=useState(false);
  const [last,setLast]=useState(false);
  const signChange=(e)=>{
    if(e.target.value=='first'){
        setFirst(true);
        setSecond(false);
        setLast(false);
    }else if(e.target.value=='second'){
        setFirst(false);
        setSecond(true);
        setLast(false);
    }else{
        setFirst(false);
        setSecond(false);
        setLast(true);
    }
  }
  const signNext=()=>{
    if(first==true){
        setFirst(false);
        setSecond(true);
    }else if(second==true){
        setSecond(false);
        setLast(true);
    }
  }

  // 𝗰𝗼𝗹𝗹𝗲𝗰𝘁𝗶𝗻𝗴 𝗶𝗻𝗳𝗼 𝘁𝗼 𝘀𝗲𝗻𝗱 𝗶𝘁 𝘁𝗼 𝘁𝗵𝗲 𝘀𝗲𝗿𝘃𝗲𝗿
  const [firstName,setFirstName]=useState('');
  const [lastName,setLasttName]=useState('');
  const [middleName,setMiddletName]=useState('');
  const [email,setEmail]=useState('');
  const [userName,setUserName]=useState('');
  const [phoneNumber,setPhoneNumber]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [pin,setPin]=useState('');

  // 𝘀𝗲𝗻𝗱𝗶𝗻𝗴 𝗶𝗻𝗳𝗼 𝗳𝘂𝗻𝗰𝘁𝗶𝗼𝗻
  const sendInfo= async (e) => {

    e.preventDefault();

    if(firstName.length==0){
        setNoteMsg(
            <h5 className='text-red-600 text-center'> الاسم الأول مطلوب</h5>
        );
        showPopUpNote();
        return;
    }

    if(middleName.length==0){
        setNoteMsg(
            <h5 className='text-red-600 text-center'> الاسم الأوسط مطلوب</h5>
        );
        showPopUpNote();
        return;
    }

    if(lastName.length==0){
        setNoteMsg(
            <h5 className='text-red-600 text-center'> الاسم الأخير مطلوب</h5>
        );
        showPopUpNote();
        return;
    }

    if(userName.length==0){
        setNoteMsg(
                <h5 className='text-red-600 text-center'> اسم المستخدم مطلوب</h5>
        );
        showPopUpNote();
        return;
    }

    if(!EMAIL_REGEX.test(email)){
        setNoteMsg(
            <h5 className='text-red-600 text-center'>بريدإلكتروني غير صالح</h5>
        );
        showPopUpNote();
        return;
    }

    if(!PHONE_REGEX.test(phoneNumber)){
        setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                <span>رقم هاتف غير صالح</span> 
                <span>يجب أن يبدأ ب 09 ويكون مؤلف من 10 أرقام</span> 
            </h5>
        );
        showPopUpNote();
        return;
    }

    if(password.length < 8){
        setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                <span>كلمة مرور غير صالحة</span>
                <span>يجب أن تكون أكثر من 7 أحرف </span>
            </h5>
        );
        showPopUpNote();
        return;
    }

    if(password!==confirmPassword){
        setNoteMsg(
            <h5 className='text-red-600 text-center'>كلمة المرور غير مطابقة</h5>
        );
        showPopUpNote();
        return;
    }

    if(pin.length != 4 ){
        setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                <span> غير صالح pin</span>
                <span> يجب أن يكون مؤلف من 4 أرقام </span>   
            </h5>
        );
        showPopUpNote();
        return;
    }

    try {

        setSendingStatus(true);

        const res = await axios.post(`${process.env.server_url}/api/v1.0/auth/signup`,{
            firstName:firstName,
            lastName:lastName,
            middleName:middleName,
            email:email,
            userName:userName,
            phoneNumber:phoneNumber,
            password:password,
            pin:pin
        })

        // Set the token in the cookie
        setCookie(null, 'token', res.data.token, {
            secure: true, // Set to true if using HTTPS
            sameSite: 'none', // Adjust according to your requirements
        });

        // Set the imgURL in the cookie
        setCookie(null, 'imgURL', res.data.imgURL, {
            secure: true, // Set to true if using HTTPS
            sameSite: 'none', // Adjust according to your requirements
        });

        // Set the role in the cookie
        setCookie(null, 'role', res.data.role, {
            secure: true, // Set to true if using HTTPS
            sameSite: 'none', // Adjust according to your requirements
        });

        router.replace('/shippingAndPayment');

        // setFirstName('');
        // setMiddletName('');
        // setLasttName('');
        // setUserName('');
        // setEmail('');
        // setPhoneNumber('');
        // setPassword('');
        // setConfirmPassword('');
        // setPin('');

        // setSendingStatus(false);

        
    } catch (error) {

        if (!error.response){
            setNoteMsg(
                <h5 className='text-red-600 text-center'>السيرفر لا يستجيب</h5>
            );   
        }else if(error.response){
            setNoteMsg(
                <h5 className='text-red-600 text-center'>{error.response.data.message}</h5>
            )
        }else{
            setNoteMsg(
                <h5 className='text-red-600 text-center'> فشل إنشاء الحساب </h5>
            )
        }

        showPopUpNote();

        setSendingStatus(false);

    }


  }

  return (
    <>
        <NotePopUp noteMsg={noteMsg}/>
        <Navbar/>
        <div className='pt-28 px-4 md:px-8 pb-14 bg-bgColor shadow-bgShadow w-full min-h-screen flex flex-col space-y-20 items-center md:space-y-0 md:flex-row md:space-x-10 md:justify-between'>

            <div className='w-full md:w-1/2 flex items-center justify-center'>
                <img src='signup.svg'/>
            </div>

            <div className='w-full md:w-[550px] flex flex-col space-y-10 text-center'>
                  

                <div className='flex flex-col space-y-5'>
                    <h3>WEPAY ادر أموالك الآن عن طريق التسجيل في</h3>
                    <div className='text-[#8488ED] hover:underline hover:cursor-pointer self-center'>
                        <Link href="/login">لديك حساب ؟ </Link>
                    </div>
                </div>

                <form className='py-10 px-5 shadow-cardShadow rounded-lg flex flex-col space-y-7' onSubmit={sendInfo}>

                    {
                        first && (

                            <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }} className='flex flex-col space-y-7'>
                                <input 
                                type="text" 
                                placeholder='الأسم الأول' 
                                className='outline-none shadow-lg'
                                value={firstName}
                                onChange={(e)=>setFirstName(e.target.value)}/>
                                <input 
                                type="text" 
                                placeholder='الاسم الأوسط' 
                                className='outline-none shadow-lg'
                                value={middleName}
                                onChange={(e)=>setMiddletName(e.target.value)}/>
                                <input 
                                type="text" 
                                placeholder='الاسم الأخير' 
                                className='outline-none shadow-lg'
                                value={lastName}
                                onChange={(e)=>setLasttName(e.target.value)}/>
                            </motion.div>
                            
                        )
                    }

                    {
                        second && (

                            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{ ease: "easeInOut", duration: 1 }} className='flex flex-col space-y-7'>
                                <input
                                type="text" 
                                placeholder='اسم المستخدم' 
                                className='outline-none shadow-lg'
                                value={userName}
                                onChange={(e)=>setUserName(e.target.value)}/>
                                <input 
                                type="email" 
                                placeholder='البريد الإلكتروني' 
                                className='outline-none shadow-lg'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}/>
                                <input 
                                type="number" 
                                placeholder='+963' 
                                className='outline-none shadow-lg text-start'
                                value={phoneNumber}
                                onChange={(e)=>setPhoneNumber(e.target.value)}/>
                            </motion.div>

                        )
                    }

                    {
                        last && (
                            <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }} className='flex flex-col space-y-7'>
                                <input 
                                type="password"  
                                placeholder='ادخل كلمة المرور' 
                                className='outline-none shadow-lg'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}/>
                                <input 
                                type="password"  
                                placeholder='أكد كلمة المرور' 
                                className='outline-none shadow-lg'
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}/>
                                <input 
                                type="number"  
                                placeholder='PIN' 
                                className='outline-none shadow-lg text-start'
                                value={pin}
                                onChange={(e)=>setPin(e.target.value)}/>

                            </motion.div>
                        )
                    }
 

                    <div className='flex justify-center space-x-3'>

                        <input 
                        type="radio" 
                        name="sign" 
                        value="last"
                        checked={last}
                        disabled={sendingStatus} 
                        className='relative w-3 h-3 after:absolute after:top-0 after:left-0 after:w-3 after:h-3 after:rounded-full after:bg-textColor after:checked:bg-gradient-to-b after:checked:from-gradientFrom after:checked:to-gradientTo cursor-pointer hover:scale-[1.1]' onChange={signChange}/>

                        <input 
                        type="radio" 
                        name="sign" 
                        value="second" 
                        checked={second}
                        disabled={sendingStatus} 
                        className='relative w-3 h-3 after:absolute after:top-0 after:left-0 after:w-3 after:h-3 after:rounded-full after:bg-textColor after:checked:bg-gradient-to-b after:checked:from-gradientFrom after:checked:to-gradientTo cursor-pointer hover:scale-[1.1]' onChange={signChange}/>

                        <input 
                        type="radio" 
                        name="sign" 
                        value="first"
                        checked={first} 
                        disabled={sendingStatus} 
                        className='relative w-3 h-3 after:absolute after:top-0 after:left-0 after:w-3 after:h-3 after:rounded-full after:bg-textColor after:checked:bg-gradient-to-b after:checked:from-gradientFrom after:checked:to-gradientTo cursor-pointer hover:scale-[1.1]' onChange={signChange}/>
                       
                    </div>

                    {
                        ( first || second ) && (

                            <motion.button initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 0.5 }} type='button' className='bg-gradient-to-b from-gradientFrom to-gradientTo self-center p-0 w-[105px] h-[35px]' onClick={signNext}>التالي</motion.button>

                        )
                    }

                    {
                        last && (
                            <motion.button initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 0.5 }} 
                            type='submit'
                            disabled={sendingStatus}
                            className='bg-gradient-to-b from-gradientFrom to-gradientTo self-center p-0 w-[105px] h-[35px] flex justify-center items-center'
                            >
                                { 
                                    !sendingStatus 
                                    ? "إنشاء حساب" 
                                    : <ThreeDots
                                        width="30"
                                        color="#ffffff"
                                        visible={true}
                                      /> 
                                }

                            </motion.button>
                        )
                    }          

                </form>
                
                

            </div>

        </div>
    </>
  )
}

export default Signup