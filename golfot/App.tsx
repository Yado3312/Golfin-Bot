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

const saludos = ['hola', 'hi', 'hello', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'como estas', 'saludos', 'hey', 'que hubo', 'habla'];
const adios = ['adios', 'bye', 'hasta luego', 'nos vemos', 'chao', 'hasta pronto', 'hasta la proxima', 'cuidate', 'feliz dia', 'buen dia','nos vemos' ];
const startLobby = ['iniciar una lobby', 'crear lobby', 'crear lobby', 'invitar party', 'crear party', 'lobby', 'party'];
const startSession = ['inicio sesion', 'inicio de sesion', 'log in','registrarse', 'me registro', 'registrarme','iniciar sesion','logueo', 'login', 'inicio una sesion'];
const outSession = ['cerrar sesion','cerrar la sesion', 'log out', 'salir de la sesion', 'finalizar sesion', 'cierro mi sesion', 'cerrar mi sesion'];
const iot = ['golfito', 'hoyo', 'mapa', 'como usar el tablero', 'como conectarme', 'conectarse al tablero', 'como me conecto'];
const howUseTraps = ['como usar las trampas', 'donde usar las trampas', 'usar trampas'];
const typeTraps = ['tipos de trampas', 'remolino', 'pistola de aire', 'terremoto', 'cachetadon', 'cuantas trampas hay','cuantas tramas existen', 'trampas existentes'];
const trubbleIot = ['no se conecta', 'no conecta', 'falla conexion', 'fallo conexion', 'problema con conexion', 'problema de conexion'];
const invite = ['invitar a mis amigos', 'solicitud amistad', 'jugar con amigos', 'jugar amigos', 'invitar', 'solicitud', 'invito a amigos'];
const news = ['noticias', 'informacion reciente', 'actualizaciones', 'noticias recientes', 'noticias actuales', 'lo mas nuevo','informacion nueva','informacion mas nueva','que hay de nuevo', 'novedades'];
const pointsSystem = ['sistema de puntos', 'como gano puntos', 'puntajes', 'como es el puntaje', 'como se ganan puntos', 'ganar puntos'];
const barNav = ['barra de navegacion', 'barra lateral', 'barra de navegacion lateral','menu'];
const barSections = ['secciones de la barra', 'barra secciones', 'secciones barra', 'barra con sus secciones','que secciones tiene'];
const karma = ['karma'];
const puntos = ['puntos',' como funciona el puntaje puntaje', 'punto'];
const turnos = ['turnos', 'como funcionan los turnos', 'cuantos turnos', 'como son los turnos', 'turnos'];
const spiral = ['torbellino', 'cosa que gira', 'giratorio', 'giratoria'];
const cachet = ['mano que golpea', 'cachetada', 'cacheteador', 'cachetea','golpea'];
const airGun = ['pistola de aire','dispara aire', 'aire', 'disparar'];
const eathQuater = ['terremoto', 'vibracion', 'vibratorio', 'vibraciones', 'rebota', 'hace rebotar'];
const faildConection = ['no aparece el dispositivo', 'falla la conexion'];
const thanks  = ['gracias', 'eres genial','te amo'];
const howAppWorks = ['como funciona la app', 'como funciona la aplicacion', 'como usar la aplicacion', 'como usar la app', 'usar la app', 'uso de la aplicacion', 'usar la aplicacion', 'uso de la app', 'funcionala app', 'funciona la aplicacion', 'como es que funciona la app', 'como es que funciona la aplicacion'];
const whatIsGolf = ['que es el golf', 'que es golf'];
const howPlayGolf =['como jugar golf', 'como se juega el golf'];
const rules = ['cuales son las reglas', 'reglas del juego'];
const mostHighestScore = ['conseguir puntaje mas alto', 'conseguir el puntaje mas alto', 'conseguir el mejor puntaje','puntaje mas alto'];
const whatIsGolfin = ['que es golfin', 'golfin que es', 'golfin'];
const betterGolfPlayers = ['quienes son los mejores jugadores', 'mejores jugadores', 'pro players']; 
const whatsDifferent = ['que tienen de diferente', 'que los diferencia', 'que lo  diferencia', 'que diferencia hay', 'golfin y golfito', 'minigolf y golf', 'que los hace diferentes'];
const wifiConection = ['misma conexion a internet', 'conexion a internet ', 'conexion a wifi', 'misma conexion a wifi', 'misma conexion de wifi'];
const theresNotWifi = ['no hay wifi', 'no tienen wifi', 'no tiene wifi', 'no hay internet', 'no hay conexion a internet'];
const soloOrFriends = ['puedo jugar solo', 'jugar solo','jugar solito','jugar en solitario', 'juego solitario']; 
const compatibility = ['es compatible con ios', 'es compatible con android','multiplataforma','varias plataformas', 'multiples plataformas']; 
const whoAreYou = ['quien eres', 'que haces', 'que eres'];
const exercise = ['ejercicio', 'que partes del cuerpo ejercia', 'ejercita'];

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
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Como%20inicio%20una%20lobby%3F`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }
  

    //DETECCION TABLERO 
    if(startSession.some(session => input.includes(session))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Log%20in`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    

    // DETECCION PARA HACER LOG OUT
    if(outSession.some(session => input.includes(session))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=log%20out`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // Deteccion IOT
    
    if(iot.some(iot => input.includes(iot))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Como%20conectarme%20al%20golfito%20`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE COMO USAR LAS TRAMPAS
    if(howUseTraps.some(traps => input.includes(traps))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Activar%20trampas`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE DIFERENTES TRAMPAS
    if(typeTraps.some(trapsT => input.includes(trapsT))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Tipos%20trampas`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION ERRORES IOT
    if(trubbleIot.some(truble => input.includes(truble))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Descompuesto`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCON DE COSAS DE FRIENDS
    if(invite.some(inv => input.includes(inv))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Como%20invitar%20a%20mis%20amigos`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE NUEVAS NOTICIAS 
    if(news.some(advic => input.includes(advic))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Novedades`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE SISTEMA DE PUNTOS
    if(pointsSystem.some(point => input.includes(point))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Que%20son%20los%20puntos`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION DE TIPO KARMA POINTS
    if(karma.some(kar => input.includes(kar))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Karma`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCIOND DE PUNTOS
    if(puntos.some(po => input.includes(po))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Puntos`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION BARRA DE NAVEGACION
    if(barNav.some(nav => input.includes(nav))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Tutorial%20barra%20de%20navegacion`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION SECCIONES BARRA
    if(barSections.some(section => input.includes(section))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=SECCIONES%20BARRA`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION COMO FUNCIONAN LOS TURNOS
    if(turnos.some(tur => input.includes(tur))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Turnos%20`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION TRAMPA REMOLINO
    if(spiral.some(trap => input.includes(trap))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Turnos%20`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION TRAMPA CACHETADA
    if(cachet.some(trap => input.includes(trap))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Cachetadon%20`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION TRAMPA PISTOLA DE AIRE
    if(airGun.some(trap => input.includes(trap))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Pistola%20de%20aire`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }
    
    // DETECCION TRAMPA TERREMOTO
    if(eathQuater.some(trap => input.includes(trap))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Terremoto`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    // DETECCION FAIL CONECTION
    if(faildConection.some(con => input.includes(con))){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=No%20conecta`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    const thks = thanks.some(greeting => input.includes(greeting));
    if (thks) {
      const greetingResponses = [ 'De nada!!! Aqui estoy para ti!', 'Que felicidad, me alegra ser de utilidad', 'De nada enfermo mental', 'A divertirse jugador!!! aqui estoy', 'Gracias a ti'];
      return Promise.resolve( greetingResponses[Math.floor(Math.random() * greetingResponses.length)] );
    }

    ////////// OTRO AVANCE //////////////////////////

    const hapw = howAppWorks.some(hap => input.includes(hap));
    if(hapw){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Como%20funciona%20la%20app%3F`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }
    
    const wif = whatIsGolf.some(wg => input.includes(wg));
    if (wif){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Que%20es%20el%20golf%3F`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    } 

    const hpg = howPlayGolf.some(hpg => input.includes(hpg));
    if (hpg){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Como%20se%20juega%20el%20golf%3F`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    const rule = rules.some(rle => input.includes(rle));
    if (rule){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Reglas`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    const mhscore = mostHighestScore.some(mscore => input.includes(mscore));
    if (mhscore){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Puntaje%20mas%20alto`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }
    
    const wig = whatIsGolfin.some(golfin => input.includes(golfin));
    if (wig){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Que%20es%20golfin%3F`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    const ranking = betterGolfPlayers.some(player => input.includes(player));
    if(ranking){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Mejores%20jugadores%20de%20golf%3F`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }
    
    const different = whatsDifferent.some(df => input.includes(df));
    if (different){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Diferente`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    const wfc = wifiConection.some(w => input.includes(w));
    if (wfc){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=Conexion%20a%20internet`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }


    const noWifi = theresNotWifi.some(nw => input.includes(nw));
    if(noWifi){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=no%20hay%20wifi`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    const lonley = soloOrFriends.some(lnly => input.includes(lnly));
    if(lonley){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=solo%20o%20con%20amigos`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    const platform = compatibility.some(cmp => input.includes(cmp));
    if(platform){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=compatibilidad`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    const quien = whoAreYou.some(subject => input.includes(subject));
    if(quien){
      const apiData = await getData(`http://${ip}:3000/howplay/search?question=quien%20eres%3F`);
      const parsedData = JSON.parse(apiData) as { answer: string }[]; 
      return parsedData.map(item => item.answer).join("\n\n");
    }

    const excers = exercise.some(move => input.includes(move));
    if(excers){
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