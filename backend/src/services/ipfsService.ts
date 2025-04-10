import { Web3Storage } from "web3.storage";

// Initialize Web3.Storage client with your API token
const client = new Web3Storage({ token: process.env.WEB3_STORAGE_API_TOKEN! });

// Store file on IPFS and return the CID (IPFS hash)
export const storeFile = async (fileBuffer: Buffer) => {
  const file = new File([fileBuffer], "document.pdf");
  const cid = await client.put([file]);
  return cid;
};
