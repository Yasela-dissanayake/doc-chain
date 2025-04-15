// src/routes/paymentProofRoutes.ts

import express from "express";
import multer from "multer";
import path from "path";
import { extractPaymentDetails } from "../services/paymentProofService";

const router = express.Router();

// Setup multer to store uploads in 'uploads/proof'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "uploads", "paymentproofs"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload-payment-proof",
  upload.single("proof"),
  (req, res, next) => {
    (async () => {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { salePrice } = req.body;

      try {
        const result = await extractPaymentDetails(req.file.filename);
        const extractedAmount = result.extracted?.amount;

        // Normalize for comparison (remove commas, periods)
        const normalizedExtracted = extractedAmount?.replace(/[,\.]/g, "") || "";
        const normalizedSalePrice = salePrice?.toString().replace(/[,\.]/g, "");

        const isAmountMatch = normalizedExtracted === normalizedSalePrice;

        res.status(200).json({
          message: "Extraction successful",
          extractedData: result,
          validation: {
            salePrice,
            extractedAmount,
            isAmountMatch,
          },
        });
      } catch (error: any) {
        console.error("Error:", error);
        next(error);
      }
    })().catch(next);
  }
);

export default router;
