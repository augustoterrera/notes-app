import { Router } from "express";
import { NoteController } from "../controllers/noteController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { NoteService } from "../services/noteService.js";

const router = Router();
const noteService = new NoteService();
const noteController = new NoteController(noteService);

router.use(authMiddleware);
router.get("/getAllNotes", noteController.getAll.bind(noteController));
router.get("/getOneNote/:id", noteController.getOne.bind(noteController));
router.post("/createNote", noteController.create.bind(noteController));
router.put("/updateNote", noteController.update.bind(noteController));
router.delete("/deleteNote/:id", noteController.delete.bind(noteController));

export { router };

