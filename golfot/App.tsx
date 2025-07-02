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
  ActivityIndicator,
  SafeAreaView,
  Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';


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

const ip : String= "192.168.0.15";

const dictionaryWord = {
  saludos: ['hola', 'hi', 'hello', 'buenos días', 'buenas tardes', 'buenas noches', 'qué tal', 'cómo estás', 'saludos', 'hey', 'qué hubo', 'habla'],
  startLobby: ['iniciar una lobby', 'crear lobby', 'invitar party', 'crear party', 'lobby', 'party', 'inicio a jugar', 'comenzar juego', 'iniciar juego', 'crear sala', 'crear sala de juego', 'crear sala de lobby', 'crear sala de party'],
  startSession: ['inicio sesión', 'inicio de sesión', 'log in', 'registrarse', 'me registro', 'registrarme', 'iniciar sesión', 'logueo', 'login', 'inicio una sesión', 'loguear'],
  outSession: ['cerrar sesión', 'cerrar la sesión', 'cierro sesión', 'log out', 'salir de la sesión', 'finalizar sesión', 'cierro mi sesión', 'cerrar mi sesión'],
  iot: ['golfito', 'hoyo', 'mapa', 'cómo usar el tablero', 'cómo conectarme', 'conectarse al tablero', 'cómo me conecto','cómo uso el juego','cómo usar el juego','como uso el juego','como usar el juego'],
  howUseTraps: ['cómo usar las trampas', 'dónde usar las trampas', 'usar trampas', 'cómo uso las trampas','como uso las trampas'], 
  typeTraps: ['tipos de trampas', 'remolino', 'pistola de aire', 'terremoto', 'cachetadón', 'cuántas trampas hay', 'cuántas trampas existen', 'trampas existentes'],
  trubbleIot: ['no se conecta', 'no conecta', 'falla conexión', 'falló conexión', 'problema con conexión', 'problema de conexión'],
  invite: ['invitar a mis amigos', 'solicitud amistad', 'jugar con amigos', 'jugar amigos', 'invitar', 'solicitud', 'invito a amigos'],
  news: ['noticias', 'información reciente', 'actualizaciones', 'noticias recientes', 'noticias actuales', 'lo más nuevo', 'información nueva', 'información más nueva', 'qué hay de nuevo', 'novedades'],
  pointsSystem: ['sistema de puntos', 'cómo gano puntos', 'puntajes', 'cómo es el puntaje', 'cómo se ganan puntos', 'ganar puntos'],
  barNav: ['barra de navegación', 'barra lateral', 'barra de navegación lateral', 'menú'],
  barSections: ['secciones de la barra', 'barra secciones', 'secciones barra', 'barra con sus secciones', 'qué secciones tiene'],
  karma: ['karma'],
  puntos: ['puntos', 'cómo funciona el puntaje', 'puntaje', 'punto'],
  turnos: ['turnos', 'cómo funcionan los turnos', 'cuántos turnos', 'cómo son los turnos'],
  spiral: ['torbellino', 'cosa que gira', 'giratorio', 'giratoria'],
  cachet: ['mano que golpea', 'cachetada', 'cacheteador', 'cachetea', 'golpea'],
  airGun: ['pistola de aire', 'dispara aire', 'aire', 'disparar'],
  eathQuater: ['terremoto', 'vibración', 'vibratorio', 'vibraciones', 'rebota', 'hace rebotar'],
  faildConection: ['no aparece el dispositivo', 'falla la conexión'],
  thanks: ['gracias', 'eres genial', 'te amo'],
  howAppWorks: ['cómo funciona la app', 'cómo funciona la aplicación', 'cómo usar la aplicación', 'cómo usar la app', 'usar la app', 'uso de la aplicación', 'usar la aplicación', 'uso de la app', 'funciona la app', 'funciona la aplicación', 'cómo es que funciona la app', 'cómo es que funciona la aplicación'],
  whatIsGolf: ['qué es el golf', 'qué es golf'],
  howPlayGolf: ['cómo jugar golf', 'cómo se juega el golf','como se juega', 'como se juega el golf','como jugar golf','como jugar', 'cómo jugar'],
  rules: ['cuáles son las reglas', 'reglas del juego','cuales son las reglas', 'reglas de golfin', 'reglas del tablero'],
  mostHighestScore: ['conseguir puntaje más alto', 'conseguir el puntaje más alto', 'conseguir el mejor puntaje', 'puntaje más alto'],
  whatIsGolfin: ['qué es golfin', 'golfin qué es', 'golfin'],
  betterGolfPlayers: ['quiénes son los mejores jugadores', 'mejores jugadores', 'pro players'],
  whatsDifferent: ['qué tienen de diferente', 'qué los diferencia', 'qué lo diferencia', 'qué diferencia hay', 'golfin y golfito', 'minigolf y golf', 'qué los hace diferentes'],
  wifiConection: ['misma conexión a internet', 'conexión a internet', 'conexión a wifi', 'misma conexión a wifi', 'misma conexión de wifi'],
  theresNotWifi: ['no hay wifi', 'no tienen wifi', 'no tiene wifi', 'no hay internet', 'no hay conexión a internet'],
  soloOrFriends: ['puedo jugar solo', 'jugar solo', 'jugar solito', 'jugar en solitario', 'juego solitario'],
  compatibility: ['es compatible con ios', 'es compatible con android', 'multiplataforma', 'varias plataformas', 'múltiples plataformas'],
  whoAreYou: ['quién eres', 'qué haces', 'qué eres', 'hola quién eres'],
  exercise: ['ejercicio', 'qué partes del cuerpo ejercita', 'ejercita'],
  adios: ['adiós', 'hasta luego', 'hasta pronto', 'hasta luego amigo', 'bye', 'nos vemos', 'chao', 'hasta la próxima', 'cuídate', 'feliz día', 'buen día', 'bai', 'aios'],
  
  howWin: ['cómo ganar', 'cómo se gana', 'cómo se gana el juego', 'cómo se gana la partida', 'cómo ganar la partida', 'cómo ganar el juego', 'ganar el juego', 'ganar la partida', 'como ganar','como se gana'],
  howManyPoints : ['cuántos hoyos', 'cuántos hoyos hay', 'cuántos hoyos se necesitan', 'cuántos hoyos hay que tener', 'cuántos hoyos hay que conseguir','cantidad de puntos', 'cuántos puntos', 'cuántos puntos necesito', 'cuántos puntos hay que hacer', 'cuántos puntos se necesitan', 'cuántos puntos se requieren', 'cuántos puntos hay que conseguir'],
  howManyRounds: ['cuántas rondas', 'cuántas rondas hay', 'cuántas rondas se juegan', 'cuántas rondas se necesitan', 'cuántas rondas hay que jugar', 'cuántas rondas hay que completar', 'cuantos rounds hay que hacer', 'cuántos rounds hay que jugar','cuántos rounds hay que completar', 'cuántos rounds hay que conseguir'],
  howManyPlayers: ['cuántos jugadores', 'cuántos jugadores hay', 'cuántos jugadores se necesitan', 'cuántos jugadores hay que tener', 'cuántos jugadores hay que conseguir','cuantos jugadores pueden jugar', 'cuántos jugadores pueden participar', 'cuántos jugadores se pueden unir', 'cuántos jugadores se pueden agregar', 'cuántos jugadores se pueden incluir'],
  dude: ['puedo jugar online', 'jugar online', 'jugar en línea', 'jugar en internet', 'jugar en la web', 'jugar en la red', 'jugar en la nube', 'jugar en el servidor', 'jugar en el cloud'],
  duration: ['duración', 'cuánto dura', 'cuánto tiempo dura', 'cuánto tiempo se necesita', 'cuánto tiempo hay que dedicar', 'cuánto tiempo hay que invertir', 'cuánto tiempo hay que jugar', 'cuánto tiempo hay que completar', 'cuánto tiempo hay que conseguir'],
  queganas: ['que ganas si juegas con alguien mas', ' que ganas si juegas con amigos', 'que ganas si juegas con alguien', 'que ganas si juegas con otra persona', 'que ganas si juegas con otra persona mas', 'que ganas si juegas con otra persona mas'],
  replay: ['y como hago eso', 'y como se hace', 'y como se hace eso', 'y como se hace eso','y como hago eso','y como se hace','y como se hace', 'como lo hago', 'como se hace'],

};


