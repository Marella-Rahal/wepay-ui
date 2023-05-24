import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';
import UpgradeToSeller from './UpgradeToSeller';

function UpgradePopUp() {

  const [storeName,setStoreName]=useState('');
  const [storeType,setStoreType]=useState('');
  const [city,setCity]=useState('');
  const [address,setAddress]=useState('')
  const [storeImgURL,setStoreImgURL]=useState('');
  const [previewStoreImgURL,setPreviewStoreImgURL]=useState('../storePhoto.svg');
 
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
            <div className='flex flex-col space-y-2'>

              <div className="flex justify-end text-end">لترقية حسابك إلى تاجر يرجى التأكد من احتواء حسابك على مبلغ قدره 5000 ليرة سورية حيث يتم اقتطاع المبلغ مرة واحدة فقط ثمن الترقية</div>
              <div className="flex justify-end text-end text-red-600">
               سيتم الوصول إلى إحداثيات موقعك بشكل تلقائي من أجل وضعها على الخريطة كموقع للمتجر لذلك الرجاء المتابعة من موقع المتجر لملء البيانات المطلوبة
              </div>

            </div>

            <div className="w-full flex justify-between">

              <button className="p-0 w-[75px] h-[35px]" onClick={() => close()}>
                إغلاق
              </button>
              <UpgradeToSeller 
              closeFirstPopup={close}
              storeName={storeName}
              setStoreName={setStoreName}
              storeType={storeType}
              setStoreType={setStoreType}
              city={city}
              setCity={setCity}
              address={address}
              setAddress={setAddress}
              storeImgURL={storeImgURL}
              setStoreImgURL={setStoreImgURL}
              previewStoreImgURL={previewStoreImgURL}
              setPreviewStoreImgURL={setPreviewStoreImgURL} />

            </div>

          </motion.div>
          <div className="z-0 relative w-screen h-screen bg-black opacity-50"></div>
        </>
      )}
    </Popup>
  );
}

export default UpgradePopUp;
