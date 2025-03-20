import mongoose, { Schema, Model } from "mongoose";
import { Note } from "../models/note.js";

const noteSchema = new Schema<Note>({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Number, required: true },
    date: { type: Date, required: true },
});

export const NoteModel: Model<Note> = mongoose.model("Note", noteSchema);
