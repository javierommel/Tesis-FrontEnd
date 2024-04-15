import faker from 'faker';

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const userChart = {
  data: {
    labels,
    datasets: [
      {
        label: 'Nacionales',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Extranjeros',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  },
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
        text: 'Número de Visitas',
        font: {
          weight:'lighter',
          size: 27,
          family: "'Poppins', sans-serif",
        },
        color:'#ffffff'
      },
    },
  }
};
export const dataUserVisit = [
  { Usuario: "Bill Clinton", NroVisitas: 2, Pais:"Ecuador", Edad:"28", },
  { Usuario: "GeorgeW Bush", NroVisitas: 3, Pais:"Ecuador", Edad:"38", },
  { Usuario: "Barack Obama", NroVisitas: 4, Pais:"Ecuador", Edad:"12", },
  { Usuario: "Donald Trump", NroVisitas: 4, Pais:"Ecuador", Edad:"48", },
  { Usuario: "Joseph Biden", NroVisitas: 6, Pais:"Ecuador", Edad:"51", }
];

export const dataUserTime = [
  { Usuario: "Bill Clinton", "Tiempo(min)": 40, Pais:"Ecuador", Edad:"52", Fecha:"04/04/2024", Hora:"14:20:30",},
  { Usuario: "GeorgeW Bush", "Tiempo(min)": 43, Pais:"Ecuador", Edad:"43", Fecha:"04/04/2024", Hora:"14:20:30",},
  { Usuario: "Barack Obama", "Tiempo(min)": 34, Pais:"Ecuador", Edad:"34", Fecha:"04/04/2024", Hora:"14:20:30",},
  { Usuario: "Donald Trump", "Tiempo(min)": 24, Pais:"Ecuador", Edad:"22", Fecha:"04/04/2024", Hora:"14:20:30",},
  { Usuario: "Joseph Biden", "Tiempo(min)": 36, Pais:"Ecuador", Edad:"21", Fecha:"04/04/2024", Hora:"14:20:30",}
];