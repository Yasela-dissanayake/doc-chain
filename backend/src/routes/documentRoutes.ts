import { Router } from "express";
import {
  getDocuments,
  registerDocument,
} from "../controllers/documentController";
import multer from "multer";

const router = Router();

router.get("/", getDocuments); // GET /api/documents

const upload = multer({ dest: "uploads/" }); // files go to /uploads
router.post("/register", upload.single("file"), registerDocument);

// Register a document
// router.post("/register", registerDocument);

export default router;
