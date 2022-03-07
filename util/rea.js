import { JSEncrypt } from './jsencrypt.js'
// import { JSEncrypt } from './encryptlong.js'
// 加密公钥
const key = `

`
 
// 加密
export function rsaEncrypt (msg) {
  const jsencrypt = new JSEncrypt()
  jsencrypt.setPublicKey(key)
  const encryptMsg = jsencrypt.encrypt(msg)
  return encryptMsg
}

//加密长文本
export function rsaEncryptlong (msg) {
  const jsencrypt2 = new JSEncrypt()
  jsencrypt2.setPublicKey(key)
  const encryptMsg2 = jsencrypt2.encryptLong(msg)
  return encryptMsg2
}

// 解密私钥
const privateKey = ``
 
// 解密
export function rsaDecrypt (msg) {
  const decrypt = new JSEncrypt()
  decrypt.setPrivateKey(privateKey)
  const decryptMsg = decrypt.decrypt(msg)
  return decryptMsg
}

export function rsaDecryptLong (msg) {
  const decrypt2 = new JSEncrypt()
  decrypt2.setPrivateKey(privateKey)
  const decryptMsg2 = decrypt2.decryptLong(msg)
  return decryptMsg2
}
