import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

function getKey(): Buffer {
  const raw = process.env.DATA_ENCRYPTION_KEY_BASE64;
  if (!raw) throw new Error("Missing DATA_ENCRYPTION_KEY_BASE64");
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) throw new Error("DATA_ENCRYPTION_KEY_BASE64 must decode to 32 bytes");
  return key;
}

export function sha256(input: string) {
  return createHash("sha256").update(input).digest("hex");
}

export function encryptField(plainText: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    iv: iv.toString("base64"),
    ciphertext: encrypted.toString("base64"),
    tag: tag.toString("base64"),
    alg: "aes-256-gcm",
    keyVersion: process.env.DATA_KEY_VERSION || "v1",
  };
}

export function decryptField(payload: { iv: string; ciphertext: string; tag: string }) {
  const decipher = createDecipheriv("aes-256-gcm", getKey(), Buffer.from(payload.iv, "base64"));
  decipher.setAuthTag(Buffer.from(payload.tag, "base64"));
  const plain = Buffer.concat([
    decipher.update(Buffer.from(payload.ciphertext, "base64")),
    decipher.final(),
  ]);
  return plain.toString("utf8");
}

export function randomToken(size = 32) {
  return randomBytes(size).toString("hex");
}
