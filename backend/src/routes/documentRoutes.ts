import { Router } from "express";
import { registerDocument } from "../controllers/documentController";

const router = Router();

// Register a document
router.post("/register", registerDocument);

export default router;
