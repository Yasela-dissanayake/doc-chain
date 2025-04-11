import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import documentRoutes from "./routes/documentRoutes";
import { AppDataSource } from "./AppDataSource";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Initialize database connection before starting the server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");

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
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });
