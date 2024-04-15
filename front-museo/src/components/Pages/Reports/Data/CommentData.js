const commentChart = {
  data: {
    labels: ['Cinco', 'Cuatro', 'Tres', 'Dos', 'Uno',],
    datasets: [
      {
        label: '# de Comentarios',
        data: [12, 19, 3, 5, 2],
        color: 'rgba(255, 255, 255, 1)', 
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
  },
  options : {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
        },
      },
      title: {
        display: true,
        text: 'Calificación',
        font: {
          weight:'lighter',
          size: 27,
          family: "'Poppins', sans-serif",
        },
        color:'#ffffff',
      },
    },
  }
};

export default commentChart;
