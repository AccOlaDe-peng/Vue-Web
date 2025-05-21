async function importRsaPublicKey(pem: string): Promise<CryptoKey> {
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = pem
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s/g, "");
  const binaryDer = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  return crypto.subtle.importKey(
    "spki",
    binaryDer.buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256", // ✅ 指定 SHA-256 以匹配后端
    },
    false,
    ["encrypt"]
  );
}

// RSA加密
async function encryptPassword(
  password: string,
  publicKey: CryptoKey
): Promise<string> {
  const encoded = new TextEncoder().encode(password);
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encoded
  );
  return btoa(String.fromCharCode(...new Uint8Array(encrypted))); // base64 编码
}

export { importRsaPublicKey, encryptPassword };
