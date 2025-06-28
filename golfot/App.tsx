import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';

type Document = {
  _id: string;
  name: string;
  score: number;
};

type Message = {
  from: 'user' | 'bot';
  text: string;
  timestamp?: Date;
};

const saludos = ['hola', 'hi', 'hello', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'como estas', 'saludos', 'hey', 'que hubo', 'habla'];
const adios = ['adios', 'bye', 'hasta luego', 'nos vemos', 'chao', 'hasta pronto', 'hasta la proxima', 'cuidate', 'feliz dia', 'buen dia','nos vemos' ];
const startLobby = ['hacer lobby', 'iniciar lobby', 'crear lobby', 'invitar party', 'crear party', 'lobby', 'party']
const startSession = ['iniciar sesion', 'inicio de sesion', 'log in', 'registrarme'];
const outSession = ['cerrar sesion', 'log out', 'salir de la sesion', 'finalizar sesion'];
const iot = ['tablero', 'golfito', 'hoyo', 'mapa', 'como usar el tablero', 'como conectarme', 'conectarse al tablero', 'conectar', 'como me conecto'];
const howUseTraps = ['como usar las trampas', 'donde usar las trampas', 'usar trampas'];
const typeTraps = ['tipos de trampas', 'remolino', 'pistola de aire', 'terremoto', 'cachetadon'];
const trubbleIot = ['no se conecta', 'no conecta', 'falla conexion', 'fallo conexion', 'problema con conexion'];
const invite = ['invitar a mis amigos', 'solicitud amistad', 'jugar con amigos', 'jugar amigos', 'invitar', 'solicitud'];
const news = ['noticias', 'informacion reciente', 'actualizaciones', 'noticias recientes', 'noticias actuales', 'lo mas nuevo'];
const pointsSystem = ['sistema de puntos', 'como gano puntos', 'puntajes', 'como es el puntaje', 'como se ganan puntos', 'ganar puntos'];
const barNav = ['barra', 'navegacion', 'barra de navegacion', 'barra lateral', 'barra de navegacion lateral'];
const barSections = ['secciones de la barra', 'barra secciones', 'secciones barra', 'barra con sus secciones'];
const karma = ['karma'];
const puntos = ['puntos','puntaje', 'punto'];
const turnos = ['turnos', 'como funcionan los turnos', 'cuantos turnos', 'como son los turnos', 'turnos'];
const spiral = ['torbellino', 'cosa que gira', 'giratorio', 'giratoria'];
const cachet = ['mano que golpea', 'cachetada', 'cacheteador', 'cachetea','golpea'];
const airGun = ['pistola de aire','dispara aire', 'aire', 'disparar'];
const eathQuater = ['terremoto', 'vibracion', 'vibratorio', 'vibraciones', 'rebota', 'hace rebotar'];
const faildConection = ['no conecta', 'no se conecta', 'no hay conexion', 'no aparece el dispositivo', 'falla la conexion'];


