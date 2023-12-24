import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import axios from 'axios';

const SulamaChart = ({ data }) => {

  const [sulamaData, setSulamaData] = useState([]);

  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const pieChartRef = useRef(null);

  const handleSulama = async () => {
    const response = await axios.get(`http://localhost:3001/sulama/plaka/${data}`);
    setSulamaData(response.data);
  };

  useEffect(() => {
    handleSulama();
  }, [data]); // Add 'data' as a dependency to fetch new data when it changes

  useEffect(() => {
    const barCtx = barChartRef.current.getContext('2d');
    const lineCtx = lineChartRef.current.getContext('2d');
    const doughnutCtx = doughnutChartRef.current.getContext('2d');
    const pieCtx = pieChartRef.current.getContext('2d');

    if (!sulamaData) {
      return; // Data yoksa işlemi sonlandır
    }

    const barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['kuyu', 'kaynak', 'akarsu', 'gol', 'golet', 'baraj', 'diger'],
        datasets: [
          {
            label: 'Baraj Verisi',
            data: Object.values(sulamaData),
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
        labels: ['kuyu', 'kaynak', 'akarsu', 'gol', 'golet', 'baraj', 'diger'],
        datasets: [
          {
            label: 'Line Chart Data',
            data: Object.values(sulamaData),
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
        labels: ['kuyu', 'kaynak', 'akarsu', 'gol', 'golet', 'baraj', 'diger'],
        datasets: [
          {
            data: Object.values(sulamaData),
            backgroundColor: ['rgba(255,99,132,0.7)', 'rgba(54,162,235,0.7)', 'rgba(255,206,86,0.7)'],
          },
        ],
      },
    });

    const pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['kuyu', 'kaynak', 'akarsu', 'gol', 'golet', 'baraj', 'diger'],
        datasets: [
          {
            data: Object.values(sulamaData),
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
  }, [sulamaData]);

  return (
    <div>
      <canvas ref={barChartRef} />
      <canvas ref={lineChartRef} />
      <canvas ref={doughnutChartRef} />
      <canvas ref={pieChartRef} />
    </div>
  );
};

export default SulamaChart;
