import faker from 'faker';
const labels = ['Risco', 'Virgen la Merced', 'Arcange San Miguel', 'Corazón de Jesús', 'Virgen Niña', 'Bordado', 'Juguetes'];

export const museumChart = {
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          color: 'grey',
          borderColor: 'white',
          tickColor: 'grey',
        },
        ticks: {
          color: 'white',
        }
      },
      x: {
        grid: {
          color: 'grey',
          borderColor: 'white',
          tickColor: 'grey'
        },
        ticks: {
          color: 'white',
        }
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
        },
      },
      title: {
        display: true,
        text: 'Piezas más Visitadas',
        font: {
          weight:'lighter',
          size: 27,
          family: "'Poppins', sans-serif",
        },
        color:'#ffffff'
      },
    },
  },


  data: {
    labels: ['Risco', 'Virgen la Merced', 'Arcange San Miguel', 'Corazón de Jesús', 'Virgen Niña', 'Bordado', 'Juguetes'],
    datasets: [
      {
        label: 'Visitas',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor:'rgba(53, 162, 235, 1)',
        borderWidth:1
      },
      {
        label: 'Recomendaciones',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor:'rgba(255, 99, 132, 1)',
        borderWidth:1
      },
    ],
  }
};
