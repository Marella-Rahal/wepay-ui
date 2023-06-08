import axios from 'axios';
import { parseCookies } from 'nookies';
import React from 'react'
import { useDispatch } from 'react-redux';
import { saveUser } from '../../Redux/Slices/userSlice';

const StatisticPayment = (props) => {

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
    
            props.setAllPayments( prev => prev !== undefined ? prev.filter( p => p._id !== id) : undefined )
    
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
        
                props.setAllPayments( 
                    prev => prev !== undefined 
                    ? prev.map( p => {
                        if( p._id == id ){
                            p = res.data.payment
                        }
                        return p
                    }) 
                    : undefined 
                )
        
                props.setSendingStatus(false);
            }
            
            
        } catch (error) {
    
            props.setSendingStatus(false);
    
            alert(error?.response?.data?.message)
        }
    
    }

  return (
        <div className='px-2 py-4 text-[12px] xs:text-sm text-textColor dark:text-textColor2 rounded-lg shadow-cardShadow flex flex-col-reverse items-center md:flex-row md:space-x-3 md:justify-between text-center'>

            <div className='flex flex-col space-y-3 mt-3 md:mt-0 md:min-w-max'>
                <div>
                    {props.paymentValue} SYP  
                </div>

                <div className='self-center flex flex-col space-y-2 md:space-y-0 md:max-w-[100px]'>
                    <span className='dark:text-effectColor'> آخر موعد للدفع</span>
                    <span> {props.date} </span>
                </div>

                {
                    ( new Date() <= new Date(props.date) ) ? (
                        <>
                            {
                                ( props.isPayable == 1 && !props.paidStatus ) && (
                                    <button className='text-[12px] xs:text-sm p-1 px-3 self-center md:self-end md:hidden' onClick={payNow}>
                                    {
                                        props.isMonthlyPayable == 1 ? 'دفع القسط الشهري' : 'ادفع الآن'
                                    }    
                                    </button>
                                )
                            }

                            {
                                ( props.isPayable == 1 && props.paidStatus ) && (
                                    <span className='text-effectColor flex md:hidden'>
                                        {`عدد الأشهر المتبقية ${props.numberOfMonthsLeft} شهر / قيمة القسط   ${props.monthlyValue} / تم الدفع هذا الشهر`}
                                    </span>
                                )
                            }
                            {
                                props.isPayable == 0  && (
                                    <span className='text-effectColor flex md:hidden'>
                                    {
                                        props.isMonthlyPayable == 1 ? `عدد الأشهر المتبقية ${props.numberOfMonthsLeft} شهر / قيمة القسط  ${props.monthlyValue} / ${props.daysDiff} يوم لنهاية وقت القسط الحالي` : 'دفع لمرة واحدة يدوياً'
                                    }
                                    </span>
                                )
                            }
                        </>
                    ) : (
                        <span className='text-red-400 flex md:hidden'>
                        لقد تجاوزت آخر موعد للدفع
                        </span>
                    )
                }
                
                          
            </div>

            <div className='flex flex-col space-y-3 md:text-end'>

                <div>{props.paymentInfo}</div>
                {
                    ( new Date() <= new Date(props.date) ) ? (
                        <>
                            {
                                ( props.isPayable == 1 && !props.paidStatus ) && (
                                    <button className='text-[12px] xs:text-sm p-1 px-3 self-center md:self-end hidden md:flex' onClick={payNow}>
                                    {
                                        props.isMonthlyPayable == 1 ? 'دفع القسط الشهري' : 'ادفع الآن'
                                    }
                                    </button>
                                )
                            }
                            {
                                ( props.isPayable == 1 && props.paidStatus ) && (
                                    <span className='text-effectColor hidden md:flex'>
                                        {`عدد الأشهر المتبقية ${props.numberOfMonthsLeft} شهر / قيمة القسط   ${props.monthlyValue} / تم الدفع هذا الشهر`}
                                    </span>
                                )
                            }
                            {
                                props.isPayable == 0  && (
                                    <span className='text-effectColor hidden md:flex'>
                                    {
                                        props.isMonthlyPayable == 1 ? `عدد الأشهر المتبقية ${props.numberOfMonthsLeft} شهر / قيمة القسط  ${props.monthlyValue} / ${props.daysDiff} يوم لنهاية وقت القسط الحالي` : 'دفع لمرة واحدة يدوياً'
                                    }
                                    </span>
                                )
                            }
                        </>
                    ) : (
                        <span className='text-red-400 hidden md:flex'>
                        لقد تجاوزت آخر موعد للدفع
                        </span>
                    )
                }
                

            </div>
            
        </div>
  )
}

export default StatisticPayment