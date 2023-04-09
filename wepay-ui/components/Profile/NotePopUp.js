import React from 'react';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';
import UpgradeToSeller from './UpgradeToSeller';

function NotePopUp() {
 
  return (
    <Popup
      trigger={<button className="p-3 mt-3">ترقية الحساب لتاجر </button>}
      modal
      nested
    >
      {(close) => (
        <>
          <motion.div
            initial={{ opacity: 0, y: '-200%', x: '-50%' }}
            animate={{ opacity: 1, y: '-50%', x: '-50%' }}
            transition={{ ease: 'easeInOut', duration: 0.7 }}
            className=" bg-bgColor fixed z-10 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] flex flex-col space-y-5 justify-between shadow-2xl rounded-lg bg-gray-50 w-[90%] md:w-[600px] p-3 md:p-5 text-textColor dark:text-darkBgColor"
          >
            <div className="flex   justify-end text-right">
              سيتم أخذ إحداثياتك الحالية لكي نضع متجرك على الخريطة
            </div>
            <div className="flex  justify-end text-right text-red-600">
              الرجاء المتابعة من مكان المتجر لملء البيانات الشخصية
            </div>

            <div className="flex w-full justify-between">
              <button className="px-4 py-3" onClick={() => close()}>
                إغلاق
              </button>
              <UpgradeToSeller />
            </div>
          </motion.div>
          <div className="z-0 relative w-screen h-screen bg-black opacity-50"></div>
        </>
      )}
    </Popup>
  );
}

export default NotePopUp;