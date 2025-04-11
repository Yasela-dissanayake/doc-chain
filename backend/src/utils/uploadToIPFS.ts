import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export const uploadFileToIPFS = async (
  filePath: string,
  originalName: string
): Promise<string> => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const formData = new FormData();
  const fileStream = fs.createReadStream(filePath);

  formData.append("file", fileStream, originalName); // Pass originalName for compatibility

  const headers = {
    ...formData.getHeaders(),
    Authorization: `Bearer ${process.env.PINATA_JWT}`,
  };

  try {
    const response = await axios.post(url, formData, {
      headers,
      maxBodyLength: Infinity,
    });

    return response.data.IpfsHash;
  } catch (error: any) {
    console.error(
      "Error uploading to IPFS:",
      error?.response?.data || error.message
    );
    throw error;
  }
};
