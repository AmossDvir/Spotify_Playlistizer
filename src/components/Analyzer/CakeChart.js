import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const CakeChart = ({ data }) => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  const options = {
    labels: labels,
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: "right",
      offsetY: 0,
      height: 230,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "55%",
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      let labelsSlice = data.map((genre) => genre.genre).slice(0, 10);
      let valuesSlice = data
        .map((genre) => Math.round(genre.frequency * 100 * 100) / 100 )
        .slice(0, 10);
      setLabels(labelsSlice);
      setValues(valuesSlice);
    }
  }, [data]);

  return (
    <div>
      {values.length > 0 && labels.length > 0 && (
        <ReactApexChart
          type="donut"
          options={options}
          width={480}
          series={values}
        ></ReactApexChart>
      )}
    </div>
  );
};

export default CakeChart;
