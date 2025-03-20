import { Request, Response } from 'express';
import { NoteService } from '../services/noteService.js';

export class NoteController {
    constructor(private noteService: NoteService) {}

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user || !req.user?.userId) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }
    
            const userId = req.user.userId;
            const notes = await this.noteService.getAll(userId);
            if (!notes) {
                res.status(404).send({ error: "No notes found" });
                return;
            }
            res.status(200).send(notes);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({ error: error.message });
            } else {
                res.status(400).send({ error: "Unknown error occurred" });
            }
        }
    }
    

    async create(req: Request, res: Response) {
        try {
            const { title, content } = req.body;
            if (!req.user || !req.user?.userId) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }
            const userId = req.user?.userId;
            const note = await this.noteService.create(title, content, userId);
            res.status(201).send(note);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({ error: error.message });
            } else {
                res.status(400).send({ error: 'Unknown error occurred' });
            }
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id, title, content } = req.body;
            const updatedNote = await this.noteService.update(id, title, content);
            res.status(200).send(updatedNote);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({ error: error.message });
            } else {
                res.status(400).send({ error: 'Unknown error occurred' });
            }
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await this.noteService.delete(id);
            res.status(200).send({ message: 'Note deleted' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({ error: error.message });
            } else {
                res.status(400).send({ error: 'Unknown error occurred' });
            }
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const note = await this.noteService.getOne(id);
            res.status(200).send(note);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({ error: error.message });
            } else {
                res.status(400).send({ error: 'Unknown error occurred' });
            }
        }
    }

    
}