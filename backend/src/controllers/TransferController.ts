import { Request, Response } from "express";
import { validateTransaction } from "../services/WatcherService";
import { isAddress } from "ethers/lib/utils";
import { blockchainService } from "../utils/blockchain";

export class TransferController {
  // Define the method explicitly to return void instead of Promise<Response>
  static async initiateTransfer(req: Request, res: Response): Promise<void> {
    try {
      const { landId, buyer, seller, salePrice } = req.body;

      if (!landId || !buyer || !seller || !salePrice) {
        res.status(400).json({ message: "Missing required fields." });
        return;
      }

      if (!isAddress(buyer) || !isAddress(seller)) {
        res.status(400).json({ message: "Invalid buyer or seller address." });
        return;
      }

      const transactionData = { landId, buyer, seller, salePrice };

      // Run all watchers
      const validation = await validateTransaction(transactionData);

      if (!validation.allApproved) {
        res.status(403).json({
          message: "Transfer rejected by one or more watchers.",
          validation,
        });
        return;
      }

      // 🔥 Call the real smart contract function here
      const txHash = await blockchainService.transferOwnership(landId, buyer);

      res.status(200).json({
        message: "Transfer successful and recorded on blockchain.",
        validation,
        transactionHash: txHash,
      });
    } catch (error) {
      console.error("Transfer error:", error);
      res.status(500).json({ message: "Server error." });
    }
  }
}
