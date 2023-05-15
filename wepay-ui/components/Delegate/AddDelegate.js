import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';
import { BsCamera } from 'react-icons/bs';
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios'

function AddDelegate() {

  const [fullName,setFullName]=useState('');
  const [userName,setUserName]=useState('');
  const [address,setAddress]=useState('');
  const [phoneNumber,setPhoneNumber]=useState('');
  const [dealerImageUrl,setDealerImageUrl]=useState('');
  const [previewDealerImageUrl , setPreviewDealerImageUrl] = useState("../default.jpg");
  const [sendingStatus,setSendingStatus]=useState(false);

  const updateImage2 = (e) => {

    if (e.target.files[0]) {

      //! for preview
      setPreviewDealerImageUrl(URL.createObjectURL(
        e.target.files[0]
      ))
      //! to store it for the backend
      setDealerImageUrl(e.target.files[0]);

    }

  };

  const addDelegate = async () => {

    if(!fullName || !userName || !address || !phoneNumber || !dealerImageUrl){

      alert("all fields are required");
      return;

    }

    const fd=new FormData();
    fd.append('fullName',fullName);
    fd.append('userName',userName);
    fd.append('address',address);
    fd.append('phoneNumber',phoneNumber)
    fd.append('dealerImageUrl', dealerImageUrl, dealerImageUrl.name);

    // for (const [key, value] of fd.entries()) {
    //   console.log(key, value);
    // }

    try {

      setSendingStatus(true);

      const res=await axios.post(`${process.env.server_url}/api/v1.0/dealers/addDealer`,{
        fd
      },{
        withCredentials:true
      })

      setSendingStatus(false);

      setFullName('');
      setUserName('');
      setAddress('');
      setPhoneNumber('');
      setDealerImageUrl('');
      setPreviewDealerImageUrl("../default.jpg")

      //! **********
      console.log(res)

    } catch (error) {

      setSendingStatus(false);

      alert(error);

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
                        src={previewDealerImageUrl}
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
                

                  <label className="font-bold mb-1 md:mb-2 mr-2 mt-2 md:mt-3">عنوانه </label>
                  <input 
                  type="text"
                  placeholder='حمص-الأرمن' 
                  className="outline-none border focus:border-textColor"
                  value={address} 
                  onChange={e=>setAddress(e.target.value)}></input>

                  <label className="font-bold mb-1 md:mb-2 mr-2 mt-2 md:mt-3">رقمه </label>
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
              className="p-0 w-[75px] h-[35px] flex justify-center items-center" onClick={addDelegate}>
              
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
