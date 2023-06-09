import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import DelegateInfo from '../components/Delegate/DelegateInfo';
import { BiSearchAlt2 } from 'react-icons/bi';
import AddDelegate from '../components/Delegate/AddDelegate';
import ReactPaginate from 'react-paginate';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import axios from 'axios';
import FailToGet from '../components/FailToGet';
import { wrapper } from '../Redux/Store'
import { filterByCity, filterByCityAndName, filterByName, saveDelegates, selectDelegates, selectFilteredDelegates } from '../Redux/Slices/delegatesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { parseCookies } from 'nookies';
import Lottie from "lottie-react";
import emptyResult from "../public/empty.json";

function Delegates( { success } ) {

  const cookies = parseCookies();
  const role = cookies.role;
  
  const dispatch=useDispatch();
  const delegates=useSelector(selectDelegates);
  const filteredDelegates=useSelector(selectFilteredDelegates);

  const [cityFilter,setCityFilter]=useState('');
  const [nameFilter,setNameFilter]=useState('');
  const [info,setInfo] = useState(delegates);

  //* 𝗥𝗲𝗮𝗰𝘁-𝗣𝗮𝗴𝗶𝗻𝗮𝘁𝗲 *********************************************************

  const [delegatesPerPage,setDelegatesPerPage]=useState(10);

  const [currentPage, setCurrentPage] = useState(0); // Current page state
  const [delegatesDisplayed, setDelegatesDisplayed] = useState( info.slice(0,delegatesPerPage) );
  const [FirstArrow, setFirstArrow] = useState(false);
  const [LastArrow, setLastArrow] = useState(info.length > delegatesPerPage);

  //* 𝗰𝗵𝗮𝗻𝗴𝗶𝗻𝗴 𝘁𝗵𝗲 𝗳𝗶𝗿𝘀𝘁𝗔𝗿𝗿𝗼𝘄 , 𝗹𝗮𝘀𝘁𝗔𝗿𝗿𝗼𝘄 , 𝗰𝘂𝗿𝗿𝗲𝗻𝘁𝗣𝗮𝗴𝗲 𝗮𝗻𝗱 𝘁𝗵𝗲 𝗱𝗲𝗹𝗲𝗴𝗮𝘁𝗲𝘀𝗗𝗶𝘀𝗽𝗹𝗮𝘆𝗲𝗱 𝗯𝗮𝘀𝗲𝗱 𝗼𝗻 𝘁𝗵𝗲 𝗻𝗲𝘄 𝘀𝗲𝗹𝗲𝗰𝘁𝗲𝗱 𝗱𝗮𝘁𝗮

  const handleChange = (data) => {

    // 𝗳𝗼𝗿 𝗹𝗲𝗳𝘁 𝗮𝗿𝗿𝗼𝘄
    if ( data.selected == 0 ) setFirstArrow(false);
    else setFirstArrow(true);

    // 𝗳𝗼𝗿 𝗿𝗶𝗴𝗵𝘁 𝗮𝗿𝗿𝗼𝘄
    if ( data.selected == ( Math.ceil(info.length / delegatesPerPage) - 1 ) ) setLastArrow(false);
    else setLastArrow(true);

    setCurrentPage(data.selected)

    setDelegatesDisplayed(info.slice(data.selected * delegatesPerPage, data.selected * delegatesPerPage + delegatesPerPage));

  };

  //* 𝗰𝗵𝗮𝗻𝗴𝗶𝗻𝗴 𝘁𝗵𝗲 𝗳𝗶𝗿𝘀𝘁𝗔𝗿𝗿𝗼𝘄 , 𝗹𝗮𝘀𝘁𝗔𝗿𝗿𝗼𝘄 , 𝗰𝘂𝗿𝗿𝗲𝗻𝘁𝗣𝗮𝗴𝗲 𝗮𝗻𝗱 𝘁𝗵𝗲 𝗱𝗲𝗹𝗲𝗴𝗮𝘁𝗲𝘀𝗗𝗶𝘀𝗽𝗹𝗮𝘆𝗲𝗱 𝗯𝗮𝘀𝗲𝗱 𝗼𝗻 𝘁𝗵𝗲 𝗻𝗲𝘄 𝗶𝗻𝗳𝗼

  useEffect(()=>{

    setCurrentPage(0);

    setDelegatesDisplayed(info.slice(0,delegatesPerPage))

    setFirstArrow(false);

    setLastArrow(info.length > delegatesPerPage)

  },[info])

  //* 𝗱𝗶𝘀𝗽𝗮𝘁𝗰𝗵𝗶𝗻𝗴 𝘁𝗵𝗲 𝗳𝗶𝗹𝘁𝗲𝗿𝗶𝗻𝗴 𝗳𝘂𝗻𝗰𝘁𝗶𝗼𝗻 𝗯𝗮𝘀𝗲𝗱 𝗼𝗻 𝘁𝗵𝗲 𝘀𝘁𝗮𝘁𝗲 𝘃𝗮𝗹𝘂𝗲 𝗼𝗿 𝗱𝗶𝘀𝗽𝗹𝗮𝘆 𝗮𝗹𝗹 𝘁𝗵𝗲 𝗱𝗲𝗹𝗲𝗴𝗮𝘁𝗲𝘀 𝘄𝗵𝗲𝗻 𝘁𝗵𝗲 𝘀𝘁𝗮𝘁𝗲 𝗶𝘀 𝗲𝗺𝗽𝘁𝘆 𝗮𝗻𝗱 𝘁𝗵𝗲𝗿𝗲 𝗶𝘀 𝗻𝗼 𝗳𝗶𝗹𝘁𝗲𝗿

  useEffect(()=>{

    if(cityFilter && nameFilter){

      dispatch(filterByCityAndName( { city:cityFilter , fullName:nameFilter } ))

    }else if(nameFilter){

      dispatch(filterByName(nameFilter))

    }else if(cityFilter){

      dispatch(filterByCity(cityFilter))

    }else{

      setInfo(delegates)

    }

  },[cityFilter,nameFilter])

  //* 𝗱𝗶𝘀𝗽𝗹𝗮𝘆 𝘁𝗵𝗲 𝗳𝗶𝗹𝘁𝗲𝗿𝗲𝗱𝗗𝗲𝗹𝗲𝗴𝗮𝘁𝗲𝘀

  useEffect(()=>{

    setInfo(filteredDelegates);

  },[filteredDelegates])


  //* 𝗿𝗲𝗺𝗼𝘃𝗲 𝘁𝗵𝗲 𝗳𝗶𝗹𝘁𝗲𝗿𝗶𝗻𝗴 𝗮𝗻𝗱 𝗿𝗲𝘀𝗲𝘁 𝘁𝗵𝗲 𝗱𝗲𝗹𝗲𝗴𝗮𝘁𝗲𝘀 𝗮𝗳𝘁𝗲𝗿 𝗮𝗱𝗱𝗶𝗻𝗴 𝗮𝗱𝗱𝗶𝗻𝗴 𝗮 𝗻𝗲𝘄 𝗱𝗲𝗹𝗲𝗴𝗮𝘁𝗲 
  useEffect(()=>{

    setNameFilter('')
    setCityFilter('');
    setInfo(delegates)

  },[delegates])

  return (
    <>
      {
        success ? (
          <>
            <Navbar/>
            <div className="pt-28 pb-10 bg-bgColor shadow-bgShadow w-full min-h-screen flex flex-col space-y-7">

                {/* first section */}
                <div className="flex flex-col space-y-7 md:space-y-0 md:flex-row md:space-x-7 md:justify-between md:items-center mx-4 md:mx-8">

                  <div className='w-full md:w-1/2 h-fit'>
                    <img src="../delegate.svg" className="w-full h-[350px]"/>
                  </div>

                  <div className="w-full md:w-1/2 flex flex-col space-y-7 items-end">

                    <div className="w-full md:w-[80%] leading-relaxed text-effectColor dark:text-textColor2 text-xl md:text-2xl text-end">
                      يمكنك الآن شحن وتعبئة رصيد حسابك مباشرةً عن طريق وكلائنا في جميع
                      المحافظات السورية دون حدوث أي تأخير أو انتظار
                    </div>
                    {
                      role == "admin" && (
                        <AddDelegate />
                      )
                    }

                  </div>

                </div>

                {/* Line */}
                <div className="w-full flex items-center px-4 md:px-8">
                  <div className="w-1/2 h-[1px] bg-effectColor" />
                  <img src="logo.svg" />
                  <div className="w-1/2 h-[1px] bg-effectColor" />
                </div>

                {/* delegates */}
                <div className="w-full text-center text-effectColor dark:text-textColor2 text-2xl md:text-3xl px-4 md:px-8">
                  الوكلاء
                </div>

                {/* classification and filter */}
                <div className="w-full flex flex-col space-y-7 md:space-y-0 md:flex-row md:justify-between md:items-center px-4 md:px-8">

                    {/* search */}
                    <div className="flex">
                      <label className="bg-white rounded-l-lg shadow-cardShadow cursor-pointer px-2 py-[5px] text-textColor flex justify-center items-center">
                        <BiSearchAlt2 className="w-[19px] h-[19px] hover:scale-[1.1]" />
                      </label>
                      <input
                        type="text"
                        placeholder="اسم الوكيل"
                        className="w-full rounded-l-none shadow-cardShadow outline-none focus:border-2 border-effectColor px-3 py-[5px] h-9"
                        value={nameFilter}
                        onChange={ (e) => setNameFilter(e.target.value) }
                      />
                    </div>

                    <select
                      name="delegates"
                      className="outline-none bg-white text-textColor text-end rounded-lg shadow-cardShadow h-9 px-2"
                      value={cityFilter}
                      onChange={ (e) => setCityFilter(e.target.value) }
                    >
                      <option value="">تصنيف الوكلاء حسب المحافظة </option>
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

                <div className="flex flex-wrap justify-evenly mx-4 md:mx-8">

                  {
                      (delegatesDisplayed.length !== 0) ? (
                        delegatesDisplayed.map((value, index) => {
                          return <DelegateInfo delegate={value} key={index} />;
                        })
                      ) : (
                        <div className='flex justify-center items-center'>
                          <Lottie animationData={emptyResult} loop={true} />
                        </div>
                      )
                  }

                </div>

                <ReactPaginate
                  breakLabel={<span>...</span>}
                  nextLabel={
                    LastArrow && (
                      <BsChevronRight />
                    )
                  }
                  forcePage={currentPage} // Set the current active page
                  onPageChange={handleChange}
                  pageRangeDisplayed={1} // Display 1 page buttons on either side of the active page button
                  marginPagesDisplayed={1} // Display 1 page button on either side of the first and last page buttons
                  pageCount={ Math.ceil(info.length / delegatesPerPage) }
                  previousLabel={
                    FirstArrow && (
                      <BsChevronLeft />
                    )
                  }
                  containerClassName="flex items-center justify-center space-x-1 md:space-x-3 pt-3 text-[grey] dark:text-white"
                  pageClassName="text-[grey] bg-textColor2 text-sm flex items-center justify-center rounded-lg px-3 py-2"
                  activeClassName="text-[white] bg-gradient-to-b from-gradientTo to-gradientTo"
                />

            </div>
          </>
        ) : (
          <FailToGet/>
        )
      }
      
    </>
  );
}

export default Delegates;

export const getServerSideProps = wrapper.getServerSideProps( store => async (context) =>{

    try {

          const res = await axios.get(`${process.env.server_url}/api/v1.0/dealers/getAllDealers`);

          if( res.data.data !== undefined){
            store.dispatch(saveDelegates(res.data.data))
          }
          
          return {
            props : {
              success : true
            }
          }

    } catch (error) {

          return {
            props : {
              success : false
            }
          }

    }

})