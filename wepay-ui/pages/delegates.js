import React from 'react';
import Navbar from '../components/Navbar';
import DelegateInfo from '../components/Delegate/DelegateInfo';
import { BiSearchAlt2 } from 'react-icons/bi';
import AddDelegate from '../components/Delegate/AddDelegate';

function Delegates() {
  const info = [
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: ' ماريلا',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: ' رونيا',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: ' ديول',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'ماريلا ريمون رحال',
      address: 'حمص شارع الحضارة بجانب الإطفائية',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: ' رونيا',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: ' ديول',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: ' ماريلا',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: ' رونيا',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: ' ديول',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
    {
      image: '../delegate.svg',
      name: 'غيث عثمان',
      address: 'حمص الأرمن',
      number: '09937082264',
    },
  ];
  return (
    <>
      <Navbar />
      <div className="pt-28 pb-10 px-4 md:px-8 bg-bgColor shadow-bgShadow w-full min-h-screen flex flex-col space-y-7">

          {/* first section */}
          <div className="flex flex-col space-y-7 md:space-y-0 md:flex-row md:space-x-7 md:justify-between md:items-center">

            <div className='w-full md:w-1/2 h-fit'>
              <img src="../delegate.svg" className="w-full h-[350px]"/>
            </div>

            <div className="w-full md:w-1/2 flex flex-col space-y-7 items-end">

              <div className="w-full md:w-[80%] leading-relaxed text-effectColor dark:text-textColor2 text-xl md:text-2xl text-end">
                يمكنك الآن شحن وتعبئة رصيد حسابك مباشرةً عن طريق وكلائنا في جميع
                المحافظات السورية دون حدوث أي تأخير أو انتظار
              </div>
              <AddDelegate />

            </div>

          </div>

          {/* Line */}
          <div className="w-full flex items-center">
            <div className="w-1/2 h-[1px] bg-effectColor" />
            <img src="logo.svg" />
            <div className="w-1/2 h-[1px] bg-effectColor" />
          </div>

          {/* delegates */}
          <div className="w-full text-center text-effectColor dark:text-textColor2 text-2xl md:text-3xl">
            الوكلاء
          </div>

          {/* classification and filter */}
          <div className="w-full flex flex-col space-y-7 md:space-y-0 md:flex-row md:justify-between md:items-center">

              {/* search */}
              <div className="flex">
                <label className="bg-white rounded-l-lg shadow-cardShadow cursor-pointer px-2 py-[5px] text-textColor flex justify-center items-center">
                  <BiSearchAlt2 className="w-[19px] h-[19px] hover:scale-[1.1]" />
                </label>
                <input
                  type="text"
                  placeholder="اسم الوكيل"
                  className="w-full rounded-l-none shadow-cardShadow outline-none focus:border-2 border-effectColor px-3 py-[5px] h-9"
                />
              </div>

              <select
                name="store"
                className="outline-none bg-white text-textColor text-end rounded-lg shadow-cardShadow h-9 px-2"
              >
                <option value="">تصنيف الوكلاء حسب المحافظة </option>
                <option value="حمص">حمص</option>
                <option value="حلب">حلب</option>
                <option value="حماة">حماة</option>
                <option value="اللاذقية">اللاذقية</option>
                <option value=" طرطوس">طرطوس </option>
                <option value="دير الزور">دير الزور</option>
                <option value="الحسكة">الحسكة</option>
                <option value="دمشق">دمشق</option>
                <option value="إدلب">إدلب</option>
              </select>

          </div>

          <div className="flex flex-wrap justify-evenly ">
            {info.map((value, index) => {
              return <DelegateInfo value={value} key={index} />;
            })}
          </div>

      </div>
    </>
  );
}

export default Delegates;
