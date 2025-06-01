import React from 'react';
import { AnalyticsSummary as AnalyticsSummaryType } from '../../types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsSummaryProps {
  data: AnalyticsSummaryType;
  isLoading: boolean;
}

const AnalyticsSummary: React.FC<AnalyticsSummaryProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center h-64">
        <div className="animate-pulse text-blue-600">Loading analytics...</div>
      </div>
    );
  }

  if (!data || !data.totalClicks) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600 text-center">No analytics data available yet.</p>
      </div>
    );
  }

  // Prepare data for the clicks by day chart
  const clicksByDayData = {
    labels: Object.keys(data.clicksByDay),
    datasets: [
      {
        label: 'Clicks',
        data: Object.values(data.clicksByDay),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for browser chart
  const browserData = {
    labels: Object.keys(data.browsers),
    datasets: [
      {
        label: 'Browsers',
        data: Object.values(data.browsers),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for devices chart
  const deviceData = {
    labels: Object.keys(data.devices),
    datasets: [
      {
        label: 'Devices',
        data: Object.values(data.devices),
        backgroundColor: [
          'rgba(255, 159, 64, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)',
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for OS chart
  const osData = {
    labels: Object.keys(data.os),
    datasets: [
      {
        label: 'Operating Systems',
        data: Object.values(data.os),
        backgroundColor: [
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Clicks</h3>
          <p className="text-4xl font-bold text-blue-600">{data.totalClicks}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Clicks Over Time</h3>
        <div className="h-64">
          <Bar 
            data={clicksByDayData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Daily Clicks',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Browsers</h3>
          <Doughnut 
            data={browserData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Devices</h3>
          <Doughnut 
            data={deviceData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Operating Systems</h3>
          <Doughnut 
            data={osData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummary;
