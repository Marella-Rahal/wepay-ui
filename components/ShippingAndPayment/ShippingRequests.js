import axios from 'axios';
import { parseCookies } from 'nookies';
import React from 'react'
import { useDispatch } from 'react-redux';
import { saveUser } from '../../Redux/Slices/userSlice';
import ProcessImageUrl from './ProcessImageUrl';

const ShippingRequests = (props) => {
  
  const dispatch = useDispatch();  
  const cookies = parseCookies();
  const token = cookies.token;  

  const confirmDeposit = async () => {

        const id = props.id;

        try {

            props.setSendingStatus(true);  

            const res = await axios.put(`${process.env.server_url}/api/v1.0/transaction/depositResponse/${id}`,{},{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })

            dispatch(saveUser(res.data.user))

            props.setActions(res.data.actions)

            props.setShippingActions( prev => prev.filter( a => a._id !== id ) );
          
            props.setSendingStatus(false);
            
        } catch (error) {

            props.setSendingStatus(false);
        
            alert(error?.response?.data?.message);

        }
  }  
    
  return (
    <div dir='ltr' className='my-5 md:mx-3 rounded-xl shadow-cardShadow px-3 py-5 flex flex-col space-y-10 md:justify-between w-full md:w-[350px] text-[12px] xs:text-sm text-textColor dark:text-textColor2'>

        <div className='flex flex-col space-y-3 text-center md:text-end'>

            <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                <span> {props.type} </span> 
                : طريقة الشحن
            </span>
            <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                <span> {props.value} </span> 
                : قيمة المبلغ المُرسل
            </span>
            <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                <span> {props.date} </span> 
                : تاريخ الشحن 
            </span>
            {
                props.type == 'شحن-هرم' && (
                    <>
                        <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                                <span> {props.name} </span> 
                                : اسم المرسل 
                        </span>
                        <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                                <span> {props.phone} </span> 
                                :  رقم المرسل 
                        </span>
                        <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                                <span> {props.city} </span> 
                                : عنوان المرسل 
                        </span>
                        <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                                <span> {props.processNumber} </span> 
                                :  رقم عملية الإرسال 
                        </span>     
                    </>
                )
            }
            {
                props.type == 'شحن-كاش' && (
                    <>

                        <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                                <span> {props.phone} </span> 
                                :  رقم المرسل 
                        </span>
                        <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                                <span> {props.processNumber} </span> 
                                :  رقم عملية التحويل 
                        </span>
                    
                    </>
                )
            } 
            
            {
                props.type == 'شحن-بيمو' && (
                    <>
                        <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                                <span> {props.name} </span> 
                                : اسم المرسل 
                        </span>
                        <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                                <span> {props.accountID} </span> 
                                :  رقم حساب بنك بيمو للمرسل 
                        </span>
                    </>
                )
            }    

        </div>
        <div className={ props.type == 'شحن-هرم' ? 'flex justify-between space-x-3' : 'flex justify-center'}>
            <button onClick={confirmDeposit}>معالجة الطلب</button>
            {
                props.type == 'شحن-هرم' && (
                    <ProcessImageUrl imgURL={props.processImageUrl}/>
                )
            }
        </div>
    </div>
  )
}

export default ShippingRequests