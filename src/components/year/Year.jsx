import ReactApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {server} from "../../main"    
import { useLoading } from "../../contexts/LoadingContext";

export const Year = () => {
    // sector - intensity vs likelihood
    const [chartData, setChartData] = useState({
        xaxisCategories: [],
        relevanceData: [],
    });
    const [selectedYear, setSelectedYear] = useState("2016"); // Default year
    const years = ["2016", "2017", "2018"]; // List of available years
    const { setChartLoading, setChartProgress, setChartMessage, setChartError } = useLoading();

    const fetchSectorRelevanceData = async (year) => {
        try {
            setChartLoading("year", true);
            setChartMessage("year", "Loading year data...");
            setChartProgress("year", 10);

            const response = await axios.get(`${server}/sectorrelevance?year=${year}`);
            setChartProgress("year", 50);
            setChartMessage("year", "Processing year analytics...");
            
            const relevanceData = response.data.relevanceData;
            const xaxisCategories = relevanceData.map((sector) => sector._id);

            setChartData({
                xaxisCategories,
                relevanceData: relevanceData.map((sector) => sector.totalRelevance),
            });

            setChartProgress("year", 100);
            setChartMessage("year", "Year data loaded");
            
            // Mark as completed after a short delay
            setTimeout(() => {
                setChartLoading("year", false);
            }, 500);
        } catch (error) {
            console.error("Error fetching data:", error);
            setChartError("year", true);
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
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h2 className="heading" style={{ 
                    marginBottom: '12px', 
                    color: '#ffffff', 
                    fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem', 
                    fontWeight: '600',
                    letterSpacing: '-0.025em',
                    height: '28px'
                }}>
                    Relevance of different sector across the years
                </h2>
                <div style={{ 
                    marginBottom: '12px', 
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <span style={{ 
                        color: 'rgba(255, 255, 255, 0.8)', 
                        fontSize: '13px', 
                        marginRight: '8px' 
                    }}>
                        Year: 
                    </span>
                    <select style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        outline: "none",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        color: "white",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        fontSize: '13px',
                        fontWeight: '500'
                    }}
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
                <div className="chart" style={{ 
                    flex: 1, 
                    padding: "0", 
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
                            fill: {
                                type: 'gradient',
                                gradient: {
                                    shade: 'dark',
                                    type: 'vertical',
                                    shadeIntensity: 0.5,
                                    gradientToColors: ['rgba(16, 185, 129, 0.3)'],
                                    inverseColors: false,
                                    opacityFrom: 0.6,
                                    opacityTo: 0.1,
                                }
                            },
                            colors: ['#10b981'],
                        }}
                        series={[
                            {
                                name: "Relevance",
                                data: chartData.relevanceData,
                            },
                        ]}
                        type="area"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        </>
    )
}

export default Year