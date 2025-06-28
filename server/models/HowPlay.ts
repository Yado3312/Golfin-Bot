import {Schema, model } from "mongoose";

const HowPlaySchema = new Schema ({
    question : {type: String, required: true}, 
    answer: {type: String, required: true}
});

export const HowPlay = model("HowPlay", HowPlaySchema, "HowPlay");