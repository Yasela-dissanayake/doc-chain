import { Request, Response } from "express";
import { Document } from "../entities/Document";
import { contract, signer } from "../utils/blockchain";
import { AppDataSource } from "../AppDataSource";

export const registerDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, cid, docType, ownerId } = req.body;

    if (!cid || !name || !docType || !ownerId) {
      res.status(400).json({ error: "Missing required fields" });
      return; // Added return here to exit the function
    }

    // Save to smart contract
    const tx = await contract.registerDocument(docType, ownerId, cid);
    await tx.wait();

    // Save to DB
    const documentRepo = AppDataSource.getRepository(Document);
    const doc = documentRepo.create({
      name,
      cid,
      type: docType,
      ownerId,
      timestamp: new Date(),
    });

    await documentRepo.save(doc);

    res
      .status(201)
      .json({ message: "Document registered successfully", txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
