const labelStyle = {
  width: '70px',
  //background:'#6c757d',
  background:'#1d8cf8', 
  fontSize: '0.7500000025rem',
  color: '#ffffff', 
  //color: '#1d8cf8',
  //border: '1px solid #2b3553',
  border: '1px solid #ffffff',
  boxshadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px', // Ajusta según sea necesario
  overflow: 'hidden', // Evita que el texto se salga del contenedor
  textOverflow: 'ellipsis', // Agrega puntos suspensivos (...) al final del texto cortado
  whiteSpace: 'nowrap', // Evita el desbordamiento del texto hacia una nueva línea
  borderRadius:'5px 0px 0px 5px',
  borderRight: 'none'
};
const titleStyle = {
  //: '0.7500000025rem', 
  color: '#1d8cf8',
  border: '1px solid #1d8cf8',
  boxshadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  borderRadius:'5px',
  transition: 'box-shadow 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px', // Ajusta según sea necesario
  overflow: 'hidden', // Evita que el texto se salga del contenedor
  textOverflow: 'ellipsis', // Agrega puntos suspensivos (...) al final del texto cortado
  whiteSpace: 'nowrap', // Evita el desbordamiento del texto hacia una nueva línea
};
export { titleStyle, labelStyle };