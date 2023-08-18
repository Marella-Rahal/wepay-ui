import Link from 'next/link';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import NotePopUp, { showPopUpNote } from '../../components/PopUp/NotePopUp';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ThreeDots } from 'react-loader-spinner';
import { setCookie } from 'nookies'

const Login = () => {

  const router=useRouter();
  const { objects } = router.query;  

  const [noteMsg,setNoteMsg]=useState("");  
  const [sendingStatus,setSendingStatus]=useState(false); 

  // 𝗰𝗼𝗹𝗹𝗲𝗰𝘁𝗶𝗻𝗴 𝗶𝗻𝗳𝗼 𝘁𝗼 𝘀𝗲𝗻𝗱 𝗶𝘁 𝘁𝗼 𝘁𝗵𝗲 𝘀𝗲𝗿𝘃𝗲𝗿
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [pin,setPin]=useState('');

  const sendInfo = async (e) => {

    e.preventDefault();

    try {

        setSendingStatus(true);

        const res = await axios.post(`${process.env.server_url}/api/v1.0/auth/login`,{
            email:email,
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

        if(objects !== undefined){
            const objects1 = JSON.parse(objects);
            const queryString = encodeURIComponent(JSON.stringify(objects1))
            router.replace(`/shippingAndPayment?objects=${queryString}`);
        }else{
            router.replace('/shippingAndPayment')
        }
        
        
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
                <h5 className='text-red-600 text-center'> فشل تسجيل الدخول </h5>
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
                <img src='login.svg'/>
            </div>

            <div className='w-full md:w-[550px] flex flex-col space-y-10 text-center'>

                <div className='flex flex-col space-y-5'>
                    <h2>تسجيل الدخول لحسابك الشخصي</h2>
                    <div className='text-[#8488ED] hover:underline hover:cursor-pointer self-center'>
                        <Link href="/signup">لا تملك حساب ؟ قم بالتسجيل و الاشتراك الآن</Link>
                    </div>
                </div>

                <form className='py-10 px-5 shadow-cardShadow rounded-lg flex flex-col space-y-10' onSubmit={sendInfo}>

                    <input type="email" required placeholder='البريد الإلكتروني' className='outline-none shadow-lg'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value) }/>
                    <input type="password" required placeholder='كلمة السر' className='outline-none shadow-lg'
                    value={password}
                    onChange={ (e) => setPassword(e.target.value) }/>
                    <input type="number" required placeholder='PIN' className='outline-none shadow-lg text-start'
                    value={pin}
                    onChange={ (e) => setPin(e.target.value) }/>

                    
                    <div className='flex justify-between items-center space-x-5'>
                        <div className='text-[#8488ED] hover:underline hover:cursor-pointer'>
                            <Link href="/login/forgetPassword">هل نسيت كلمة السر</Link>
                        </div>

                        <button disabled={sendingStatus} className='p-0 w-[105px] h-[35px] flex justify-center items-center'>

                            { 
                                        !sendingStatus 
                                        ? "تسجيل الدخول" 
                                        : <ThreeDots
                                            width="30"
                                            color="#ffffff"
                                            visible={true}
                                        /> 
                            }
                            
                        </button>
                    </div>

                </form>
                
                

            </div>

        </div>

    </>
  )
}

export default Login