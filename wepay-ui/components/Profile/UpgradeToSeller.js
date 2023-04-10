import React from 'react';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';
import { BsCamera } from 'react-icons/bs';
import usePosition from '../../hooks/usePosition';

function UpgradeToSeller() {
  const [coords , error] =usePosition();
  
  console.log(coords);

  const updateImage3 = (e) => {
    //! for preview
    if (e.target.files[0]) {
      document.getElementById('imgProfile2').src = URL.createObjectURL(
        e.target.files[0]
      );
    }
  };

  return (
    <Popup
      trigger={<button className="px-4 py-3">متابعة</button>}
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
                        src="../storePhoto.svg"
                        id="imgProfile2"
                        className="w-[150px] h-[125px] md:w-[200px] md:h-[250px] rounded-md shadow-shadowColor shadow-md"
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
                    <input type="text" className="outline-none border focus:border-textColor py-1"/>

                    <label className="font-bold mb-1 mr-2 mt-2">نوع المتجر </label>
                    <select 
                          name='store' 
                          className='outline-none border focus:border-textColor bg-textColor2 text-textColor text-end rounded-lg px-3 py-1'>
                              <option value="">تصنيف حسب نوع المتجر</option>
                              <option value="Clothes">ألبسة</option>
                              <option value="Shoes">أحذية</option>
                              <option value="Food">مواد غذائية</option>
                              <option value="Gold">صاغة</option>
                              <option value="Cleaning materials">مواد تنظيف</option>
                              <option value="Grocery">بقالية</option>
                              <option value="Toaster">محمصة</option>
                              <option value="Bale">بالة</option>
                              <option value="Others">أخرى</option>
                    </select>
                          
                    <label className="font-bold mb-1 mr-2 mt-2"> المحافظة </label>
                    <select 
                          name='city' 
                          className='outline-none border focus:border-textColor bg-textColor2 text-textColor text-end rounded-lg px-3 py-1'>
                              <option value="">تصنيف حسب المحافظة</option>
                              <option value="Aleppo">حلب</option>
                              <option value="Damascus">دمشق</option>
                              <option value="Homs">حمص</option>
                              <option value="Hama">حماة</option>
                              <option value="Latakia">اللاذقية</option>
                              <option value="Deir ez-Zor">دير الزور</option>
                              <option value="As-Suwayda">السويداء</option>
                              <option value="Ar-Raqqah">الرقة</option>
                              <option value="Al-Hasakah">الحسكة</option>
                              <option value="Damascus countryside">ريف دمشق</option>
                              <option value="Daraa">درعا</option>
                              <option value="Idlib">إدلب</option>
                              <option value="Tartus">طرطوس</option>
                              <option value="Quneitra">القنيطرة</option>
                    </select>
                    
                    <label className="font-bold mb-1 mr-2 mt-2">عنوان المحل </label>
                    <input type="text" className="outline-none border focus:border-textColor py-1"></input>
                    
                </div>

            </div>

            {/* two buttons */}
            <div className="w-full flex justify-between">
              <button className="px-4 py-3" onClick={() => close()}>
                إغلاق
              </button>
              <button className="px-4 py-3" onClick={() => close()}>حفظ</button>
            </div>

          </motion.div>
          <div className="z-0 relative w-screen h-screen bg-black opacity-50"></div>

        </>
      )}
    </Popup>
  );
}

export default UpgradeToSeller;
