import ChatBot from 'react-simple-chatbot-ia'
import './Chatbot.css'; // Archivo de estilos personalizados
import { ThemeProvider } from 'styled-components';
import ImageViewerChat from './ImageViewerChat';
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { getRecommendation } from "../../actions/ia";
import Recommendation from "./Recommendation"

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
  const API_URL2 = process.env.REACT_APP_URL_PROCESS + "ia/auth/";

  const { user: currentUser } = useSelector((state) => state.auth);
  const [opened, setOpened] = useState(false)
  const [recommendation, setRecommendation] = useState([])
  const [imageChat, setImageChat] = useState(null)
  const toggleFloating = ({ opened }) => {
    setOpened(opened)
  }
  useEffect(() => {
    //console.log("user: " + JSON.stringify(currentUser.id))
    getRecommendation(currentUser.id).then((recommendations) => {
      //console.log("recomendations: " + JSON.stringify(recommendations.recomendaciones))
      if (recommendations.retcode === 0) {
        setRecommendation(recommendations.recomendaciones)
      }
    })
  }, []);
  const fullImageViewerChat = (image) => {
    console.log("imagen: "+image)
    setImageChat(image)
  }
  return (
    <>
      {recommendation.length > 0 &&
        <div className="chatbot-container">
          <ThemeProvider theme={theme}>
            <ChatBot
              headerTitle="Guía Virtual del Museo"
              placeholder='Escriba su mensaje ...'
              recognitionPlaceholder='Escuchando ...'
              recognitionEnable={true}
              typeRecognition={1}
              timeRecognition={10000}
              recognitionLang='es'
              urlRecognition={API_URL2 + 'transcribe'}
              urlChatIa={API_URL2 + 'chat'}
              fullImageViewer={fullImageViewerChat}
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
                  component: (
                    <Recommendation data={recommendation[0]} />
                  ),
                  trigger: '6',
                },
                {
                  id: '4',
                  component: (
                    <Recommendation data={recommendation[1]} />
                  ),
                  trigger: '6',
                },
                {
                  id: '5',
                  component: (
                    <Recommendation data={recommendation[2]} />
                  ),
                  trigger: '6',
                },
                {
                  id: '6',
                  message: 'Estoy listo para tus preguntas!!',
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
          </ThemeProvider>
          {imageChat &&
            <ImageViewerChat data={imageChat} />
          }
        </div>}

    </>
  );
}

