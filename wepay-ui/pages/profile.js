import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { useQRCode } from 'next-qrcode';
import {BsCamera} from 'react-icons/bs'; 
import {MdEdit} from 'react-icons/md';
import {motion} from 'framer-motion';

const Profile = () => {
    const { SVG } = useQRCode();

    //! the default values for inputs (meaning the deafault values as defaultchecked ...) from redux
    //! the values which will be sent to the backend
    const [email,setEmail]=useState();
    const [userName,setUserName]=useState();
    const [fullName,setFullName]=useState();
    const [mobile,setMobile]=useState();

    const [pwd,setPwd]=useState();
    const [confirmPwd,setConfirmPwd]=useState();
    const [pin,setPin]=useState();

    const [bimo,setBimo]=useState();
    const [haram,setHaram]=useState();
    const [syriatel,setSyriatel]=useState();

    //! to allow edit Info
    const [enableEmail,setEnableEmail]=useState(true);
    const [enableUserName,setEnableUserName]=useState(true);
    const [enableFullName,setEnableFullName]=useState(true);
    const [enableMobile,setEnableMobile]=useState(true);
    const [enableBimo,setEnableBimo]=useState(true);
    const [enableHaram,setEnableHaram]=useState(true);
    const [enableSyriatel,setEnableSyriatel]=useState(true);


    //! change the displayed Info
    const [personal,setPersonal]=useState(true);
    const [security,setSecurity]=useState(false);
    const [bank,setBank]=useState(false);
    const changeDisplayInfo=(type)=>{
        if(type=='personal'){
            setPersonal(true);
            setSecurity(false);
            setBank(false);
        }else if(type=='security'){
            setPersonal(false);
            setSecurity(true);
            setBank(false);
        }else{
            setPersonal(false);
            setSecurity(false);
            setBank(true);
        }
    }


    //! if the user does not have a profile photo then we put default.jpg but if he has we put his photo
    //! change the image and send it to backend then change it in redux
    const [img, setImg] = useState("default.jpg");
    const updateImage = (e) => {
        // console.log(e.target.files[0]);
        // console.log(e.target.files[0].name);
        //! for preview
        if(e.target.files[0]){
            document.getElementById('imgProfile').src=URL.createObjectURL(e.target.files[0])
        }
    };

  return (
    <>

        <Navbar/>
        <div className='pt-28 pb-10 px-4 md:px-8 bg-bgColor shadow-bgShadow w-full min-h-screen flex flex-col items-center space-y-10 lg:space-y-0 lg:flex-row lg:space-x-10 lg:justify-between'>

            <div
             className='w-full lg:w-[420px] rounded-lg shadow-cardShadow px-3 py-7 flex flex-col items-center space-y-7 text-center'>

                <h4>الخاص بك QR Code رمز </h4>

                <SVG
                text={'12345667'}
                options={{
                    margin: 3,
                    width: 200,
                    color: {
                    dark: '#161616',
                    light: '#ffffff',
                    },
                }}
                />

                <h4>أو قم بالاستلام عن طريق الرمز التالي</h4>

                <div className='bg-gradient-to-b from-gradientFrom to-gradientTo p-2 rounded-lg text-textColor2'>
                    12345667
                </div>


            </div>

            <div className='w-full lg:w-3/4 lg:border-l-[1px] lg:border-textColor dark:border-textColor2 lg:px-10 flex flex-col space-y-10 items-center lg:items-end text-center'>

                    <div className='flex md:space-x-10 space-x-5 font-bold md:text-base text-[12px]'>

                        <div className={bank?'md:py-5 py-3 md:px-7 px-3 border-b-[1px] border-effectColor text-effectColor cursor-pointer':'md:py-5 py-3 md:px-7 px-3 border-b-[1px] border-textColor dark:border-textColor2 cursor-pointer hover:text-effectColor hover:border-b-effectColor hover:dark:border-b-effectColor'} 
                        onClick={()=>changeDisplayInfo('bank')}>البيانات البنكية</div>

                        <div className={security?'md:py-5 py-3 md:px-7 px-3 border-b-[1px] cursor-pointer border-b-effectColor text-effectColor':'md:py-5 py-3 md:px-7 px-3 border-b-[1px] border-textColor dark:border-textColor2 cursor-pointer hover:text-effectColor hover:border-b-effectColor hover:dark:border-b-effectColor'} onClick={()=>changeDisplayInfo('security')}>الحماية والأمان</div>

                        <div className={personal?'md:py-5 py-3 md:px-7 px-3 border-b-[1px] border-effectColor text-effectColor cursor-pointer':'md:py-5 py-3 md:px-7 px-3 border-b-[1px] border-textColor cursor-pointer hover:text-effectColor hover:border-b-effectColor dark:border-textColor2 hover:dark:border-b-effectColor'} onClick={()=>changeDisplayInfo('personal')}>البيانات الشخصية</div>

                    </div>

                    {
                        personal && (

                            <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }}
                            className='flex flex-col items-center space-y-10 lg:items-end xl:space-y-0 xl:flex-row xl:justify-end xl:items-start xl:space-x-20 w-full'>


                                <div className='relative'>
        
                                    <img src={img} id="imgProfile" className='w-48 h-48 rounded-full shadow-cardShadow'/>
        
                                    <label
                                    htmlFor="profilePhoto"
                                    className="absolute bottom-0 right-5 w-12 h-12 flex justify-center items-center rounded-full bg-textColor2 shadow-md shadow-shadowColor hover:scale-[1.1] cursor-pointer"
                                    >
                                    <BsCamera className="w-7 h-7 text-textColor" />
                                    </label>
        
                                    <input
                                    type="file"
                                    accept="image/*"
                                    id="profilePhoto"
                                    className="hidden"
                                    onChange={updateImage}
                                    />
        
                                </div>
        
                                <form className='w-full lg:w-2/3 flex flex-col space-y-5 text-end font-bold'>
        
                                    <label>: البريد الإلكتروني</label>
                                    <div className='flex'>
        
                                        <div className='bg-textColor2 px-2 rounded-l-lg cursor-pointer text-textColor hover:text-effectColor flex items-center justify-center shadow-lg' 
                                        onClick={()=> setEnableEmail(prev=>!prev) }>
                                            <MdEdit className='w-6 h-6 '/>
                                        </div>
                                        
                                        <input 
                                        type="email"
                                        defaultValue={"marellarahhal@gmail.com"}
                                        disabled={enableEmail}
                                        onChange={(e)=>setEmail(e.target.value)} 
                                        className='shadow-lg outline-none rounded-none rounded-r-lg w-full'/>
        
                                    </div>
        
        
                                    <label>: اسم المستخدم</label>
                                    <div className='flex'>
        
                                        <div className='bg-textColor2 px-2 rounded-l-lg cursor-pointer text-textColor hover:text-effectColor flex items-center justify-center shadow-lg'
                                        onClick={()=> setEnableUserName(prev=>!prev) }>
                                            <MdEdit className='w-6 h-6'/>
                                        </div>
                                        
                                        <input 
                                        type="text"
                                        defaultValue={"MR"}
                                        disabled={enableUserName}
                                        onChange={(e)=>setUserName(e.target.value)} 
                                        className='shadow-lg outline-none rounded-none rounded-r-lg w-full'/>
        
                                    </div>
        
                                    <label>: الاسم الثلاثي</label>
                                    <div className='flex'>
        
                                        <div className='bg-textColor2 px-2 rounded-l-lg cursor-pointer text-textColor hover:text-effectColor flex items-center justify-center shadow-lg'
                                        onClick={()=> setEnableFullName(prev=>!prev) }>
                                            <MdEdit className='w-6 h-6'/>
                                        </div>
                                        
                                        <input 
                                        type="text"
                                        defaultValue={"Marella Rimon Rahal"}
                                        disabled={enableFullName}
                                        onChange={(e)=>setFullName(e.target.value)} 
                                        className='shadow-lg outline-none rounded-none rounded-r-lg w-full'/>
        
                                    </div>
        
                                    <label>: رقم الهاتف</label>
                                    <div className='flex'>
        
                                        <div className='bg-textColor2 px-2 rounded-l-lg cursor-pointer text-textColor hover:text-effectColor flex items-center justify-center shadow-lg'
                                        onClick={()=> setEnableMobile(prev=>!prev) }>
                                            <MdEdit className='w-6 h-6'/>
                                        </div>
                                        
                                        <input 
                                        type="number"
                                        defaultValue={"0987654332"}
                                        disabled={enableMobile}
                                        onChange={(e)=>setMobile(e.target.value)} 
                                        className='shadow-lg outline-none rounded-none rounded-r-lg w-full text-start'/>
        
                                    </div>
        
                                    <button className='self-center'>حفظ التغييرات</button>
        
                                </form>
                            </motion.div>

                        )
                    }

                    {
                        security && (
                            <motion.form initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }} className='w-full lg:w-2/3 flex flex-col space-y-5 text-end font-bold'>

                                <label>أدخل كلمة المرور الجديدة</label>
                                <input 
                                type="password" 
                                required
                                onChange={(e)=>setPwd(e.target.value)} 
                                className='outline-none shadow-lg'/>

                                <label> أعد إدخال كلمة المرور الجديدة</label>
                                <input 
                                type="password" 
                                required
                                onChange={(e)=>setConfirmPwd(e.target.value)} 
                                className='outline-none shadow-lg'/>

                                <label>الجديد PIN  ادخل رمز</label>
                                <input 
                                type="number" 
                                required
                                onChange={(e)=>setPin(e.target.value)} 
                                className='outline-none shadow-lg text-start'/>

                                <button className='self-center'>حفظ التغييرات</button>

                            </motion.form>
                        )
                    }

                    {
                        bank && (
                            <motion.form initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeInOut", duration: 1 }} className='w-full lg:w-2/3 flex flex-col space-y-5 text-end font-bold'>

                                    <label>: بنك بيمو </label>
                                    <div className='flex'>
        
                                        <div className='bg-textColor2 px-2 rounded-l-lg cursor-pointer text-textColor hover:text-effectColor flex items-center justify-center shadow-lg'
                                        onClick={()=> setEnableBimo(prev=>!prev) }>
                                            <MdEdit className='w-6 h-6'/>
                                        </div>
                                        
                                        <input 
                                        type="text"
                                        defaultValue={"P123345676"}
                                        disabled={enableBimo}
                                        onChange={(e)=>setBimo(e.target.value)} 
                                        className='shadow-lg outline-none rounded-none rounded-r-lg w-full text-start'/>
        
                                    </div>


                                    <label>:رقم استقبال الحوالات عن طريق شركة الهرم </label>
                                    <div className='flex'>
        
                                        <div className='bg-textColor2 px-2 rounded-l-lg cursor-pointer text-textColor hover:text-effectColor flex items-center justify-center shadow-lg'
                                        onClick={()=> setEnableHaram(prev=>!prev) }>
                                            <MdEdit className='w-6 h-6'/>
                                        </div>
                                        
                                        <input 
                                        type="number"
                                        defaultValue={"0986432128"}
                                        disabled={enableHaram}
                                        onChange={(e)=>setHaram(e.target.value)} 
                                        className='shadow-lg outline-none rounded-none rounded-r-lg w-full text-start'/>
        
                                    </div>


                                    <label>: Syriatel Cash رقم</label>
                                    <div className='flex'>
        
                                        <div className='bg-textColor2 px-2 rounded-l-lg cursor-pointer text-textColor hover:text-effectColor flex items-center justify-center shadow-lg'
                                        onClick={()=> setEnableSyriatel(prev=>!prev) }>
                                            <MdEdit className='w-6 h-6'/>
                                        </div>
                                        
                                        <input
                                        type="number"
                                        defaultValue={"0987543243"}
                                        disabled={enableSyriatel}
                                        onChange={(e)=>setSyriatel(e.target.value)} 
                                        className='shadow-lg outline-none rounded-none rounded-r-lg w-full text-start'/>
        
                                    </div>

                                
                                <button className='self-center'>حفظ التغييرات</button>

                            </motion.form>
                        )
                    }

                    
            </div>

        </div>
    
    </>
  )
}

export default Profile