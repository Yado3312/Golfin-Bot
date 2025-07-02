import {Schema, model } from "mongoose";

const wordsSchema = new Schema ({
    question : {type: String, required: true}, 
});

export const word = model("words", wordsSchema, "words");