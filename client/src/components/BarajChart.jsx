import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const BarajChart = ({ data }) => {
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    const barCtx = barChartRef.current.getContext('2d');
    const lineCtx = lineChartRef.current.getContext('2d');
    const doughnutCtx = doughnutChartRef.current.getContext('2d');
    const pieCtx = pieChartRef.current.getContext('2d');

    if (!data) {
      return; // Data yoksa işlemi sonlandır
    }

    const barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Baraj Verisi',
            data: Object.values(data),
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      },
    });

    const lineChart = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Line Chart Data',
            data: Object.values(data),
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
    });

    const doughnutChart = new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: ['rgba(255,99,132,0.7)', 'rgba(54,162,235,0.7)', 'rgba(255,206,86,0.7)'],
          },
        ],
      },
    });

    const pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: ['rgba(255,99,132,0.7)', 'rgba(54,162,235,0.7)', 'rgba(255,206,86,0.7)'],
          },
        ],
      },
    });

    return () => {
      barChart.destroy();
      lineChart.destroy();
      doughnutChart.destroy();
      pieChart.destroy();
    };
  }, [data]);

  return (
    <div>
      <canvas ref={barChartRef} />
      <canvas ref={lineChartRef} />
      <canvas ref={doughnutChartRef} />
      <canvas ref={pieChartRef} />
    </div>
  );
};

export default BarajChart;
