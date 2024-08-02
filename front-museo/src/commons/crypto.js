import CryptoJS from 'crypto-js';

const secretKey = CryptoJS.enc.Utf8.parse((process.env.REACT_APP_SECRET_KEY).toString());
export const encrypt = (data) => {
  const iv = CryptoJS.lib.WordArray.random(16); // Genera un IV de 16 bytes
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  // Concatenar el IV con los datos cifrados
  return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.toString();
};

export const decrypt = (ciphertext) => {
  // Separar el IV de los datos cifrados
  const [ivHex, encryptedData] = ciphertext.split(':');
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};