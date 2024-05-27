import ChatBot from 'react-simple-chatbot-ia'
import './Chatbot.css'; // Archivo de estilos personalizados
import { ThemeProvider } from 'styled-components';
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';

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
    /*getRecommendation("").then((recommendations)=>{
      setRecommendation(recommendations)
    })*/
  }, []);
  
  return (
    <>
      <div className="chatbot-container">
        <ThemeProvider theme={theme}>
          <ChatBot
            headerTitle="Guía Virtual del Museo"
            placeholder='Escriba su mensaje ...'
            recognitionPlaceholder='Escuchando ...'
            recognitionEnable={true}
            typeRecognition={2}
            timeRecognition={10000}
            recognitionLang='es'
            urlRecognition='http://localhost:5000/servicio2/transcribe'
            botAvatar={botAvatar}
            userAvatar={userAvatar}
            steps={[
              {
                id: '1',
                message: "Hola " + currentUser.name + " soy Albert, seré tu guía en esta visita.",
                trigger: '2',
              },
              {
                id: '2',
                message: 'Para comenzar aquí tienes algunas piezas destacadas que podrían interesarte:',
                messageia: false,
                trigger: '3',
              },
              {
                id: '3',
                options: [
                  { value: 1, label: 'Arcángel San miguel', trigger: '4' },
                  { value: 2, label: 'Virgen de la Merced', trigger: '5' },
                  { value: 3, label: 'El Risco', trigger: '6' },
                  { value: 4, label: 'Preguntar otra cosa', trigger: '7' },
                ],
              },
              {
                id: '4',
                message: 'De acuerdo a tus búsquedas y visitas hemos preparado estas piezas de arte que te podrían gustar.',
                messageia: false,
                trigger: '7',
              },
              {
                id: '5',
                message: 'De acuerdo a tus búsquedas y visitas hemos preparado estas piezas de arte que te podrían gustar.',
                messageia: false,
                trigger: '7',
              },
              {
                id: '6',
                message: 'De acuerdo a tus búsquedas y visitas hemos preparado estas piezas de arte que te podrían gustar.',
                messageia: false,
                trigger: '7',
              },
              {
                id: '7',
                message: '¿Que te interesaría saber sobre el museo?',
                messageia: false,
                trigger: '8',
              },
              {
                id: '8',
                user: true,
                trigger: '9',
              },
              {
                id: '9',
                message: 'previusValue',
                messageia: true,
                trigger: '8',
              },
            ]}
            floating={true}
            opened={opened}
            toggleFloating={toggleFloating}
          />
        </ThemeProvider>
      </div>

    </>
  );
}

