import React from 'react';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';
import { BsCamera } from 'react-icons/bs';
import usePosition from '../../hooks/usePosition';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { saveUser, selectUser } from '../../Redux/Slices/userSlice'
import { parseCookies ,setCookie } from 'nookies';

function UpgradeToSeller(props) {

  const dipatch=useDispatch();
  const [sendingStatus,setSendingStatus]=useState(false);

  const cookies = parseCookies();
  const token = cookies.token;

  const user=useSelector(selectUser)

  const [coords , error] =usePosition();

  console.log(JSON.stringify(coords));

  const updateImage3 = (e) => {
    
    if (e.target.files[0]) {
      //! for preview
      props.setPreviewStoreImgURL(URL.createObjectURL(
        e.target.files[0]
      ))
      //! to store it for the backend
      props.setStoreImgURL(e.target.files[0]);
      
    }

  };

  const upgrade = async (close,closeFirstPopup) => {

    if(!props.storeName || !props.storeType || !props.city || !props.address || !props.storeImgURL){
      alert("جميع الحقول مطلوبة")
      return;
    }

    if(coords.length == 0){
      alert("فشلنا في الحصول على إحداثياتك  , انتظر قليلاً وأعد المحاولة مرة أخرى");
      return;
    }

    if( user.Balance < 5000 ){

      alert("لا يوجد في حسابك رصيد كافي")
      return;

    }

    const fd=new FormData();
    fd.append('storeName',props.storeName);
    fd.append('storeType',props.storeType);
    fd.append('city',props.city);
    fd.append('address',props.address);
    fd.append('coo',JSON.stringify(coords))
    fd.append('storeImgURL', props.storeImgURL, props.storeImgURL.name);

    try {

      setSendingStatus(true);

      const res=await axios.post(`${process.env.server_url}/api/v1.0/auth/updateUserToSeller`,
        fd
      ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setCookie(null,'role',res.data.user.role, {
        secure: true, // Set to true if using HTTPS
        sameSite: 'none', // Adjust according to your requirements
      })

      dipatch(saveUser(res.data.user))

      props.setStoreName('');
      props.setStoreType('');
      props.setCity('');
      props.setAddress('');
      props.setStoreImgURL('');
      props.setPreviewStoreImgURL('../storePhoto.svg')

      setSendingStatus(false);

      closeFirstPopup(); 
      close();
      
    } catch (error) {

      setSendingStatus(false);

      alert(error?.response?.data?.message);
      
    }
  }

  return (
    <Popup
      trigger={<button className="p-0 w-[75px] h-[35px]">متابعة</button>}
      modal
      nested
    >
      {(close) => (
        <>
          <motion.div
            initial={{ opacity: 0, y: '-200%', x: '-50%' }}
            animate={{ opacity: 1, y: '-50%', x: '-50%' }}
            transition={{ ease: 'easeInOut', duration: 0.7 }}
            className="fixed z-10 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-gray-50 text-textColor flex flex-col space-y-5 shadow-2xl rounded-lg w-[90%] md:w-[600px] p-3 md:p-5"
          >
            {/* info */}
            <div className='flex flex-col items-center space-y-5 md:space-y-0 md:flex-row md:justify-between'>

                {/* first col */}
                <div className="relative w-fit h-fit">

                      <div className='font-bold text-center mb-2'>صورة المتجر</div>

                      <img
                        src={props.previewStoreImgURL}
                        className="w-[125px] h-[125px] md:w-[200px] md:h-[250px] rounded-md shadow-shadowColor shadow-md"
                      />

                      <label
                        htmlFor="profilePhoto2"
                        className="absolute bottom-[-7px] right-[-7px] w-10 h-10 flex justify-center items-center rounded-full shadow-md shadow-shadowColor hover:scale-[1.1] cursor-pointer bg-white"
                      >
                        <BsCamera className="w-7 h-7 text-textColor" />
                      </label>

                      <input
                        type="file"
                        accept="image/*"
                        id="profilePhoto2"
                        className="hidden"
                        onChange={updateImage3}
                      />
                </div>

                {/* second col */}
                <div className="w-full md:w-1/2 flex flex-col text-end">

                    <label className="font-bold mb-1 mr-2">اسم المتجر</label>
                    <input 
                    type="text" 
                    className="outline-none border focus:border-textColor py-1"
                    value={props.storeName}
                    onChange={(e)=>props.setStoreName(e.target.value)}/>

                    <label className="font-bold mb-1 mr-2 mt-2">نوع المتجر </label>
                    <select 
                    name='store' 
                    className='outline-none border focus:border-textColor bg-textColor2 text-textColor text-end rounded-lg px-3 py-1'
                    value={props.storeType}
                    onChange={(e)=>props.setStoreType(e.target.value)}>
                              <option value="">نوع المتجر</option>
                              <option value="ألبسة">ألبسة</option>
                              <option value="أحذية">أحذية</option>
                              <option value="مواد غذائية">مواد غذائية</option>
                              <option value="صاغة">صاغة</option>
                              <option value="مواد تنظيف">مواد تنظيف</option>
                              <option value="بقالية">بقالية</option>
                              <option value="محمصة">محمصة</option>
                              <option value="بالة">بالة</option>
                              <option value="أخرى">أخرى</option>
                    </select>
                          
                    <label className="font-bold mb-1 mr-2 mt-2"> المحافظة </label>
                    <select 
                    name='city' 
                    className='outline-none border focus:border-textColor bg-textColor2 text-textColor text-end rounded-lg px-3 py-1'
                    value={props.city}
                    onChange={(e)=>props.setCity(e.target.value)}>
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
                    
                    <label className="font-bold mb-1 mr-2 mt-2">عنوان المحل </label>
                    <input type="text" className="outline-none border focus:border-textColor py-1"
                    value={props.address}
                    onChange={(e)=>props.setAddress(e.target.value)}/>
                    
                </div>

            </div>

            {/* two buttons */}
            <div className="w-full flex justify-between">
              <button 
              disabled={sendingStatus} 
              className="p-0 w-[75px] h-[35px] flex justify-center items-center" onClick={() => { props.closeFirstPopup() ; close() } }>
              { 
                    !sendingStatus 
                    ? "إغلاق" 
                    : <ThreeDots
                        width="30"
                        color="#ffffff"
                        visible={true}
                    /> 
              }
              </button>
              <button 
              disabled={sendingStatus} 
              className="p-0 w-[75px] h-[35px] flex justify-center items-center" onClick={()=>upgrade(close,props.closeFirstPopup)}>
              { 
                    !sendingStatus 
                    ? "حفظ" 
                    : <ThreeDots
                        width="30"
                        color="#ffffff"
                        visible={true}
                    /> 
              }
              </button>
            </div>

          </motion.div>
          <div className="z-0 relative w-screen h-screen bg-black opacity-50"></div>

        </>
      )}
    </Popup>
  );
}

export default UpgradeToSeller;
