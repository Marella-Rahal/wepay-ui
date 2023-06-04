import React from 'react';

import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);
Chart.defaults.color = '#3fb37f';
import {Bar} from 'react-chartjs-2';

const options = {
  maintainAspectRatio: false,  
  responsive: true,
  //!plugin *********
  plugins: {
    //to use a legend
    legend:{
      display:false,
      position:"top",
      align:"end",
      //to change the shape of the rectangle
      labels:{
        boxWidth:7,
        usePointStyle:true,
        pointStyle:"circle",
      },

    },
    //to put a title
    title:{
      display:true,
      text:"إجمالي المصاريف",
      position:"bottom",
      color:"#3fb37f",
      font:{
        size:20
      }
    }

  },

}

const BarChart = ({data}) => {
  return (
    <div className='w-full h-full'>
      <Bar data={data} options={options}/>
    </div>
  )
}

export default BarChart