import { useRouter } from 'next/router'
import React from 'react'
import { parseCookies } from 'nookies';

const Main = () => {

  const router=useRouter();  
  const cookies = parseCookies();
  const token = cookies.token

  return (
    <div className='bg-bgColor shadow-bgShadow pt-28 pb-14 px-4 md:px-8 w-full flex flex-col space-y-10 items-center md:space-y-0 md:flex-row md:justify-center md:space-x-24'>
        <div>
            <img src='../../main.svg' className='w-[300px] md:w-[450px]'/>
        </div>
        
        <div className='flex flex-col space-y-7 items-end text-end'>

            <h3 className='text-effectColor'>
                إدارة الأموال بطرق مختلفة لم تعهدها من قبل
            </h3>

            <div>
            سهولة التحكم في أموالك بحرية <br/>
            أرسل و استقبل المال من أي مكان في سوريا <br/>
            تمتع بأمان وسرية عالية في محفظتك    
            </div>

            {
                !token && (
                    <button onClick={()=>router.push('/signup')}>اشترك الآن</button>
                )
            }

            <div>
            أو قم بتحميل التطبيق على جهاز الموبايل الخاص بك 
            </div>

            <div className='flex items-center'>
                <div className='cursor-pointer hover:scale-[1.1]'>
                    <img src="../../appleStore.svg" />
                </div>
                
                <div className='cursor-pointer hover:scale-[1.1] -mr-2'>
                    <img src="../../googlePlay.svg" />
                </div>
                
            </div>

        </div>
    </div>
  )
}

export default Main