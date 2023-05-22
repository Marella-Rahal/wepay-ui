import React from 'react';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';
import UpgradeToSeller from './UpgradeToSeller';

function UpgradePopUp() {
 
  return (
    <Popup
      trigger={<button className="p-3">ترقية الحساب لتاجر </button>}
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
            <div className="flex justify-end text-end">
            سيتم الوصول إلى إحداثياتك الحالية تلقائياً لتحديد موقع متجرك على الخريطة
            </div>

            <div className="flex justify-end text-end text-red-600">
              لذلك يرجى المتابعة من موقع المتجر لملء البيانات المطلوبة
            </div>

            <div className="w-full flex justify-between">
              <button className="px-4 py-3" onClick={() => close()}>
                إغلاق
              </button>
              <UpgradeToSeller closeFirstPopup={close}/>
            </div>

          </motion.div>
          <div className="z-0 relative w-screen h-screen bg-black opacity-50"></div>
        </>
      )}
    </Popup>
  );
}

export default UpgradePopUp;
