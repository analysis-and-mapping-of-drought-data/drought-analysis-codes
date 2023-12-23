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
    const formattedData = {
      labels: [],
      datasets: [
        {
          label: 'Bar Chart Data',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    for (const key in data) {
      if (key.startsWith('yil_')) {
        formattedData.labels.push(parseInt(key.substring(4), 10));
        formattedData.datasets[0].data.push(data[key]);
      }
    }

    return formattedData;
  };

  const getChartOptions = () => {
    return {
      scales: {
        x: { beginAtZero: true },
        y: { beginAtZero: true },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  };

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
      const { labels, datasets } = formattedData;

      const barChartData = getChartData(
        labels,
        datasets[0].data,
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
      const { labels, datasets } = formattedData;

      const lineChartData = getChartData(
        labels,
        datasets[0].data,
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
      const { labels, datasets } = formattedData;

      const pieChartData = getChartData(
        labels,
        datasets[0].data,
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
      const { labels, datasets } = formattedData;

      const doughnutChartData = getChartData(
        labels,
        datasets[0].data,
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
      const { labels, datasets } = formattedData;

      const radarChartData = getChartData(
        labels,
        datasets[0].data,
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
          <Bar data={getBarChartData()} />

          {/* 2. Line Chart */}
          <h2>Line Chart</h2>
          <Line data={getLineChartData()} />

          {/* 3. Pie Chart */}
          <h2>Pie Chart</h2>
          <Pie data={getPieChartData()} />

          {/* 4. Doughnut Chart */}
          <h2>Doughnut Chart</h2>
          <Doughnut data={getDoughnutChartData()} />

          {/* 5. Radar Chart */}
          <h2>Radar Chart</h2>
          <Radar data={getRadarChartData()} />
        </div>
      )}
    </div>
  );
}

export default BarajDetay;
