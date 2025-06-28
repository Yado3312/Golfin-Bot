import express, {Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { look_into_HowPlay, add_HowPlay} from "./db";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "";

app.use(cors());
app.use(express.json());


const conectarDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

conectarDB();

app.get("/", (req, res) => {
  res.send(" API Golfot funcionando con TypeScript");
});

app.post("/howplay", async (req: any, res : any) => {
    const {question, answer} = req.body; 
    if (!question || !answer) { return res.status(400).json({error: "LLENA LOS CAMPOS"});}

    try {
        const input = await add_HowPlay(question, answer);
        res.status(201).json({mensaje: "Pregunta agregada"});
    }
    catch(error){res.status(500).json({error: "Error al insertar"}); }

});


app.get("/howplay/search", async(req: any, res: any) => {
    const {question} = req.query;
    if (!question){ return res.status(400).json({error: "FALTA E PARAMETRO"})};

    try{
        const resultados = await look_into_HowPlay(question.toString());
        res.json(resultados);
    }
    catch(error) {res.status(500).json({error: "Fallo algo en busacr",detalles: error}); }
});



// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});