export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      from: 'bot', 
      text: '¡Hola! Soy GolfBot, tu asistente personal de golf. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date() 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Funcion para pder obtener la data del endpoint
  const getData = async (uri:string): Promise<string> => {
    try{
      const response = await fetch(uri); 
      const data = await response.json();
      return JSON.stringify(data);
      } 
      catch (error) {console.error(error); return "Hubo un error";}
  }
  


  const handleSend = async () => {
    if (inputText.trim() === '') return;

    const newMessage: Message = {
      from: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    try {
    const botResponseText = await generateResponse(inputText); // Espera la respuesta
    const botResponse: Message = {
      from: 'bot',
      text: botResponseText, // Aquí ya tienes el string, no la Promise
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botResponse]);
  } catch (error) {
    const errorResponse: Message = {
      from: 'bot',
      text: "Ocurrió un error al procesar tu mensaje",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, errorResponse]);
  }
  };

  const generateResponse = async (userInput: string): Promise<string> => {
    const input = userInput.toLowerCase();
    
    // DETECCION SALUDOS
    const hello = saludos.some(greeting => input.includes(greeting));
    if (hello) {
      const greetingResponses = [ ` Hola! Listo para mejorar y ganarle a Liam?`, ` Buen dia Que tal guap@? `, ` Saludos golfista! ¿En que puedo ayudarte?`, ` Hola tilin! Como va tu juego?`, ` Buenas! Preparado para unos hoyos?` ];
      return Promise.resolve( greetingResponses[Math.floor(Math.random() * greetingResponses.length)] );
    }
    
    // DETECCION DESPEDIDAS
    const bye = adios.some(goodbye => input.includes(goodbye));
    if (bye) {
      const goodbyeResponses = [`TE CUIDAS!!!! vete por la sombrita`, `Nos vemos! Practica tu putting.`, `Adios amor... me voy de ti...`, `¡Chao! Recuerda mantener la cabeza quieta en el swing.`, `Hasta la próxima! CUIDATE!`];
      return Promise.resolve (goodbyeResponses[Math.floor(Math.random() * goodbyeResponses.length)]);
    }

    // DETECCION LOBBY
    if (startLobby.some(tutorial => input.includes(tutorial))) {
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Como%20inicio%20una%20lobby%3F");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }
  

    // DETECCION TABLERO 
    if(startSession.some(session => input.includes(session))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Como%20conectarme%20al%20golfito%20");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    

    // DETECCION PARA HACER LOG OUT
    if(outSession.some(session => input.includes(session))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=log%20out");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // Deteccion IOT
    
    if(iot.some(iot => input.includes(iot))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Como%20conectarme%20al%20golfito%20");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE COMO USAR LAS TRAMPAS
    if(howUseTraps.some(traps => input.includes(traps))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Activar%20trampas");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE DIFERENTES TRAMPAS
    if(typeTraps.some(trapsT => input.includes(trapsT))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Tipos%20trampas");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION ERRORES IOT
    if(trubbleIot.some(truble => input.includes(truble))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Descompuesto");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCON DE COSAS DE FRIENDS
    if(invite.some(inv => input.includes(inv))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Como%20invitar%20a%20mis%20amigos");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE NUEVAS NOTICIAS 
    if(news.some(advic => input.includes(advic))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Novedades");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE SISTEMA DE PUNTOS
    if(pointsSystem.some(point => input.includes(point))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Que%20son%20los%20puntos");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE TIPO KARMA POINTS
    if(karma.some(kar => input.includes(kar))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Karma");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCIOND DE PUNTOS
    if(puntos.some(po => input.includes(po))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Puntos");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION BARRA DE NAVEGACION
    if(barNav.some(nav => input.includes(nav))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Tutorial%20barra%20de%20navegacion");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION SECCIONES BARRA
    if(barSections.some(section => input.includes(section))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=SECCIONES%20BARRA");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION COMO FUNCIONAN LOS TURNOS
    if(turnos.some(tur => input.includes(tur))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Turnos%20");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION TRAMPA REMOLINO
    if(spiral.some(trap => input.includes(trap))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Turnos%20");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION TRAMPA CACHETADA
    if(cachet.some(trap => input.includes(trap))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Cachetadon%20");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION TRAMPA PISTOLA DE AIRE
    if(airGun.some(trap => input.includes(trap))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Pistola%20de%20aire");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }
    
    // DETECCION TRAMPA TERREMOTO
    if(eathQuater.some(trap => input.includes(trap))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=Terremoto");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION FAIL CONECTION
    if(faildConection.some(con => input.includes(con))){
      const apiData = await getData("http://192.168.0.15:3000/howplay/search?question=No%20conecta");
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }



    return Promise.resolve("No entiendo bien, Podrias explicarme por favor? ");;
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

   return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.titleHeader}>GolfBot</Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.chatArea}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                msg.from === 'user' ? styles.userMessage : styles.botMessage
              ]}
            >
              <Text style={msg.from === 'user' ? styles.userMessageText : styles.botMessageText}>
                {msg.text}
              </Text>
              <Text style={styles.timestamp}>
                {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={handleSend}
            disabled={inputText.trim() === ''}
          >
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2e8b57',
    padding: 15,
    alignItems: 'center',
  },
  titleHeader: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  chatArea: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chatContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  botMessage: {
    backgroundColor: '#e8f5e9',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  userMessage: {
    backgroundColor: '#2e8b57',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  botMessageText: {
    fontSize: 16,
    color: '#333',
  },
  userMessageText: {
    fontSize: 16,
    color: 'white',
  },
  timestamp: {
    fontSize: 10,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#2e8b57',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  apiSection: {
    marginTop: 20,
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e8b57',
  },
  dataItem: {
    marginBottom: 8,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  dataText: {
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});