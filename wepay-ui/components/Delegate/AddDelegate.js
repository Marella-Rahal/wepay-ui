import React from 'react';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';
import { BsCamera } from 'react-icons/bs';

function AddDelegate() {

  const updateImage2 = (e) => {
    //! for preview
    if (e.target.files[0]) {
      document.getElementById('imgProfile2').src = URL.createObjectURL(
        e.target.files[0]
      );
    }
  };

  return (
    <Popup trigger={<button className="p-3">إضافة وكيل </button>} modal nested>
      {(close) => (
        <>
          <motion.div
            initial={{ opacity: 0, y: '-200%', x: '-50%' }}
            animate={{ opacity: 1, y: '-50%', x: '-50%' }}
            transition={{ ease: 'easeInOut', duration: 0.7 }}
            className="fixed z-10 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-gray-50 text-textColor flex flex-col space-y-7 shadow-2xl rounded-lg w-[90%] md:w-[600px] p-3 md:p-5"
          >
            {/* info */}
            <div className="flex flex-col items-center space-y-7 md:space-y-0 md:flex-row md:justify-between">

                {/* first col */}
                <div className="relative w-fit h-fit">
                      <img
                        src="../default.jpg"
                        id="imgProfile2"
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
                  <label className="font-bold mb-2 mr-2">اسم الوكيل</label>
                  <input type="text" className="outline-none border focus:border-textColor"></input>
                  <label className="font-bold mb-2 mr-2 mt-3">عنوانه </label>
                  <input type="text" placeholder='حمص-الأرمن' className="outline-none border focus:border-textColor"></input>
                  <label className="font-bold mb-2 mr-2 mt-3">رقمه </label>
                  <input type="number" placeholder='+963' className="outline-none border focus:border-textColor text-start"></input>
                </div>

            </div>

            {/* two buttons */}
            <div className="w-full flex justify-between">
              <button className="px-4 py-3" onClick={() => close()}>
                إغلاق
              </button>
              <button className="px-4 py-3">حفظ</button>
            </div>

          </motion.div>

          <div className="z-0 relative w-screen h-screen bg-black opacity-50"></div>

        </>
      )}
    </Popup>
  );
}

export default AddDelegate;
