import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Search from '../components/Sellers/Search'
import Seller from '../components/Sellers/Seller';
import usePosition from "../hooks/usePosition";
import NotePopUp, { showPopUpNote } from "../components/PopUp/NotePopUp";
import dynamic from "next/dynamic";
import Loading from "../components/Loading";
const Map = dynamic(() => import("../components/Map/Map"), {
    loading: () => <Loading />,
    ssr: false,
});

const Sellers = () => {
    const [storesNumber,setStoresNumber]=useState('all');


    //todo *********** the massage for the popUp
    const [noteMsg, setNoteMsg] = useState("");
    //todo ********** the location of the user
    const [coords, error] = usePosition();
    useEffect(() => {
        if (error) {
          setNoteMsg(
            <>
              <h5 className="text-red-600 text-center">
                فشلنا في الحصول على موقعك لذلك سيتم تعطيل بعض الميزات التي تتطلب
                الموقع ضمن هذه الصفحة أو أعد تحميل الصفحة للمحاولة مرة أخرى
              </h5>
            </>
          );
          showPopUpNote();
        }
    }, [error])  
    
  return (
    <>
        <NotePopUp noteMsg={noteMsg} />
        <Navbar/>  
        <div className='bg-bgColor shadow-bgShadow pt-28 md:pt-24 pb-10 md:pb-4 px-4 md:px-8 min-h-screen md:h-screen flex flex-col space-y-10 items-center md:space-y-0 md:flex-row md:space-x-5 text-end'>

            {/* //! left section */}
            <div className='w-full md:w-1/2 xl:w-2/3 h-[350px] md:h-full flex flex-col space-y-5 items-center text-center font-bold'>
                <div className='flex justify-center items-center space-x-3'>

                    <div className='flex items-center space-x-1'>
                        <label htmlFor='only'>عرض المتجر المحدد فقط</label>
                        <input 
                        type="radio" 
                        id="only" 
                        name='mapStore'
                        onChange={(e)=>setStoresNumber('only')}/>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <label htmlFor='all'>عرض جميع المتاجر معاً</label>
                        <input 
                        type="radio" 
                        id="all"  
                        name='mapStore' 
                        defaultChecked={true}
                        onChange={(e)=>setStoresNumber('all')}/>
                    </div>

                </div>

                {/* Map */}
                <div className='w-full h-full rounded-lg shadow-cardShadow'>
                    <div className="w-full h-full rounded-lg shadow-mapShadow dark:shadow-darkMapShadow">
                        {coords.length > 0 && <Map coords={coords} />}
                    </div>
                </div>

            </div>
            {/* //! right Section */}
            <div className='w-full md:w-1/2 xl:w-1/3 h-[500px] md:h-full rounded-lg shadow-cardShadow flex flex-col space-y-5 p-5'>
                <div className='text-center flex flex-col space-y-1'>
                    جميع المتاجر التي تقبل الدفع عن طريق 
                    <span>WEPAY</span>
                </div>
                <Search/>
                <div className='flex space-x-3'>
                    <select 
                    name='store' 
                    className='outline-none bg-textColor2 text-textColor text-end rounded-lg shadow-cardShadow w-1/2 h-9 px-3'>
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
                    
                    <select 
                    name='city' 
                    className='outline-none bg-textColor2 text-textColor text-end rounded-lg shadow-cardShadow w-1/2 h-9 px-3'>
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

                </div>
                <div className='flex flex-col space-y-5 p-5 pl-1 rounded-lg overflow-y-auto XScrollbar w-[100%] self-center'>
                    <Seller id="1" img="storePhoto.svg" name="أبو عبدو ماركت" type="محل خضرة" address="حمص شارع الحضارة جانب الإطفائية حمص شارع الحضارة جانب الإطفائية حمص شارع الحضارة جانب الإطفائية حمص شارع الحضارة جانب الإطفائية حمص شارع الحضارة جانب الإطفائية حمص شارع الحضارة جانب الإطفائية"/>
                    <Seller id="2" img="storePhoto.svg" name="أبو عبدو ماركت" type="محل خضرة" address="حمص شارع الحضارة جانب الإطفائية"/>
                    <Seller id="3" img="storePhoto.svg" name="أبو عبدو ماركت" type="محل خضرة" address="حمص شارع الحضارة جانب الإطفائية"/>
                    <Seller id="4" img="storePhoto.svg" name="أبو عبدو ماركت" type="محل خضرة" address="حمص شارع الحضارة جانب الإطفائية"/>
                    <Seller id="5" img="storePhoto.svg" name="أبو عبدو ماركت" type="محل خضرة" address="حمص شارع الحضارة جانب الإطفائية"/>
                    <Seller id="6" img="storePhoto.svg" name="أبو عبدو ماركت" type="محل خضرة" address="حمص شارع الحضارة جانب الإطفائية"/>
                    <Seller id="7" img="storePhoto.svg" name="أبو عبدو ماركت" type="محل خضرة" address="حمص شارع الحضارة جانب الإطفائية"/>
                </div>
            </div>
            
        </div>
    </>
  )
}

export default Sellers