import { Request, Response } from "express";
import { Document } from "../entities/Document";
import { contract } from "../utils/blockchain";
import { AppDataSource } from "../AppDataSource";
import { uploadFileToIPFS } from "../utils/uploadToIPFS";

export const registerDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, docType, ownerId } = req.body;
    const file = req.file; // multer adds this

    if (!file || !name || !docType || !ownerId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Upload file to IPFS using multer-provided path and original name
    const cid = await uploadFileToIPFS(file.path, file.originalname);

    // Register in smart contract
    const tx = await contract.registerDocument(docType, ownerId, cid);
    await tx.wait();

    // Save to database
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
    console.error("Error registering document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
