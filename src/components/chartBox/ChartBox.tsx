import Chart from "react-apexcharts";
import { useState} from "react";


const ChartBox = () => {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [2001, 2002, 2003, 2004, 2005]
      }
    },
    series:[
      {
        name:"series 1",
        data:[10,20,30,40,50],
      },
      {
        name:"series 2",
        data:[10,20,30,40,50],
      }
    ]
  })
  return (
    <>
     <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={state.options}
              series={state.series}
              type="bar" 
              width="500"
            />
          </div>
        </div>
      </div>
    </>
    
  )
}

export default ChartBox