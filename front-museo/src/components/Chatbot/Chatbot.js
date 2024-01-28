import ChatBot from 'react-simple-chatbot-ia'
import './Chatbot.css'; // Archivo de estilos personalizados
import { ThemeProvider } from 'styled-components';
import { useSelector } from "react-redux";

const theme =  {
  background: '#F9F9F9',
  fontFamily: 'Roboto, Arial, sans-serif',
  fontSize: '10px',
  headerBgColor: '#8F9DAA',
  headerFontColor: '#FFFFFF',
  headerFontSize: '12px',
  botBubbleColor: '#6B9FCF',
  botFontColor: '#FFFFFF',
  userBubbleColor: '#D9DEE3',
  userFontColor: '#333333',
}

export default function Chatbot() {
  const botAvatar = process.env.REACT_APP_BOT_AVATAR;
  const userAvatar = process.env.REACT_APP_USER_AVATAR;
  const { user: currentUser  } = useSelector((state) => state.auth);
  return (
    <>
    <div className="chatbot-container">
    <ThemeProvider theme={theme}>
      <ChatBot
      headerTitle="Ayuda en línea"
      recognitionEnable={true}
      typeRecognition={2}
      timeRecognition={10000}
      recognitionLang='es'
      urlRecognition= 'http://localhost:5000/servicio2/transcribe'
      botAvatar={botAvatar}
      userAvatar={userAvatar}
      steps={[
        {
          id: '1',
          message: "Hola "+ currentUser.name +" soy Albert, en que te puedo ayudar?",
          trigger: '2',
        },
        {
          id: '2',
          user: true,
          trigger: '3',
        },
        {
          id: '3',
          message: 'previusValue',
          messageia: true,
          trigger: '2',
        },
      ]}
        
      />
      </ThemeProvider>
    </div>
    
   </>
  );
}

