
import ReactApexChart from "react-apexcharts";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {server} from "../../main"
import { useLoading } from "../../contexts/LoadingContext";

const Relevance = () => {
    //comparing relevance of sector
    const [chartData, setChartData] = useState({
        xaxisCategories: [],
        relevanceData: [],
      });
    
    const { setChartLoading, setChartProgress, setChartMessage, setChartError } = useLoading();
    
      useEffect(() => {           
            // Extracting grouped data for chart
            const fetchData = async () => {
                try {
                    setChartLoading("relevance", true);
                    setChartMessage("relevance", "Loading relevance data...");
                    setChartProgress("relevance", 10);

                    const response = await axios.get(`${server}/sectorvsrelevance`);
                    setChartProgress("relevance", 50);
                    setChartMessage("relevance", "Processing relevance analytics...");
                    
                    const sectors = response.data.sectors;
                    const xaxisCategories = sectors.map(sector => sector._id);
                    const relevanceData = sectors.map(sector => sector.totalrelevance);
                    
                    setChartData({
                        xaxisCategories,
                        relevanceData,
                    });

                    setChartProgress("relevance", 100);
                    setChartMessage("relevance", "Relevance data loaded");
                    
                    setTimeout(() => {
                        setChartLoading("relevance", false);
                    }, 500);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setChartError("relevance", true);
                }
            };

            fetchData();
      }, []);
  return (
    //comparison of relavance and intensity of sector
    <>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ 
            marginBottom: '12px', 
            color: '#ffffff', 
            fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem', 
            fontWeight: '600',
            letterSpacing: '-0.025em',
            height: '28px'
        }}>
            Relevance of different sectors
        </h2>
        <div style={{ 
            marginBottom: '12px', 
            height: '32px',
            display: 'flex',
            alignItems: 'center'
        }}>
            {/* Empty space to match Year component's dropdown height */}
        </div>
        <div className="container" style={{ flex: 1, padding: "0" }}>
            <div className="chart" style={{ 
                height: '100%', 
                minHeight: '250px',
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
                      fontSize: '11px'
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
            grid: {
                borderColor: 'rgba(255, 255, 255, 0.1)',
                strokeDashArray: 3,
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#f59e0b'],
            }}
            series={[
              {
                name: "Relevance",
                data: chartData.relevanceData,
              },
            ]}
            type="line"
            width="100%"
            height="100%"
          />
            </div>
        </div>
    </div>
    </>
  )
}

export default Relevance