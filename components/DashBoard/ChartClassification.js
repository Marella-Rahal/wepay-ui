import axios from 'axios';
import { parseCookies } from 'nookies';
import React from 'react';
import { useState } from 'react';
import {AiFillCaretDown} from 'react-icons/ai';

const ChartClassification = (props) => {

  const cookies=parseCookies();
  const token=cookies.token;
  const [visible,setVisible]=useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1 to get the actual month
  const numberOfDays = new Date(currentYear, currentMonth, 0).getDate();

  const [monthlyData,setMonthlyData]=useState({

    labels: Array.from({ length: numberOfDays }, (_, index) => (index + 1).toString()),
    datasets: [
      {
        label:"إجمالي الصرف خلال هذا اليوم ",
        data:Array(numberOfDays).fill(0),
        backgroundColor:["#3fb37f","#8488ED"],
        hoverBackgroundColor:["#29b23d","#565bd0"],
        borderRadius:10,
      }
    ]
  
  });

  const [dailyData,setDailyData]=useState({

    labels: [
        "12 AM","1 AM","2 AM","3 AM","4 AM","5 AM","6 AM","7 AM","8 AM","9 AM","10 AM","11 AM",
        "12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM"
      ],
      datasets: [
        {
          label:"إجمالي الصرف خلال هذه الساعة ",
          data:Array(24).fill(0),
          backgroundColor:["#3fb37f","#8488ED"],
          hoverBackgroundColor:["#29b23d","#565bd0"],
          borderRadius:10,
        }
      ]
  
  });

  const getCurrentYearData = () => {

      setVisible(false);
      props.setChartClass(props.yearlyData);

  }

  const getCurrentMonthData = async ()=>{

        setVisible(false);

        if(!props.monthly){

            try {

              props.setChartStatus(true);
    
              const res= await axios.get(`${process.env.server_url}/api/v1.0/transaction/getDaysChart`, {
                  headers : {
                      Authorization : `Bearer ${token}`
                  }
              })
    
              res.data.chartData.forEach( element => {
                monthlyData.datasets[0].data[element._id - 1] = element.totalAmount
              });
    
              props.setChartClass(monthlyData);
    
              props.setChartStatus(false);

              props.setMonthly(true);
            
            } catch (error) {
    
              props.setChartStatus(false);
    
              alert(error?.response?.data?.message)
              
            }

        }else{

            props.setChartClass(monthlyData);

        }

        

  }

  const getCurrentDayData = async ()=>{

        setVisible(false);

        if(!props.daily){

            try {

              props.setChartStatus(true);
    
              const res= await axios.get(`${process.env.server_url}/api/v1.0/transaction/getHoursChart`, {
                  headers : {
                      Authorization : `Bearer ${token}`
                  }
              })
    
              res.data.chartData.forEach( element => {
                dailyData.datasets[0].data[element._id + 3 >= 24 ? (element._id + 3) - 24 : element._id + 3 ] = element.totalAmount
              });
    
              props.setChartClass(dailyData);
    
              props.setChartStatus(false);

              props.setDaily(true);
            
            
            } catch (error) {
    
              props.setChartStatus(false);
    
              alert(error?.response?.data?.message)
              
            }

        }else{

          props.setChartClass(dailyData);

        }

        

  }

  return (
        <div className='relative w-fit text-[12px] md:text-base select-none mb-3'>

            <div onClick={ () => setVisible(prev=>!prev) } className='p-2 rounded-lg shadow-cardShadow flex space-x-3 items-end cursor-pointer hover:scale-[1.05]'>
                <div>
                  <AiFillCaretDown className='w-4 h-4 md:w-5 md:h-5'/>
                </div>
                <div>: تصنيف حسب</div>
                 
            </div>

            <div className={`${ visible ? 'flex' : 'hidden' } absolute bg-textColor2 rounded-md flex-col text-sm font-semibold text-center`}>
                <div className='p-3 rounded-t-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2 border-b-[1px] border-textColor' 
                onClick={getCurrentYearData}>السنة الحالية</div>

                <div className='p-3 border-b-[1px] border-textColor cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2' 
                onClick={getCurrentMonthData}>الشهر الحالي</div>

                <div className='p-3 rounded-b-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2' 
                onClick={getCurrentDayData}>اليوم الحالي</div>
            </div>

        </div>
  )
}

export default ChartClassification