import { ethers } from "ethers";
import contractABI from "../contracts/contractABI.json";
import "dotenv/config";

// Environment variables
const rpcUrl = process.env.ETHEREUM_NODE_URL || "http://localhost:8545";
const privateKey = process.env.PRIVATE_KEY || "";
const contractAddress = process.env.CONTRACT_ADDRESS || "";

// Ensure environment variables are set
if (!rpcUrl || !privateKey || !contractAddress) {
  throw new Error(
    "Missing required environment variables: BLOCKCHAIN_RPC_URL, PRIVATE_KEY, or CONTRACT_ADDRESS"
  );
}

// Set up provider
const provider = new ethers.JsonRpcProvider(rpcUrl);

// Set up signer
export const signer = new ethers.Wallet(privateKey, provider);

// Create a contract instance connected to the signer
export const contract = new ethers.Contract(
  contractAddress,
  contractABI,
  signer
);

// Wrapper for contract methods
export const blockchainService = {
  async registerDocument(docType: string, ownerId: string, cid: string) {
    try {
      const tx = await contract.registerDocument(docType, ownerId, cid);
      await tx.wait(); // Wait for the transaction to be mined
      return tx.hash; // Return the transaction hash
    } catch (error) {
      console.error("Error registering document:", error);
      throw error;
    }
  },

  async transferOwnership(documentId: ethers.BigNumberish, newOwner: string) {
    try {
      const tx = await contract.transferOwnership(documentId, newOwner);
      await tx.wait(); // Wait for the transaction to be mined
      return tx.hash; // Return the transaction hash
    } catch (error) {
      console.error("Error transferring ownership:", error);
      throw error;
    }
  },

  // Add other contract methods as needed
};
