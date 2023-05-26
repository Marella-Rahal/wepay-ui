import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useQRCode } from 'next-qrcode';
import { BsCamera } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { motion } from 'framer-motion';
import UpgradePopUp from '../components/Profile/UpgradePopUp';
import { wrapper } from '../Redux/Store';
import axios from 'axios';
import { saveUser, selectUser } from '../Redux/Slices/userSlice';
import FailToGet from '../components/FailToGet';
import { useDispatch, useSelector } from 'react-redux';
import NotePopUp ,{ showPopUpNote } from '../components/PopUp/NotePopUp';
import { ThreeDots } from 'react-loader-spinner'
import { parseCookies , setCookie } from 'nookies';

const PHONE_REGEX=/^09\d{8}$/

const Profile = ( { success } ) => {

  const dispatch=useDispatch();

  const cookies= parseCookies();
  const token =cookies.token;

  const user=useSelector(selectUser);

  const [noteMsg,setNoteMsg]=useState("");  
  const [sendingStatus,setSendingStatus]=useState(false);
  const { SVG } = useQRCode();

  //* change the displayed Info *********************

  const [personal, setPersonal] = useState(true);
  const [security, setSecurity] = useState(false);
  const [bank, setBank] = useState(false);
  const changeDisplayInfo = (type) => {
    if (type == 'personal') {
      setPersonal(true);
      setSecurity(false);
      setBank(false);
    } else if (type == 'security') {
      setPersonal(false);
      setSecurity(true);
      setBank(false);
    } else {
      setPersonal(false);
      setSecurity(false);
      setBank(true);
    }
  };

  //* updateInfo *************************************

  const [firstName, setFirstName] = useState(user?.firstName);
  const [middleName, setMiddleName] = useState(user?.middleName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);

  const [enableFullName, setEnableFullName] = useState(true);
  const [enablePhoneNumber, setEnablePhoneNumber] = useState(true);

  const [imgURL, setImgURL] = useState('');
  const [previewImgURL,setPreviewImgURL] =useState(user?.imgURL)

  const updateImage = (e) => {
    
    if (e.target.files[0]) {

      //! for preview
      setPreviewImgURL(URL.createObjectURL(
        e.target.files[0]
      ))
      //! to store it for the backend
      setImgURL(e.target.files[0]);

    }

  };

  const updateInfo = async (e) => {

    e.preventDefault();

    const fd=new FormData();

    if( firstName.length !== 0){

      fd.append('firstName',firstName)

    }else{

      setNoteMsg(
        <h5 className='text-red-600 text-center'> الاسم الأول مطلوب</h5>
      );
      showPopUpNote();
      return;

    }

    if( middleName.length !== 0){

      fd.append('middleName',middleName)

    }else{

      setNoteMsg(
        <h5 className='text-red-600 text-center'> الاسم الأوسط مطلوب</h5>
      );
      showPopUpNote();
      return;

    }

    if( lastName.length !== 0){

      fd.append('lastName',lastName)

    }else{

      setNoteMsg(
        <h5 className='text-red-600 text-center'> الاسم الأخير مطلوب</h5>
      );
      showPopUpNote();
      return;

    }

    if( PHONE_REGEX.test(phoneNumber) ){

      fd.append('phoneNumber',phoneNumber);

    }else{

      setNoteMsg(
        <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
            <span>رقم هاتف غير صالح</span> 
            <span>يجب أن يبدأ ب 09 ويكون مؤلف من 10 أرقام</span> 
        </h5>
      );
      showPopUpNote();
      return;

    }

    if(imgURL){

      fd.append('imgURL',imgURL,imgURL.name);

    }

    // printing the form data values
    // for (const entry of fd.entries()) {
    //   console.log(entry[0] + ': ' + entry[1]);
    // }

    try {

      setSendingStatus(true);

      const res = await axios.put(`${process.env.server_url}/api/v1.0/auth/updateBasic`,fd,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Set the imgURL in the cookie
      setCookie(null, 'imgURL', res.data.user.imgURL, {
        secure: true, // Set to true if using HTTPS
        sameSite: 'none', // Adjust according to your requirements
      });

      dispatch(saveUser(res.data.user));

      setImgURL('');
      setEnableFullName(true);
      setEnablePhoneNumber(true);

      setSendingStatus(false);
      
    } catch (error) {
      
      setSendingStatus(false);

      alert(error?.response?.data?.message);

    }


  }

  //* updatePassword **********************************

  const [oldPassword, setOldPassword]=useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPin, setNewPin] = useState('');
  
  const updatePassword = async (e) => {

    e.preventDefault();

    if( newPassword.length > 0 && newPassword.length < 8 ){

        setNoteMsg(
          <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
              <span>كلمة المرور الجديدة غير صالحة</span>
              <span>يجب أن تكون أكثر من 7 أحرف </span>
          </h5>
        );
        showPopUpNote();
        return;

    }

    if( newPassword!==confirmPassword ){

      setNoteMsg(
        <h5 className='text-red-600 text-center'>كلمة المرور غير مطابقة</h5>
      );
      showPopUpNote();
      return;

    }

    if(newPin.length > 0 && newPin.length !== 4 ){

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

      const res = await axios.put(`${process.env.server_url}/api/v1.0/auth/updateSecurity`,{
          oldPassword : oldPassword ,
          newPassword : newPassword.length !== 0 ? newPassword : undefined ,
          newPin : newPin.length !== 0 ? newPin : undefined 
      },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
      })

      dispatch(saveUser(res.data.user))

      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setNewPin('');

      setSendingStatus(false);
      
    } catch (error) {

      setSendingStatus(false);

      alert(error?.response?.data?.message);
      
    }

  }

  //* updatePayment ***********************************

  const [bemoBank, setBemoBank] = useState( user?.bemoBank !== undefined ? user?.bemoBank : '' );
  const [haram, setHaram] = useState( user?.haram !== undefined ? user?.haram : '' );
  const [syriatelCash, setSyriatelCash] = useState( user?.syriatelCash !== undefined ? user?.syriatelCash : '' );

  const [enableBemoBank, setEnableBemoBank] = useState(true);
  const [enableHaram, setEnableHaram] = useState(true);
  const [enableSyriatelCash, setEnableSyriatelCash] = useState(true);

  const updatePayment = async (e) => {

    e.preventDefault();

    if( bemoBank.length > 0 && bemoBank.length !== 7 ) {
      setNoteMsg(
        <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
            <span>رقم حساب بنك بيمو غير صالح</span>
            <span>يجب أن يكون مؤلف من 7 أرقام </span>
        </h5>
      );
      showPopUpNote();
      return;
    }
    if( haram.length > 0 && !PHONE_REGEX.test(haram) ) {
      setNoteMsg(
        <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
            <span>رقم هاتف غير صالح</span> 
            <span>يجب أن يبدأ ب 09 ويكون مؤلف من 10 أرقام</span> 
        </h5>
      );
      showPopUpNote();
      return;
    }
    if( syriatelCash.length > 0 && !PHONE_REGEX.test(syriatelCash) ) {
      setNoteMsg(
        <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
            <span>رقم هاتف غير صالح</span> 
            <span>يجب أن يبدأ ب 09 ويكون مؤلف من 10 أرقام</span> 
        </h5>
      );
      showPopUpNote();
      return;
    }

    try {

      setSendingStatus(true);

      const res = await axios.put(`${process.env.server_url}/api/v1.0/auth/updatePaymentInfo`,{
        bemoBank , haram , syriatelCash
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch(saveUser(res.data.user));

      setEnableBemoBank(true);
      setEnableHaram(true);
      setEnableSyriatelCash(true);

      setSendingStatus(false);
      
    } catch (error) {
      
      setSendingStatus(false);

      alert(error?.response?.data?.message);

    }
    


  }

  return (
    <>  
      {
        success ? (
          <>
            <NotePopUp noteMsg={noteMsg}/>
            <Navbar/>
            <div className="pt-28 pb-10 px-4 md:px-8 bg-bgColor shadow-bgShadow w-full min-h-screen flex flex-col items-center space-y-10 lg:space-y-0 lg:flex-row lg:space-x-10 lg:justify-between">

              <div className="flex flex-col space-y-5 w-full lg:w-[375px]">

                  <div className="w-full lg:w-[375px] rounded-lg shadow-cardShadow px-3 py-7 flex flex-col items-center space-y-7 text-center">
                    <h4>الخاص بك QR Code رمز </h4>

                    <SVG
                      text={user.qrcode}
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

                    <div className="bg-gradient-to-b from-gradientFrom to-gradientTo p-2 rounded-lg text-textColor2">
                      {user.qrcode}
                    </div>

                  </div>

                  {
                    ( user.role == "user" ) && (
                      <UpgradePopUp />
                    ) 
                  }
                  

              </div>

              <div className="w-full lg:w-3/4 lg:border-l-[1px] lg:border-textColor dark:border-textColor2 lg:px-7 xl:px-10 flex flex-col space-y-10 items-center lg:items-end text-center">
                <div className="flex sm:space-x-10 space-x-5 font-bold sm:text-base text-[12px]">
                  <div
                    className={
                      bank
                        ? 'sm:py-5 py-3 sm:px-7 px-3 border-b-[1px] border-effectColor text-effectColor cursor-pointer'
                        : 'sm:py-5 py-3 sm:px-7 px-3 border-b-[1px] border-textColor dark:border-textColor2 cursor-pointer hover:text-effectColor hover:border-b-effectColor hover:dark:border-b-effectColor'
                    }
                    onClick={() => {
                      !sendingStatus ? changeDisplayInfo('bank') : ''
                    }}
                  >
                    البيانات البنكية
                  </div>

                  <div
                    className={
                      security
                        ? 'sm:py-5 py-3 sm:px-7 px-3 border-b-[1px] cursor-pointer border-b-effectColor text-effectColor'
                        : 'sm:py-5 py-3 sm:px-7 px-3 border-b-[1px] border-textColor dark:border-textColor2 cursor-pointer hover:text-effectColor hover:border-b-effectColor hover:dark:border-b-effectColor'
                    }
                    onClick={() => {
                      !sendingStatus ? changeDisplayInfo('security') : ''
                    }}
                  >
                    الحماية والأمان
                  </div>

                  <div
                    className={
                      personal
                        ? 'sm:py-5 py-3 sm:px-7 px-3 border-b-[1px] border-effectColor text-effectColor cursor-pointer'
                        : 'sm:py-5 py-3 sm:px-7 px-3 border-b-[1px] border-textColor cursor-pointer hover:text-effectColor hover:border-b-effectColor dark:border-textColor2 hover:dark:border-b-effectColor'
                    }
                    onClick={() => {
                      !sendingStatus ? changeDisplayInfo('personal') : ''
                    }}
                  >
                    البيانات الشخصية
                  </div>
                </div>

                {
                    personal && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: 'easeInOut', duration: 1 }}
                        className="flex flex-col items-center space-y-10 lg:space-y-0 lg:flex-row lg:justify-end lg:items-start lg:space-x-7 xl:space-x-14 w-full"
                      >
                        <div className="relative min-w-fit">
                          <img
                            src={previewImgURL}
                            className="w-48 h-48 rounded-full shadow-cardShadow"
                          />

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

                        <form className="w-full lg:w-3/4 flex flex-col space-y-5 text-end font-bold" onSubmit={updateInfo}>


                          <div className='flex justify-between items-center space-x-3'>

                              <div
                                className="bg-textColor2 px-2 py-[5px] rounded-lg cursor-pointer text-textColor hover:text-effectColor flex items-center justify-center shadow-lg"
                                onClick={() => setEnableFullName((prev) => !prev)}
                              >
                                <MdEdit className="w-6 h-6" />
                              </div>

                              <label>: الاسم الثلاثي</label>

                          </div>

                          <div className="w-full flex space-x-3">

                              <input
                                type="text"
                                placeholder='الاسم الأخير'
                                disabled={enableFullName}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="shadow-md outline-none w-full"
                              />
                              <input
                                type="text"
                                placeholder='الاسم الأوسط'
                                disabled={enableFullName}
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                                className="shadow-md outline-none w-full"
                              />
                              <input
                                type="text"
                                placeholder='الاسم الأول'
                                disabled={enableFullName}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="shadow-md outline-none w-full"
                              />     

                          </div>

                          <label>: اسم المستخدم</label>
                          <input
                              type="text"
                              value={user.userName}
                              disabled={true}
                              className="shadow-lg outline-none w-full"
                          />

                          <label>: البريد الإلكتروني</label>
                          <input
                              type="email"
                              value={user.email}
                              disabled={true}
                              className="shadow-lg outline-none w-full"
                          />

                          <label>: رقم الهاتف</label>
                          <div className="flex">
                            <div
                              className="bg-textColor2 px-2 rounded-l-lg cursor-pointer text-textColor hover:text-effectColor flex items-center justify-center shadow-lg"
                              onClick={() => setEnablePhoneNumber((prev) => !prev)}
                            >
                              <MdEdit className="w-6 h-6" />
                            </div>

                            <input
                              type="number"
                              disabled={enablePhoneNumber}
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="shadow-lg outline-none rounded-none rounded-r-lg w-full text-start"
                            />
                          </div>
                        

                          <button 
                          type='submit'
                          disabled={sendingStatus}
                          className='bg-gradient-to-b from-gradientFrom to-gradientTo self-center p-0 w-[105px] h-[35px] flex justify-center items-center'>
                            { 
                                !sendingStatus 
                                ? "حفظ التغييرات" 
                                : <ThreeDots
                                    width="30"
                                    color="#ffffff"
                                    visible={true}
                                /> 
                            }
                          </button>

                        </form>
                      </motion.div>
                    )
                }

                {
                  security && (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ ease: 'easeInOut', duration: 1 }}
                      className="w-full lg:w-3/4 flex flex-col space-y-5 text-end font-bold"
                      onSubmit={updatePassword}
                    >
                      <label>أدخل كلمة المرور القديمة</label>
                      <input
                        type="password"
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="outline-none shadow-lg"
                      />

                      <label>أدخل كلمة المرور الجديدة</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="outline-none shadow-lg"
                      />

                      <label> أعد إدخال كلمة المرور الجديدة</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="outline-none shadow-lg"
                      />

                      <label>الجديد PIN أدخل رمز</label>
                      <input
                        type="number"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        className="outline-none shadow-lg text-start"
                      />

                      <button 
                      type='submit'
                      disabled={sendingStatus}
                      className='bg-gradient-to-b from-gradientFrom to-gradientTo self-center p-0 w-[105px] h-[35px] flex justify-center items-center'>
                        { 
                            !sendingStatus 
                            ? "حفظ التغييرات" 
                            : <ThreeDots
                                width="30"
                                color="#ffffff"
                                visible={true}
                            /> 
                        }
                      </button>
                      
                    </motion.form>
                  )
                }

                {
                    bank && (
                      <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: 'easeInOut', duration: 1 }}
                        className="w-full lg:w-3/4 flex flex-col space-y-5 text-end font-bold"
                        onSubmit={updatePayment}
                      >
                        <label>: بنك بيمو </label>
                        <div className="flex">
                          <div
                            className="bg-textColor2 px-2 rounded-l-lg cursor-pointer text-textColor hover:text-effectColor flex items-center justify-center shadow-lg"
                            onClick={() => setEnableBemoBank((prev) => !prev)}
                          >
                            <MdEdit className="w-6 h-6" />
                          </div>

                          <input
                            type="number"
                            disabled={enableBemoBank}
                            value={bemoBank}
                            onChange={(e) => setBemoBank(e.target.value)}
                            className="shadow-lg outline-none rounded-none rounded-r-lg w-full text-start"
                          />
                        </div>

                        <label>:رقم استقبال الحوالات عن طريق شركة الهرم </label>
                        <div className="flex">
                          <div
                            className="bg-textColor2 px-2 rounded-l-lg cursor-pointer text-textColor hover:text-effectColor flex items-center justify-center shadow-lg"
                            onClick={() => setEnableHaram((prev) => !prev)}
                          >
                            <MdEdit className="w-6 h-6" />
                          </div>

                          <input
                            type="number"
                            disabled={enableHaram}
                            value={haram}
                            onChange={(e) => setHaram(e.target.value)}
                            className="shadow-lg outline-none rounded-none rounded-r-lg w-full text-start"
                          />
                        </div>

                        <label>: Syriatel Cash رقم</label>
                        <div className="flex">
                          <div
                            className="bg-textColor2 px-2 rounded-l-lg cursor-pointer text-textColor hover:text-effectColor flex items-center justify-center shadow-lg"
                            onClick={() => setEnableSyriatelCash((prev) => !prev)}
                          >
                            <MdEdit className="w-6 h-6" />
                          </div>

                          <input
                            type="number"
                            disabled={enableSyriatelCash}
                            value={syriatelCash}
                            onChange={(e) => setSyriatelCash(e.target.value)}
                            className="shadow-lg outline-none rounded-none rounded-r-lg w-full text-start"
                          />
                        </div>

                        <button 
                          type='submit'
                          disabled={sendingStatus}
                          className='bg-gradient-to-b from-gradientFrom to-gradientTo self-center p-0 w-[105px] h-[35px] flex justify-center items-center'>
                            { 
                                !sendingStatus 
                                ? "حفظ التغييرات" 
                                : <ThreeDots
                                    width="30"
                                    color="#ffffff"
                                    visible={true}
                                /> 
                            }
                        </button>

                      </motion.form>
                    )
                }
              </div>
            </div>
          </>
        ) : (
          <FailToGet/>
        )
      }
    </>
  );
};

export default Profile;

export const getServerSideProps = wrapper.getServerSideProps( store => async (context) =>{

    const cookies=parseCookies(context);
    const token=cookies.token;

    try {

          const res = await axios.get(`${process.env.server_url}/api/v1.0/auth/getUserInfo`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setCookie(context, 'imgURL', res.data.user.imgURL, {
            path:'/',
            secure:true,
            sameSite:'none'
          })

          setCookie(context, 'role', res.data.user.role, {
            path:'/',
            secure:true,
            sameSite:'none'
          })

          store.dispatch(saveUser(res.data.user))

          return {
            props : {
              success : true
            }
          }
      
    } catch (error) {

          if(error?.response?.status == 401){

            return {
              redirect: {
                destination: '/login',
                permanent: false, // Set to false if it's a temporary redirect
              },
            }

          }else{

              return {
                props : {
                  success : false
                }
              }

          }
      
    }

})
