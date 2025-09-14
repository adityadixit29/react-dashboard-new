import ReactApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {server} from "../../main"
import { useLoading } from "../../contexts/LoadingContext";

export const SectorGraph = () => {
  // sector - intensity vs likelihood
  const [chartData, setChartData] = useState({
    xaxisCategories: [],
    relevanceData: [],
    likelihoodData: [],
  });

  const { setChartLoading, setChartProgress, setChartMessage, setChartError } = useLoading();

  useEffect(() => {
    // Extracting grouped data for chart
    const fetchData = async () => {
      try {
        setChartLoading("sector", true);
        setChartMessage("sector", "Loading sector data...");
        setChartProgress("sector", 10);

        const response = await axios.get(`${server}/sectorvsintenvslike`);
        setChartProgress("sector", 50);
        setChartMessage("sector", "Processing sector analytics...");
        
        const sectors = response.data.sectors;
        const xaxisCategories = sectors.map(sector => sector._id);
        const intensityData = sectors.map(sector => sector.totalIntensity);
        const likelihoodData = sectors.map(sector => sector.totalLikelihood);

        setChartData({
          xaxisCategories,
          intensityData,
          likelihoodData,
        });

        setChartProgress("sector", 100);
        setChartMessage("sector", "Sector data loaded");
        
        setTimeout(() => {
          setChartLoading("sector", false);
        }, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
        setChartError("sector", true);
      }
    };

    fetchData();
  }, []);
  return (
    //comparison of relavance and intensity of sector
    <>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ 
            marginBottom: '16px', 
            color: '#ffffff', 
            fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem', 
            fontWeight: '600',
            letterSpacing: '-0.025em'
        }}>
            Sector - Intensity and Likelihood
        </h2>
        <div className="container" style={{ flex: 1, padding: "0" }}>
          <div className="chart" style={{ 
              height: '100%', 
              minHeight: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
          }}>
            <ReactApexChart
              options={{
                chart: {
                  id: "basic-bar",
                  toolbar: {
                    show: false,
                  },
                  background: 'transparent',
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: chartData.xaxisCategories,
                  labels: {
                    style: {
                      colors: "rgba(255, 255, 255, 0.8)",
                      fontSize: '10px'
                    },
                  },
                },
                yaxis: {
                  labels: {
                    style: {
                      colors: "rgba(255, 255, 255, 0.8)",
                      fontSize: '11px'
                    },
                  },
                },
                tooltip: {
                  theme: "dark",
                  x: {
                    show: true,
                  },
                  y: {
                    show: true,
                  },
                },
                legend: {
                  labels: {
                    colors: "rgba(255, 255, 255, 0.8)",
                    fontSize: '12px'
                  },
                },
                grid: {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  strokeDashArray: 3,
                },
                colors: ['#3b82f6', '#8b5cf6'],
              }}
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
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SectorGraph