// src/services/paymentProofService.ts
import path from "path";
import { createWorker } from "tesseract.js";

export const extractPaymentDetails = async (filename: string) => {
  const filePath = path.join(
    __dirname,
    "../../uploads/paymentproofs",
    filename
  );

  const worker = await createWorker("eng");

  try {
    const {
      data: { text },
    } = await worker.recognize(filePath);

    // Sample parsing logic (can be improved with regex)
    const amountMatch = text.match(
      /(?:Rs|LKR|Amount)\s*[:\-]?\s*(\d+[,\.]?\d+)/i
    );
    const senderMatch = text.match(/From\s*[:\-]?\s*(.+)/i);
    const bankMatch = text.match(/Bank\s*[:\-]?\s*(.+)/i);

    return {
      rawText: text,
      extracted: {
        amount: amountMatch?.[1] || null,
        sender: senderMatch?.[1]?.trim() || null,
        bank: bankMatch?.[1]?.trim() || null,
      },
    };
  } catch (err) {
    console.error("OCR Error:", err);
    throw new Error("Failed to extract payment proof details.");
  } finally {
    await worker.terminate();
  }
};
