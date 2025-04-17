import { Note } from "../models/note.js";
import { NoteModel } from "../repositories/noteRepository.js";

export class NoteService {
    async create(title: string, content: string, userId: string){
        if (!title || !content || !userId) {
            throw new Error('Title, content, and userId are required');
        }
        const note = await NoteModel.create({ title, content, userId});
        return note;
    }

    async getAll(userId: string){
        return NoteModel.find({ userId });
    }

    async getOne(id: string){
        return NoteModel.findById(id);
    }

    async update(id: string, title?: string, content?: string) {
        const updateData: { title?: string; content?: string } = {};
        if (title) updateData.title = title;
        if (content) updateData.content = content;
    
        const updatedNote = await NoteModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedNote) {
            throw new Error('Note not found');
        }
        return updatedNote;
    }

    async delete(id: string){
        return NoteModel.findByIdAndDelete(id);
    }
}