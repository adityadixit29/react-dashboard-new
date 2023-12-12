import ReactApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const SectorGraph = () => {
  // sector - intensity vs likelihood
  const [chartData, setChartData] = useState({
    xaxisCategories: [],
    relevanceData: [],
    likelihoodData: [],
  });

  useEffect(() => {
    // Extracting grouped data for chart
    axios.get("http://localhost:3000/api/v1/sector/sectorvsintenvslike")
      .then(response => {
        const sectors = response.data.sectors;
        //map function does xaxisCategories = ["Aerospace & defence", "Support services", /* ... */ ];
        const xaxisCategories = sectors.map(sector => sector._id); // Use _id as x-axis categories
        const intensityData = sectors.map(sector => sector.totalIntensity);
        const likelihoodData = sectors.map(sector => sector.totalLikelihood);

        setChartData({
          xaxisCategories,
          intensityData,
          likelihoodData,
        });
      })

      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    //comparison of relavance and intensity of sector
    <>
      <h2>Sector - Visualizing Intensity and Relevance of various sectors</h2>
      <div className="container" style={{ padding: "20px" }}>
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
              legend: {
                labels: {
                  colors: "white", // Change legend text color to black
                },
              },
            }
          }
            series={[
              {
                name: "Intensity",
                data: chartData.intensityData,
              },
              {
                name: "Likelihood",
                data: chartData.likelihoodData,
              },
            ]}
            type="bar"
            width="900"
            height="400"
          />
        </div>
      </div>
    </>
  )
}

export default SectorGraph