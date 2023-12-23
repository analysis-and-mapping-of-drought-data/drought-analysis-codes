import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2';
import 'chart.js';
import 'chart.js/auto';

function BarajDetay() {
  const { baraj_adi } = useParams();
  const [barajDetay, setBarajDetay] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/baraj/year/${baraj_adi}`)
      .then((response) => {
        setBarajDetay(response.data);
      })
      .catch((error) => {
        console.error('API hatası:', error);
      });
  }, [baraj_adi]);

  const formatData = (data) => {
    const labels = Object.keys(data[0]).filter((key) => key.startsWith('yil_'));
    const values = labels.map((label) => data[0][label]);

    return {
      labels: labels.map((label) => label.substring(4)),
      values: values,
    };
  };

  /* const getChartOptions = () => {
    return {
      scales: {
        x: { beginAtZero: true },
        y: { beginAtZero: true },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  }; */

  const getChartOptions = () => ({
    scales: { x: { beginAtZero: true }, y: { beginAtZero: true } },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    width: 300,
    height: 150,
  });

  const getChartData = (label, data, backgroundColor, borderColor) => {
    return {
      labels: label,
      datasets: [
        {
          label: 'Chart Data',
          data: data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ],
    };
  };

  const getBarChartData = () => {
    if (barajDetay) {
      const formattedData = formatData(barajDetay);
      const barChartData = getChartData(
        formattedData.labels,
        formattedData.values,
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 99, 132, 1)'
      );

      return { ...barChartData, options: getChartOptions() };
    } else {
      return null;
    }
  };

  const getLineChartData = () => {
    if (barajDetay) {
      const formattedData = formatData(barajDetay);
      const lineChartData = getChartData(
        formattedData.labels,
        formattedData.values,
        'rgba(54, 162, 235, 0.5)',
        'rgba(54, 162, 235, 1)'
      );

      return { ...lineChartData, options: getChartOptions() };
    } else {
      return null;
    }
  };

  const getPieChartData = () => {
    if (barajDetay) {
      const formattedData = formatData(barajDetay);
      const pieChartData = getChartData(
        formattedData.labels,
        formattedData.values,
        [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ]
      );

      return { ...pieChartData, options: getChartOptions() };
    } else {
      return null;
    }
  };

  const getDoughnutChartData = () => {
    if (barajDetay) {
      const formattedData = formatData(barajDetay);
      const doughnutChartData = getChartData(
        formattedData.labels,
        formattedData.values,
        [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ]
      );

      return { ...doughnutChartData, options: getChartOptions() };
    } else {
      return null;
    }
  };

  const getRadarChartData = () => {
    if (barajDetay) {
      const formattedData = formatData(barajDetay);
      const radarChartData = getChartData(
        formattedData.labels,
        formattedData.values,
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 99, 132, 1)'
      );

      return { ...radarChartData, options: getChartOptions() };
    } else {
      return null;
    }
  };

  return (
    <div>
      {barajDetay && (
        <div>
          {/* 1. Bar Chart */}
          <h2>Bar Chart</h2>
          <Bar data={getBarChartData()}/>

          {/* 2. Line Chart */}
          <h2>Line Chart</h2>
          <Line data={getLineChartData()}/>

          {/* 3. Pie Chart */}
          <h2>Pie Chart</h2>
          <Pie data={getPieChartData()}/>

          {/* 4. Doughnut Chart */}
          <h2>Doughnut Chart</h2>
          <Doughnut data={getDoughnutChartData()}/>

          {/* 5. Radar Chart */}
          <h2>Radar Chart</h2>
          <Radar data={getRadarChartData()}/>
        </div>
      )}
    </div>
  );
}

export default BarajDetay;