import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import documentRoutes from "./routes/documentRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/documents", documentRoutes);

app.get("/", (_req, res) => {
  res.send("API Running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
