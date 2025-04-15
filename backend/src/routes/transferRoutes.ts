import { Router } from "express";
import { Request, Response } from "express";
import { TransferController } from "../controllers/TransferController";

const router = Router();

// Define an explicit handler function with proper types
const transferHandler = async (req: Request, res: Response) => {
  return await TransferController.initiateTransfer(req, res);
};

// Use the explicit handler function
router.post("/", transferHandler);

export default router;
