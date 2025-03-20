import { NoteModel } from "../repositories/noteRepository.js";

export class NoteService {
    async create(title: string, content: string, userId: string, date: Date){
        const note = await NoteModel.create({ title, content, userId, date });
        return note.save();
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