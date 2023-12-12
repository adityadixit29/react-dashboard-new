    import ReactApexChart from "react-apexcharts";
    import React, { useState, useEffect } from "react";
    import axios from "axios";
    import {server} from "../../main"
    export const Countries = () => {
        const [chartData, setChartData] = useState({
            xaxisCategories: [],
            seriesData: [],
        });

        useEffect(() => {
            axios.get(`${server}/RegionInsights`)
                .then(response => {
                    const sectors = response.data.sectors;
                    const xaxisCategories = sectors.map(sector => sector._id); // Use _id as x-axis categories
                    const countData = sectors.map(sector => sector.count);

                    setChartData({
                        xaxisCategories,
                        countData,
                    });
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }, []);

        return (
            <>
                <div className="container" style={{ padding: "20px" }}>
                <h2>Distribution of different topics in India</h2>
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
                                        formatter: function (val) {
                                            return val; // Keep y-axis text black
                                        },
                                    },
                                },
                            }}
                            series={[
                                {
                                    name: "Popularity",
                                    data: chartData.countData,
                                },
                            ]}
                            type="area"
                            width="900"
                            height="400"
                        />
                    </div>
                </div>
            </>
        );
    }

    export default Countries;
