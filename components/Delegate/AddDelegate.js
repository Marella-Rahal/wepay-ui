import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';
import { BsCamera } from 'react-icons/bs';
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addDelegate } from '../../Redux/Slices/delegatesSlice';
import { parseCookies } from 'nookies';

function AddDelegate() {

  const dispatch=useDispatch()
  const cookies=parseCookies();
  const token=cookies.token;

  const [fullName,setFullName]=useState('');
  const [userName,setUserName]=useState('');
  const [city,setCity]=useState('');
  const [address,setAddress]=useState('');
  const [phoneNumber,setPhoneNumber]=useState('');
  const [dealerImgURL,setDealerImgURL]=useState('');
  const [previewDealerImgURL , setPreviewDealerImgURL] = useState("../default.jpg");
  const [sendingStatus,setSendingStatus]=useState(false);

  const updateImage2 = (e) => {

    if (e.target.files[0]) {

      //! for preview
      setPreviewDealerImgURL(URL.createObjectURL(
        e.target.files[0]
      ))
      //! to store it for the backend
      setDealerImgURL(e.target.files[0]);

    }

  };

  const addD = async (close) => {

    if(!fullName || !userName || !city || !address || !phoneNumber || !dealerImgURL){

      alert("جميع الحقول مطلوبة");
      return;

    }

    const fd=new FormData();
    fd.append('fullName',fullName);
    fd.append('userName',userName);
    fd.append('city',city);
    fd.append('address',address);
    fd.append('phoneNumber',phoneNumber)
    fd.append('dealerImgURL', dealerImgURL, dealerImgURL.name);

    try {

      setSendingStatus(true);

      const res=await axios.post(`${process.env.server_url}/api/v1.0/dealers/addDealer`,fd,{
        headers : {
          Authorization: `Bearer ${token}`,
        }
      })

      dispatch(addDelegate(res.data.data))

      setFullName('');
      setUserName('');
      setCity('');
      setAddress('');
      setPhoneNumber('');
      setDealerImgURL('');
      setPreviewDealerImgURL("../default.jpg")

      setSendingStatus(false);

      close();

    } catch (error) {

      setSendingStatus(false);

      alert(error?.response?.data?.message);

    }

  }

  return (
    <Popup trigger={<button className="p-3">إضافة وكيل </button>} modal nested>
      {(close) => (
        <>
          <motion.div
            initial={{ opacity: 0, y: '-200%', x: '-50%' }}
            animate={{ opacity: 1, y: '-50%', x: '-50%' }}
            transition={{ ease: 'easeInOut', duration: 0.7 }}
            className="fixed z-10 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-gray-50 text-textColor flex flex-col space-y-5 shadow-2xl rounded-lg w-[90%] md:w-[600px] p-3 md:p-5"
          >
            {/* info */}
            <div className="flex flex-col items-center space-y-5 md:space-y-0 md:flex-row md:justify-between">

                {/* first col */}
                <div className="relative w-fit h-fit">
                      <img
                        src={previewDealerImgURL}
                        className="w-[150px] h-[150px] md:w-[200px] md:h-[250px] rounded-md shadow-shadowColor shadow-md"
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
                        onChange={updateImage2}
                      />
                </div>

                {/* second  col*/}
                <div className="w-full md:w-1/2 flex flex-col text-end">

                  <div className='flex space-x-2'>
                    <label className="font-bold mb-1 md:mb-2 pr-2 w-1/2">اسم المستخدم</label>
                    <label className="font-bold mb-1 md:mb-2 pr-2 w-1/2">اسم الوكيل</label>
                  </div>

                  <div className='flex space-x-2'>
                    <input 
                    type="text"
                    className="outline-none border focus:border-textColor w-1/2" 
                    value={userName}
                    onChange={e=>setUserName(e.target.value)}></input>   
                    <input 
                    type="text"
                    className="outline-none border focus:border-textColor w-1/2" 
                    value={fullName}
                    onChange={e=>setFullName(e.target.value)}></input>
                  </div>

                  <div className='flex space-x-2'>
                    <label className="font-bold mb-1 md:mb-2 pr-2 mt-2 md:mt-3 w-1/2">العنوان</label>
                    <label className="font-bold mb-1 md:mb-2 pr-2 mt-2 md:mt-3 w-1/2">المحافظة</label>
                  </div>
                
                  <div className='flex space-x-2'>
                    <input 
                    type="text"
                    className="outline-none border focus:border-textColor w-1/2"
                    value={address} 
                    onChange={e=>setAddress(e.target.value)}></input>
                    <select
                      name="addDelegate"
                      className="outline-none border focus:border-textColor w-1/2 text-end rounded-lg pb-[4px]"
                      value={city}
                      onChange={e=>setCity(e.target.value)}
                    >
                      <option value=""> المحافظة </option>
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
                  </div>

                  <label className="font-bold mb-1 md:mb-2 mr-2 mt-2 md:mt-3">رقمه</label>
                  <input 
                  type="number"
                  placeholder='+963' 
                  className="outline-none border focus:border-textColor text-start"
                  value={phoneNumber} 
                  onChange={e=>setPhoneNumber(e.target.value)}></input>

                </div>

            </div>

            {/* two buttons */}
            <div className="w-full flex justify-between">
              <button
              disabled={sendingStatus} 
              className="p-0 w-[75px] h-[35px]" onClick={() => close()}>
                إغلاق
              </button>
              <button
              disabled={sendingStatus} 
              className="p-0 w-[75px] h-[35px] flex justify-center items-center" onClick={() => addD(close) }>
              
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

export default AddDelegate;
