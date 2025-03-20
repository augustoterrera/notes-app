import mongoose, { Schema, Model } from "mongoose";
import { Note } from "../models/note.js";

const noteSchema = new Schema<Note>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

export const NoteModel: Model<Note> = mongoose.model("Note", noteSchema);
