import React from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../Redux/Slices/userSlice';

const Payment = (props) => {

  const dispatch=useDispatch();
  const cookies =parseCookies();
  const token = cookies.token;
  
  const deletePayment = async () => {

    const id = props.id ;

    try {

        props.setSendingStatus(true);

        const res = await axios.delete(`${process.env.server_url}/api/v1.0/payment/deletePayment/${id}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        props.setStatistic( prev => ({ 
            ...prev ,
            lastPayments : res.data.lastPayments !== undefined ? res.data.lastPayments : []
        }))

        props.setAllPayments( prev => prev.filter( p => p._id !== id) )

        props.setSendingStatus(false);
        
    } catch (error) {

        props.setSendingStatus(false);

        alert(error?.response?.data?.message)
        
    }

  }

  const payNow = async () => {

    const id = props.id ;

    try {

        props.setSendingStatus(true);

        const res = await axios.put(`${process.env.server_url}/api/v1.0/payment/payNow/${id}`,{},{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        dispatch(saveUser(res.data.user));

        props.setDaily(false);

        props.setMonthly(false);

        props.setChartClass(()=>{

            props.yearlyData.datasets[0].data = Array(12).fill(0);

            res.data.chartData.forEach( element => {
                props.yearlyData.datasets[0].data[element._id - 1] = element.totalAmount
            });

            return props.yearlyData
        })

        props.setAllActions( prev => prev !== undefined ? [res.data.activity , ...prev] : undefined )
        
        props.setStatistic( prev => ({
            ...prev,
            lastActivities : [res.data.activity , ...prev.lastActivities.slice(0,4)] 
        }))


        if(res.data.payment.paymentValue == 0){

            deletePayment();

        }else{

            props.setStatistic( prev => ({ 
                ...prev ,
                lastPayments : prev.lastPayments.map( p => {
                    if( p._id == id ){
                        p = res.data.payment
                    }
                    return p
                })
            }))
    
            props.setAllPayments( prev => prev.map( p => {
                if( p._id == id ){
                    p = res.data.payment
                }
                return p
            }))
    
            props.setSendingStatus(false);
        }
        
        
    } catch (error) {

        props.setSendingStatus(false);

        alert(error?.response?.data?.message)
    }

  }

  return (
    <div dir='ltr' className='my-5 md:mx-3 rounded-xl shadow-cardShadow px-3 py-5 flex flex-col space-y-10 md:justify-between w-full md:w-[350px] text-[12px] xs:text-sm text-textColor dark:text-textColor2'>

        <div className='flex flex-col space-y-3 md:text-end'>

            <span className='flex flex-wrap-reverse justify-center md:justify-end'>    
                <span>{props.paymentType} </span> 
                : نوع الدفعة
            </span>

            <span className='flex flex-wrap-reverse justify-center md:justify-end'>   
                <span> {props.paymentValue} SYP </span> 
                : قيمة الدفعة 
            </span>
            <span className='flex flex-wrap-reverse justify-center md:justify-end'>   
                <span> {props.paymentInfo} </span> 
                : تفاصيل الدفعة 
            </span>
            <span className='flex flex-wrap-reverse justify-center md:justify-end'> 
                <span> {props.date} </span>
                 : آخر موعد للدفع
            </span>

            {
                    ( props.isPayable == 1 && props.isMonthlyPayable == 1 ) && (
                        <span className='text-effectColor'>
                            {
                                !props.paidStatus ? `دفع كل شهر / متبقي ${props.daysDiff} يوم  لنهاية الشهر` : 'دفع كل شهر / تم الدفع هذا الشهر'
                            }
                        </span>
                    )
            }  
            {
                    ( props.isPayable == 1 && props.isMonthlyPayable == 0 ) && (
                        <span className='text-effectColor'>
                            {
                                !props.paidStatus ? 'دفع لمرة واحدة عبر موقعنا' : 'تم الدفع'
                            }
                        </span>
                    )
            } 

            {
                    ( props.isPayable == 0 && props.isMonthlyPayable == 1 ) && (
                        <span className='text-effectColor'>
                            {`دفع كل شهر / متبقي ${props.daysDiff} يوم  لنهاية الشهر`}
                        </span>
                    )
            }

            {
                    ( props.isPayable == 0 && props.isMonthlyPayable == 0 ) && (
                        <span className='text-effectColor'>
                        دفع لمرة واحدة كاش
                        </span>
                    )
            }

        </div>

        <div className={ props.isPayable == 0 || props.paidStatus ? 'flex justify-center' : 'flex justify-center space-x-3 md:justify-between' }>
            <button className='py-1 px-3' onClick={deletePayment}>حذف الدفعة</button>
            {
               ( props.isPayable == 1 && !props.paidStatus ) && (
                    <button className='py-1 px-3' onClick={payNow}>ادفع الآن</button>
               )
            }
            
        </div>

    </div>
  )
}

export default Payment