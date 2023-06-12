import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Search from '../components/Sellers/Search'
import Seller from '../components/Sellers/Seller';
import usePosition from "../hooks/usePosition";
import NotePopUp, { showPopUpNote } from "../components/PopUp/NotePopUp";
import dynamic from "next/dynamic";
import Loading from "../components/Loading";
import axios from 'axios';
import FailToGet from '../components/FailToGet';
const Map = dynamic(() => import("../components/Map/Map"), {
    loading: () => <Loading />,
    ssr: false,
});
import Lottie from "lottie-react";
import emptyResult from "../public/empty.json";

const Sellers = (props) => {

    const [stores,setStores]=useState(props.data);
    const [cityFilter,setCityFilter]=useState('');
    const [nameFilter,setNameFilter]=useState('');
    const [typeFilter,setTypeFilter]=useState('');

    //! to display number of stores on map
    const [storesCounter,setStoresCounter]=useState('all');
    const [storeId,setStoreId]=useState('');
    const [storesOnMap,setStoresOnMap]=useState([]);
    useEffect(()=>{

        if(storesCounter=='all'){
            setStoresOnMap(stores);
        }else if(storesCounter=='only'&& storeId){
            setStoresOnMap(stores.filter(store => store._id == storeId))
        }else{
            setStoresOnMap([])
        }

    },[storeId,storesCounter,stores])

    useEffect(()=>{

      setStoresCounter('all');
      setStoreId('');

      if(cityFilter && nameFilter && typeFilter){

        setStores( props.data.filter( s => s.city == cityFilter && s.storeName.includes(nameFilter) && s.storeType == typeFilter ) )

      }else if(cityFilter && nameFilter){

        setStores( props.data.filter( s => s.city == cityFilter && s.storeName.includes(nameFilter) ) )

      }else if(cityFilter && typeFilter){

        setStores( props.data.filter( s => s.city == cityFilter && s.storeType == typeFilter ) )

      }else if(nameFilter && typeFilter){

        setStores( props.data.filter( s => s.storeName.includes(nameFilter) && s.storeType == typeFilter ) )

      }else if(cityFilter){

        setStores( props.data.filter( s => s.city == cityFilter ) )

      }else if(nameFilter){

        setStores( props.data.filter( s => s.storeName.includes(nameFilter) ) )

      }else if(typeFilter){

        setStores( props.data.filter( s => s.storeType == typeFilter ) )

      }else{
        setStores(props.data);
      }

    },[cityFilter,nameFilter,typeFilter])

    //todo *********** the massage for the popUp
    const [noteMsg, setNoteMsg] = useState("");
    //todo ********** the location of the user
    const [coords, error] = usePosition();
    useEffect(() => {
        if (error && props.success) {
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
        {
          props.success ? (
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
                                checked={storesCounter == 'only' ? true : false}
                                onChange={(e)=>setStoresCounter('only')}/>
                            </div>
                            <div className='flex items-center space-x-1'>
                                <label htmlFor='all'>عرض جميع المتاجر معاً</label>
                                <input 
                                type="radio" 
                                id="all"  
                                name='mapStore' 
                                checked={storesCounter == 'all' ? true : false}
                                onChange={(e)=>setStoresCounter('all')}/>
                            </div>

                        </div>

                        {/* Map */}
                        <div className='w-full h-[400px] md:h-full rounded-lg shadow-cardShadow'>
                            <div className="w-full h-full rounded-lg shadow-mapShadow dark:shadow-darkMapShadow">
                                { coords.length > 0 && <Map stores={storesOnMap} coords={coords} /> }
                            </div>
                        </div>

                    </div>
                    {/* //! right Section */}
                    <div className='w-full md:w-1/2 xl:w-1/3 md:h-full md:rounded-lg md:shadow-cardShadow flex flex-col space-y-5 md:p-5'>
                        <div className='text-center flex flex-col space-y-1'>
                            جميع المتاجر التي تقبل الدفع عن طريق 
                            <span>WEPAY</span>
                        </div>
                        <Search nameFilter={nameFilter} setNameFilter={setNameFilter}/>
                        <div className='flex space-x-3'>
                            <select 
                            name='store'
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value) } 
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
                            value={cityFilter}
                            onChange={(e) => setCityFilter(e.target.value) } 
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
                        <div dir="rtl" className={ stores.length !== 0 ? 'flex flex-col space-y-3 p-1 pl-3 rounded-lg overflow-y-auto XScrollbar w-full h-[250px] md:h-full' : 'flex self-center h-full' }>

                          {
                            stores.length !== 0 ? (
                              stores.map((store,index)=>{
                                return <Seller
                                key={index} 
                                id={store._id} 
                                img={store.storeImgURL}
                                name={store.storeName}
                                type={store.storeType}
                                address={`${store.city} - ${store.address}`}
                                storeId={storeId}
                                setStoreId={setStoreId}/>
                              })
                            ) : (
                              <div className='flex justify-center items-center'>
                                <Lottie animationData={emptyResult} loop={true} />
                              </div>
                            )
                          }
          
                        </div>
                    </div>
                    
                </div>
            </>
          ) : <FailToGet/>
        }
    </>
  )
}

export default Sellers

export const getServerSideProps = async (context) => {

  try {

        const res = await axios.get(`${process.env.server_url}/api/v1.0/store/getAllStores`);

        return {
          props : {
            success : true ,
            data : res.data.data != undefined ? res.data.data : []
          }
        }

  } catch (error) {

        return {
          props : {
            success : false
          }
        }

  }

}