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

//! used in three places
//! in useffect twice and in stores.map once  
const stores = [
    {
      id: 1,
      coo: [36.720798, 34.725587],
      name: "For_you",
      type:'أطعمة',
      city:'حمص',
      address:'شارع الحضارة جانب الإطفائية'
    },
    {
      id: 2,
      coo: [36.720798, 34.7254],
      name: "For_you",
      type:'ألبسة',
      city:'حماة',
      address:'شارع الحضارة جانب الإطفائية'
    },
    {
      id: 3,
      coo: [36.7206, 34.725587],
      name: "For_you",
      type:'بالة',
      city:'اللاذقية',
      address:'شارع الحضارة جانب الإطفائية'
    },
    {
      id: 4,
      coo: [36.6, 34.725587],
      name: "For_you",
      type:'مواد تنظيف',
      city:'طرطوس',
      address:'شارع الحضارة جانب الإطفائية'
    },
    {
      id: 5,
      coo: [36.7206, 34.725],
      name: "For_you",
      type:'أطعمة',
      city:'حمص',
      address:'شارع الحضارة جانب الإطفائية'
    },
    {
      id: 6,
      coo: [36.55, 34.725587],
      name: "For_you",
      type:'صاغة',
      city:'حماة',
      address:'شارع الحضارة جانب الإطفائية'
    },
];

const Sellers = () => {

    //! to display number of stores on map
    const [storesCounter,setStoresCounter]=useState('all');
    const [storeId,setStoreId]=useState('');
    const [storesOnMap,setStoresOnMap]=useState([]);
    useEffect(()=>{

        if(storesCounter=='all'){
            setStoresOnMap(stores);
        }else if(storesCounter=='only'&& storeId){
            setStoresOnMap(stores.filter(store => store.id == storeId))
        }else{
            setStoresOnMap([])
        }

    },[storeId,storesCounter])


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
        <div className='bg-bgColor shadow-bgShadow pt-28 md:pt-24 pb-7 md:pb-4 px-4 md:px-8 min-h-screen md:h-screen flex flex-col-reverse items-center md:flex-row md:space-x-7 text-end'>

            {/* //! left section */}
            <div className='w-full md:w-1/2 xl:w-2/3 md:h-full flex flex-col space-y-7 items-center text-center font-bold mt-7 md:mt-0'>
                <div className='flex justify-center items-center space-x-3'>

                    <div className='flex items-center space-x-1'>
                        <label htmlFor='only'>عرض المتجر المحدد فقط</label>
                        <input 
                        type="radio" 
                        id="only" 
                        name='mapStore'
                        onChange={(e)=>setStoresCounter('only')}/>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <label htmlFor='all'>عرض جميع المتاجر معاً</label>
                        <input 
                        type="radio" 
                        id="all"  
                        name='mapStore' 
                        defaultChecked={true}
                        onChange={(e)=>setStoresCounter('all')}/>
                    </div>

                </div>

                {/* Map */}
                <div className='w-full h-[400px] md:h-full rounded-lg shadow-cardShadow'>
                    <div className="w-full h-full rounded-lg shadow-mapShadow dark:shadow-darkMapShadow">
                        {coords.length > 0 && <Map stores={storesOnMap} coords={coords} />}
                    </div>
                </div>

            </div>
            {/* //! right Section */}
            <div className='w-full md:w-1/2 xl:w-1/3 md:h-full md:rounded-lg md:shadow-cardShadow flex flex-col space-y-5 md:p-5'>
                <div className='text-center flex flex-col space-y-1'>
                    جميع المتاجر التي تقبل الدفع عن طريق 
                    <span>WEPAY</span>
                </div>
                <Search/>
                <div className='flex space-x-3'>
                    <select 
                    name='store' 
                    className='outline-none bg-textColor2 text-textColor text-end rounded-lg shadow-cardShadow w-1/2 h-9 pr-2'>
                        <option value="">تصنيف حسب نوع المتجر</option>
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
                    
                    <select 
                    name='city' 
                    className='outline-none bg-textColor2 text-textColor text-end rounded-lg shadow-cardShadow w-1/2 h-9 pr-2'>
                        <option value="">تصنيف حسب المحافظة</option>
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
                <div dir="rtl" className='flex flex-col space-y-3 p-1 pl-3 rounded-lg overflow-y-auto XScrollbar w-full h-[250px] md:h-full'>

                  {
                    stores.map((store,index)=>{
                      return <Seller
                      key={index} 
                      id={store.id} 
                      img="storePhoto.svg"
                      name={store.name}
                      type={store.type}
                      address={`${store.city} - ${store.address}`}
                      storeId={storeId}
                      setStoreId={setStoreId}/>
                    })
                  }
  
                </div>
            </div>
            
        </div>
    </>
  )
}

export default Sellers