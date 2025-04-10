import crypto from 'crypto';

// Encrypt document using AES-256
export const encryptDocument = (documentBuffer: Buffer, secretKey: string) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(documentBuffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};
