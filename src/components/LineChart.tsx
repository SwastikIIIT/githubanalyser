import { Line } from 'react-chartjs-2';
import { FC } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  //registering the components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  interface LineChartProps {
    xcoordinates: string[];
    ycoordinates: number[];
  }

  const options={
    responsive:true,
    plugins:{
         legend:{
             position: 'top' as const
         },
         title:{
             display:true,
             text:"Recent Commit history"
         }
    }
 };

const LineChart:FC<LineChartProps> =({xcoordinates,ycoordinates}) => {
   
    const data={
      labels:xcoordinates,
      datasets:[
        {
          label:"Commits",
          data:ycoordinates,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ]
    }

    return (
    <Line options={options} data={data}/>
  )
}

export default LineChart;