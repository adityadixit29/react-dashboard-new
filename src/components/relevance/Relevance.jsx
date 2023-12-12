
import ReactApexChart from "react-apexcharts";
import React, {useState, useEffect} from "react";
import axios from "axios";


const Relevance = () => {
    //comparing relevance of sector
    const [chartData, setChartData] = useState({
        xaxisCategories: [],
        relevanceData: [],
      });
    
      useEffect(() => {           
            // Extracting grouped data for chart
            axios.get("http://localhost:3000/api/v1/sector/sectorvsrelevance")
            .then(response => {
              const sectors = response.data.sectors;
      
                const xaxisCategories = sectors.map(sector => sector._id); // Use _id as x-axis categories
                const relevanceData = sectors.map(sector => sector.totalrelevance);
              
      
              setChartData({
                xaxisCategories,
                relevanceData,
              });
            })
          
          .catch(error => {
            console.error("Error fetching data:", error);
          });
      }, []);
  return (
    //comparison of relavance and intensity of sector
    <>
    <h2>Relevance - Relevance of different sectors</h2>
    <div className="container" style={{padding:"30px"}}>
        <div className="chart">
          <ReactApexChart
        options={{
          chart: {
            id: "basic-bar",
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: chartData.xaxisCategories,
            labels: {
              style: {
                  colors: "white", // Change x-axis text color to black
              },
          },
          },
          yaxis: {
            labels: {
                style: {
                    colors: "white", // Change y-axis text color to black
                },
            },
        },
          tooltip: {
            theme: "dark", // Change tooltip box color to a light theme
            x: {
                show: true,
            },
            y: {
                show: true,
            },
           
        },
        }}
        series={[
          {
            name: "Relevance",
            data: chartData.relevanceData,
          },
        ]}
        type="line"
        width="400"
        height="300"
      />
        </div>
    </div>
    </>
  )
}

export default Relevance