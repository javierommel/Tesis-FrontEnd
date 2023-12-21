import ChatBot from 'react-simple-chatbot-ia'
import './Chatbot.css'; // Archivo de estilos personalizados
import { ThemeProvider } from 'styled-components';

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

function chatbot() {
  const botAvatar = process.env.REACT_APP_BOT_AVATAR;
  const userAvatar = process.env.REACT_APP_USER_AVATAR;
 
  return (
    <>
    <div className="chatbot-container">
    <ThemeProvider theme={theme}>
      <ChatBot
      headerTitle="Ayuda en línea"
      recognitionEnable={true}
      typeRecognition={1}
      timeRecognition={10000}
      recognitionLang='es'
      botAvatar={botAvatar}
      userAvatar={userAvatar}
      steps={[
        {
          id: '1',
          message: 'Hola soy Albert, dime algo',
          trigger: '2',
        },
        {
          id: '2',
          user: true,
          trigger: '3',
        },
        {
          id: '3',
          message: 'Hola {previousValue}, gusto en conocerte!',
          trigger: '1',
        },
        {
          id: '4',
          message: 'En que puedo ayudarte?',
          trigger: '5',
        },
        {
          id: '5',
          user: true,
          trigger: '6',
        },
        {
          id: '6',
          message: 'Gracias por visitarnos!',
          end: true,
        },
      ]}
        
      />
      </ThemeProvider>
    </div>
    
   </>
  );
}

export default chatbot;
