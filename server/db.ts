import mongoose from "mongoose";
import { HowPlay } from "./models/HowPlay";
import {word} from "./models/wods";

export const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("CONECTADOOOO");
  } catch (error) {
    console.error("HAY UNA SERPIENTE EN TU BOTA:", error);
  }
};

export async function add_word(params:string){return await word.create({word:params })}

export async function look_word(params: string){return await word.findOne({ word:params })}

export async function look_into_HowPlay(params:string){ return await HowPlay.find({ question:params }); }

export async function add_HowPlay(pregunta: string, respuesta : string){ return await HowPlay.create({ question:pregunta , answer: respuesta });}