export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      from: 'bot', 
      text: 'Hola! Soy GolfBot, tu asistente personal de golf. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date() 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const [isLoading, setIsLoading] = useState(false);

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

    if (dictionaryWord.saludos.some(greeting => input.includes(greeting))) {
      const greetingResponses = [ ` Hola, soy golfot tu asistente personal! Listo para mejorar y ganarle a Liam?`, ` Buen dia, soy golfot tu asistente personal, Que tal guap@? `, ` Saludos golfista!, soy golfot tu asistente personal ¿En que puedo ayudarte?`, ` Hola tilin!,soy golfot tu asistente persona,  Como va tu juego?`, ` Buenas!, soy golfot tu asistente personal Preparado para unos hoyos?` ];
      return Promise.resolve( greetingResponses[Math.floor(Math.random() * greetingResponses.length)] );
    }
    
    // DETECCION DESPEDIDAS

    if (dictionaryWord.adios.some(goodbye => input.includes(goodbye))) {
      const goodbyeResponses = [`TE CUIDAS!!!! vete por la sombrita`, `Nos vemos! Practica tu putting.`, `Adios amor... me voy de ti...`, `¡Chao! Recuerda mantener la cabeza quieta en el swing.`, `Hasta la próxima! CUIDATE!`];
      return Promise.resolve (goodbyeResponses[Math.floor(Math.random() * goodbyeResponses.length)]);
    }

    // DETECCION LOBBY
    if (dictionaryWord.startLobby.some(tutorial => input.includes(tutorial))) {
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Como%20inicio%20una%20lobby%3F`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }
  

    //DETECCION TABLERO 
    if(dictionaryWord.startSession.some(session => input.includes(session))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Log%20in`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    

    // DETECCION PARA HACER LOG OUT
    if(dictionaryWord.outSession.some(session => input.includes(session))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=log%20out`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // Deteccion IOT
    
    if(dictionaryWord.iot.some(iot => input.includes(iot))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Como%20conectarme%20al%20golfito%20`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE COMO USAR LAS TRAMPAS
    if(dictionaryWord.howUseTraps.some(traps => input.includes(traps))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Activar%20trampas`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE DIFERENTES TRAMPAS
    if(dictionaryWord.typeTraps.some(trapsT => input.includes(trapsT))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Tipos%20trampas`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION ERRORES IOT
    if(dictionaryWord.trubbleIot.some(truble => input.includes(truble))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Descompuesto`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCON DE COSAS DE FRIENDS
    if(dictionaryWord.invite.some(inv => input.includes(inv))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Como%20invitar%20a%20mis%20amigos`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE NUEVAS NOTICIAS 
    if(dictionaryWord.news.some(advic => input.includes(advic))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Novedades`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE SISTEMA DE PUNTOS
    if(dictionaryWord.pointsSystem.some(point => input.includes(point))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Que%20son%20los%20puntos`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE TIPO KARMA POINTS
    if(dictionaryWord.karma.some(kar => input.includes(kar))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Karma`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCIOND DE PUNTOS
    if(dictionaryWord.puntos.some(po => input.includes(po))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Puntos`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION BARRA DE NAVEGACION
    if(dictionaryWord.barNav.some(nav => input.includes(nav))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Tutorial%20barra%20de%20navegacion`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION SECCIONES BARRA
    if(dictionaryWord.barSections.some(section => input.includes(section))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=SECCIONES%20BARRA`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION COMO FUNCIONAN LOS TURNOS
    if(dictionaryWord.turnos.some(tur => input.includes(tur))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Turnos%20`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION TRAMPA REMOLINO
    if(dictionaryWord.spiral.some(trap => input.includes(trap))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Turnos%20`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION TRAMPA CACHETADA
    if(dictionaryWord.cachet.some(trap => input.includes(trap))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Cachetadon%20`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION TRAMPA PISTOLA DE AIRE
    if(dictionaryWord.airGun.some(trap => input.includes(trap))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Pistola%20de%20aire`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }
    
    // DETECCION TRAMPA TERREMOTO
    if(dictionaryWord.eathQuater.some(trap => input.includes(trap))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Terremoto`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION FAIL CONECTION
    if(dictionaryWord.faildConection.some(con => input.includes(con))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=No%20conecta`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    if (dictionaryWord.thanks.some(greeting => input.includes(greeting))) {
      const greetingResponses = [ 'De nada!!! Aqui estoy para ti!', 'Que felicidad, me alegra ser de utilidad', 'De nada, aqui estoy', 'A divertirse jugador!!! aqui estoy', 'Gracias a ti'];
      return Promise.resolve( greetingResponses[Math.floor(Math.random() * greetingResponses.length)] );
    }

    ////////// OTRO AVANCE //////////////////////////

    if(dictionaryWord.howAppWorks.some(hap => input.includes(hap))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Como%20funciona%20la%20app%3F`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }
    
    if (dictionaryWord.whatIsGolf.some(wg => input.includes(wg))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Que%20es%20el%20golf%3F`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    } 

    if (dictionaryWord.howPlayGolf.some(hpg => input.includes(hpg))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Como%20se%20juega%20el%20golf%3F`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    if (dictionaryWord.rules.some(rle => input.includes(rle))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Reglas`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    if (dictionaryWord.mostHighestScore.some(mscore => input.includes(mscore))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Puntaje%20mas%20alto`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }
    
    if (dictionaryWord.whatIsGolfin.some(golfin => input.includes(golfin))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Que%20es%20golfin%3F`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    if(dictionaryWord.betterGolfPlayers.some(player => input.includes(player))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Mejores%20jugadores%20de%20golf%3F`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }
    
    if (dictionaryWord.whatsDifferent.some(df => input.includes(df))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Diferente`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    if (dictionaryWord.wifiConection.some(w => input.includes(w))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Conexion%20a%20internet`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }


    if(dictionaryWord.theresNotWifi.some(nw => input.includes(nw))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=no%20hay%20wifi`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    if(dictionaryWord.soloOrFriends.some(lnly => input.includes(lnly))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=solo%20o%20con%20amigos`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    if(dictionaryWord.compatibility.some(cmp => input.includes(cmp))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=compatibilidad`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }


    if(dictionaryWord.whoAreYou.some(subject => input.includes(subject))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=quien%20eres%3F`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    if(dictionaryWord.exercise.some(move => input.includes(move))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Ejercicio`);
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

   useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  
     return (
    <LinearGradient  colors={['#f0f9f0', '#e0f3e0']} style={styles.container}>
      <StatusBar style="dark" />
      
      <LinearGradient colors={['#2e8b57', '#3a9e6a']} style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
        <View style={styles.headerContent}>
          <Ionicons name="golf" size={28} color="white" style={styles.logo} />
          <Text style={styles.titleHeader}>GolfBot Pro</Text>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView 
        style={styles.chatArea}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[ styles.messageContainer, msg.from === 'user' ? styles.userMessage : styles.botMessage ]}>
              {msg.from === 'bot' && (
                <Ionicons name="golf-outline" size={20} color="#2e8b57" style={styles.botIcon} />
              )}
              <View style={styles.messageContent}>
                <Text style={msg.from === 'user' ? styles.userMessageText : styles.botMessageText}> {msg.text}</Text>
                <Text style={[ styles.timestamp, msg.from === 'user' ? styles.userTimestamp : styles.botTimestamp ]}>
                  {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>
          ))}
          {isLoading && (
            <View style={[styles.messageContainer, styles.botMessage]}>
              <ActivityIndicator size="small" color="#2e8b57" />
              <Text style={styles.botMessageText}>Pensando...</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="#999"
            multiline
            blurOnSubmit={false}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity 
            style={[ styles.sendButton, inputText.trim() === '' && styles.disabledButton ]} 
            onPress={handleSend}
            disabled={inputText.trim() === '' || isLoading}
          >
            <Ionicons   name="send"  size={20} color="white"  style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    marginRight: 10,
  },
  titleHeader: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  chatArea: {
    flex: 1,
    marginTop: 5,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  chatContent: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: '85%',
    padding: 15,
    borderRadius: 18,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  botMessage: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 4,
    borderLeftColor: '#2e8b57',
  },
  userMessage: {
    backgroundColor: '#2e8b57',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 4,
    borderRightColor: '#1f6b3d',
  },
  messageContent: {
    flex: 1,
  },
  botMessageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  userMessageText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
  },
  botIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 6,
  },
  botTimestamp: {
    color: '#666',
    alignSelf: 'flex-start',
  },
  userTimestamp: {
    color: 'rgba(255,255,255,0.7)',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    lineHeight: 20,
  },
  sendButton: {
    backgroundColor: '#2e8b57',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2e8b57',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    shadowColor: '#999',
  },
  sendIcon: {
    marginLeft: 2,
  },
});