import Chart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import axios from "axios";
    


export const Year = () => {
    // sector - intensity vs likelihood
    const [chartData, setChartData] = useState({
        xaxisCategories: [],
        relevanceData: [],
    });
    const [selectedYear, setSelectedYear] = useState("2016"); // Default year
    const years = ["2016", "2017", "2018"]; // List of available years

    const fetchSectorRelevanceData = async (year) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/sector/sectorrelevance?year=${year}`);
            const relevanceData = response.data.relevanceData;

            const xaxisCategories = relevanceData.map((sector) => sector._id);

            setChartData({
                xaxisCategories,
                relevanceData: relevanceData.map((sector) => sector.totalRelevance),
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchSectorRelevanceData(selectedYear);
    }, [selectedYear]);

    const options = {
        chart: {
            id: "basic-area",
        },
        xaxis: {
            categories: chartData.xaxisCategories,
        },
    };

    const series = [
        {
            name: "Relevance",
            data: chartData.relevanceData,
        },
    ];
    return (
        //comparison of relavance and intensity of sector
        <>
            <div>
            <h2 className="heading">Relevance of different sector accross the years</h2>
                <div>
                    Year: <select style={{padding:"10px",borderRadius:"5px",outline:"none",backgroundColor:"#384256",color:"white"}}
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="chart" style={{padding:"20px"}}>
                    <Chart
                        options={{
                            chart: {
                                id: "basic-bar",
                                toolbar: {
                                    show: false, // Disable the toolbar
                                },
                            },
                            dataLabels: {
                                enabled: false, // Disable data labels
                            },
                            xaxis: {
                                categories: chartData.xaxisCategories,
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
                        type="area"
                        width="400"
                        height="300"
                    />

                </div>
            </div>
        </>
    )
}

export default Year