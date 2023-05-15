import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import DelegateInfo from '../components/Delegate/DelegateInfo';
import { BiSearchAlt2 } from 'react-icons/bi';
import AddDelegate from '../components/Delegate/AddDelegate';
import ReactPaginate from 'react-paginate';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import axios from 'axios';
import FailToGet from '../components/FailToGet';
import { wrapper } from '../Redux/Store'
import { saveUser, selectUser } from '../Redux/Slices/userSlice';
import { saveDelegates, selectDelegates } from '../Redux/Slices/delegatesSlice';
import { useSelector } from 'react-redux';

function Delegates( { role } ) {

  const info=useSelector(selectDelegates)

  // *React-Paginate *********************************************************

  const [delegatesPerPage,setDelegatesPerPage]=useState(10);
  const [delegatesDisplayed, setDelegatesDisplayed] = useState( info.slice(0,delegatesPerPage) );
  const [FirstArrow, setFirstArrow] = useState(false);
  const [LastArrow, setLastArrow] = useState(info.length > delegatesPerPage);

  // 𝗳𝘂𝗻𝗰𝘁𝗶𝗼𝗻𝘀
  const handleChange = (data) => {

    // 𝗳𝗼𝗿 𝗹𝗲𝗳𝘁 𝗮𝗿𝗿𝗼𝘄
    if ( data.selected == 0 ) setFirstArrow(false);
    else setFirstArrow(true);

    // 𝗳𝗼𝗿 𝗿𝗶𝗴𝗵𝘁 𝗮𝗿𝗿𝗼𝘄
    if ( data.selected == ( Math.ceil(info.length / delegatesPerPage) - 1 ) ) setLastArrow(false);
    else setLastArrow(true);

    setDelegatesDisplayed(info.slice(data.selected * delegatesPerPage, data.selected * delegatesPerPage + delegatesPerPage));

  };

  // **************************************************************************

  return (
    <>
      {
        role.length !== 0 ? (
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

                <div className="flex flex-wrap justify-evenly mx-4 md:mx-8">

                  {
                      delegatesDisplayed.map((value, index) => {
                        return <DelegateInfo delegate={value} key={index} />;
                      })
                  }

                </div>

                <ReactPaginate
                  breakLabel={<span>...</span>}
                  nextLabel={
                    LastArrow && (
                      <BsChevronRight />
                    )
                  }
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

      const { req } = context;
      const cookie = req.headers.cookie;

    try {

          const res = await axios.get(`${process.env.server_url}/api/v1.0/delegates/getAllDelegates`,{
            headers: {
              Cookie: cookie,
            },
          });

          const data=res.data;

          if( data.role !== "guest" ){
            store.dispatch(saveUser(data.user))
          }

          if( data.data !== undefined){
            store.dispatch(saveDelegates(data.data))
          }
          
          return {
            props : {
              role : data.role
            }
          }

    } catch (error) {

          return {
            props : {
              role : ""
            }
          }

    }

})