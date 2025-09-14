    import ReactApexChart from "react-apexcharts";
    import React, { useState, useEffect } from "react";
    import axios from "axios";
    import {server} from "../../main"
    import { useLoading } from "../../contexts/LoadingContext";

    export const Countries = () => {
        const [chartData, setChartData] = useState({
            xaxisCategories: [],
            seriesData: [],
        });

        const { setChartLoading, setChartProgress, setChartMessage, setChartError } = useLoading();

        useEffect(() => {
            const fetchData = async () => {
                try {
                    setChartLoading("countries", true);
                    setChartMessage("countries", "Loading countries data...");
                    setChartProgress("countries", 10);

                    const response = await axios.get(`${server}/RegionInsights`);
                    setChartProgress("countries", 50);
                    setChartMessage("countries", "Processing countries analytics...");
                    
                    const sectors = response.data.sectors;
                    const xaxisCategories = sectors.map(sector => sector._id);
                    const countData = sectors.map(sector => sector.count);

                    setChartData({
                        xaxisCategories,
                        countData,
                    });

                    setChartProgress("countries", 100);
                    setChartMessage("countries", "Countries data loaded");
                    
                    setTimeout(() => {
                        setChartLoading("countries", false);
                    }, 500);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setChartError("countries", true);
                }
            };

            fetchData();
        }, []);

        return (
            <>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <h2 style={{ 
                        marginBottom: '16px', 
                        color: '#ffffff', 
                        fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem', 
                        fontWeight: '600',
                        letterSpacing: '-0.025em'
                    }}>
                        Distribution of topics in India
                    </h2>
                    <div className="container" style={{ flex: 1, padding: "0", width: '100%' }}>
                        <div className="chart" style={{ 
                            height: '100%', 
                            width: '100%',
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
                                            formatter: function (val) {
                                                return val;
                                            },
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
                                            gradientToColors: ['rgba(139, 92, 246, 0.3)'],
                                            inverseColors: false,
                                            opacityFrom: 0.6,
                                            opacityTo: 0.1,
                                        }
                                    },
                                    colors: ['#8b5cf6'],
                                }}
                                series={[
                                    {
                                        name: "Popularity",
                                        data: chartData.countData,
                                    },
                                ]}
                                type="area"
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    export default Countries;
