import {Schema, model } from "mongoose";

const wordsSchema = new Schema ({
    word : {type: String, required: true}, 
});

export const word = model("words", wordsSchema, "words");