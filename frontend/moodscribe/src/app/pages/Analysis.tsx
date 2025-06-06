import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { RootState, useAppSelector } from '../../redux/store';

const Analysis = () => {
  const { journals } = useAppSelector((state: RootState) => state.journals);

  const data = {
    labels: journals.journals.map((entry) =>
      new Date(entry.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Mood Score',
        data: journals.journals.map((entry) => entry.mood.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 8,

        ticks: {
          color: '#C5C5C5',
          padding: 10,
        },
      },
      x: {
        ticks: {
          color: '#C5C5C5',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          // padding: 20, // Adjust the padding around the legend label
          color: '#C5C5C5', // Change color of legend labels
        },
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (context: any) {
            const moodEntry = journals.journals[context.dataIndex];
            return `${moodEntry.mood.name}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className='container mx-auto max-w-4xl my-14 p-4'>
      <h2 className='text-white text-2xl text-center mb-11'>Mood Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Analysis;
