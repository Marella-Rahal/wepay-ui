import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
ChartJS.defaults.color = '#3fb37f';



const dayes=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]
const monthes=["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول"];
const years=[];


const Chart = () => {
    const [data,setData]=useState({
        labels:monthes,
        datasets: [
          {
            data: [5,6,10,2,3,4,100],
            backgroundColor:'#3fb37f',
          },
        ],
    });
    const [options,setOptions]=useState({
        responsive: true,
        plugins: {
          legend: {
            display:false,
          },
          title: {
            display: false,
          },
        },
    });

  return (
    <Bar data={data} options={options}/>
  )

}

export default Chart
