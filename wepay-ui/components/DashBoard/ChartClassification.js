import React from 'react';
import {AiFillCaretDown} from 'react-icons/ai';

const yearlyData = {

    labels: [
      "Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec",
    ],
    datasets: [
      {
        label:"إجمالي الصرف خلال هذا الشهر ",
        data:[
          200,30,40,60,20,35,20,30,40,60,20,35,
        ],
        backgroundColor:["#3fb37f","#8488ED"],
        hoverBackgroundColor:["#29b23d","#565bd0"],
        borderRadius:10,
      }
    ]
  
}

const monthlyData = {

    labels: [
      "1","2","3","4","5","6","7","8","9","10","11","12",
      "13","14","15","16","17","18","19","20","21","22",
      "23","24","25","26","27","28","29","30","31"
    ],
    datasets: [
      {
        label:"إجمالي الصرف خلال هذا اليوم ",
        data:[
          20,320,400,600,20,35,20,30,40,20,2,30,
          20,320,400,600,20,35,20,30,40,20,2,30,
          20,320,400,600,20,35,20,
        ],
        backgroundColor:["#3fb37f","#8488ED"],
        hoverBackgroundColor:["#29b23d","#565bd0"],
        borderRadius:10,
      }
    ]
  
}

const dailyData ={

    labels: [
        "12 AM","1 AM","2 AM","3 AM","4 AM","5 AM","6 AM","7 AM","8 AM","9 AM","10 AM","11 AM",
        "12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM"
      ],
      datasets: [
        {
          label:"إجمالي الصرف خلال هذه الساعة ",
          data:[
            20,40,10,0,10,350,200,25,40,30,20,35,
            20,40,10,0,10,350,200,25,40,30,20,35,
          ],
          backgroundColor:["#3fb37f","#8488ED"],
          hoverBackgroundColor:["#29b23d","#565bd0"],
          borderRadius:10,
        }
      ]

}

const ChartClassification = (props) => {
  return (
        <div className='relative group w-fit'>

            <div className='p-2 rounded-lg shadow-cardShadow self-start flex w-[170px] justify-between items-center cursor-pointer group-hover:scale-[1.05]'>
                <AiFillCaretDown className='w-6 h-6'/>
                : تصنيف حسب 
            </div>

            <div className='hidden group-hover:flex absolute bg-textColor2 rounded-md flex-col text-sm font-bold text-center'>
                <div className='p-3 rounded-t-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2 border-b-[1px] border-textColor' onClick={()=>props.setChartClass(yearlyData)}>السنة الحالية</div>

                <div className='p-3 border-b-[1px] border-textColor cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2' onClick={()=>props.setChartClass(monthlyData)}>الشهر الحالي</div>

                <div className='p-3 rounded-b-md cursor-pointer text-textColor hover:bg-textColor hover:text-textColor2' onClick={()=>props.setChartClass(dailyData)}>اليوم الحالي</div>
            </div>

        </div>
  )
}

export default ChartClassification