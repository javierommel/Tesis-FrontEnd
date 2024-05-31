import ChatBot from 'react-simple-chatbot-ia'
import './Chatbot.css'; // Archivo de estilos personalizados
import { ThemeProvider } from 'styled-components';
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { getRecommendation } from "../../actions/ia";

const theme = {
  background: '#ffffff',
  fontFamily: 'Dejavu Sans, Arial, Verdana, sans-serif',
  headerBgColor: '#3C89CF',
  headerFontColor: '#FFFFFF',
  headerFontSize: '12px',
  botBubbleColor: '#339EFF',
  botFontColor: '#FFFFFF',
  userBubbleColor: '#F2F3F4',
  userFontColor: '#000000',
  buttonOptionColor: '#48C9B0',
}

export default function Chatbot() {
  const botAvatar = process.env.REACT_APP_BOT_AVATAR;
  const userAvatar = process.env.REACT_APP_USER_AVATAR;
  const { user: currentUser } = useSelector((state) => state.auth);
  const [opened, setOpened]=useState(false)
  const [recommendation, setRecommendation]=useState([])
  const toggleFloating=({opened})=>{
    setOpened(opened)
  }
  useEffect(() => {
    console.log("user: "+JSON.stringify(currentUser.id))
    getRecommendation(currentUser.id).then((recommendations)=>{
      console.log("recomendations: "+JSON.stringify(recommendation))
      setRecommendation(recommendations.recomendaciones)
    })
  }, []);
  
  return (
    <>
      <div className="chatbot-container">
        {recommendation.length>0&&
        <ThemeProvider theme={theme}>
          <ChatBot
            headerTitle="Guía Virtual del Museo"
            placeholder='Escriba su mensaje ...'
            recognitionPlaceholder='Escuchando ...'
            recognitionEnable={true}
            typeRecognition={1}
            timeRecognition={10000}
            recognitionLang='es'
            urlRecognition='http://localhost:5000/servicio1/transcribe'
            urlChatIa= 'http://localhost:5000/servicio1/chat'
            botAvatar={botAvatar}
            userAvatar={userAvatar}
            steps={[
              {
                id: '1',
                message: "Hola " + currentUser.name + " soy Albert, seré tu guía en esta visita. De acuerdo a tus visitas te recomendamos algunas piezas destacadas que podrían interesarte:",
                trigger: '2',
              },
              {
                id: '2',
                options: [
                  { value: 1, label: recommendation[0][0], trigger: '3' },
                  { value: 2, label: recommendation[1][0], trigger: '4' },
                  { value: 3, label: recommendation[2][0], trigger: '5' },
                  { value: 4, label: 'Preguntar otra cosa', trigger: '6' },
                ],
              },
              {
                id: '3',
                message: recommendation[0][1],
                messageia: false,
                trigger: '6',
              },
              {
                id: '4',
                message: recommendation[1][1],
                messageia: false,
                trigger: '6',
              },
              {
                id: '5',
                message: recommendation[2][1],
                messageia: false,
                trigger: '6',
              }, 
              {
                id: '6',
                message: 'Estoy listo para tus preguntas',
                messageia: false,
                trigger: '7',
              },
              {
                id: '7',
                user: true,
                trigger: '8',
              },
              {
                id: '8',
                message: 'previusValue',
                messageia: true,
                trigger: '7',
              },
            ]}
            floating={true}
            opened={opened}
            toggleFloating={toggleFloating}
          />
        </ThemeProvider>}
      </div>

    </>
  );
}

