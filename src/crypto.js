import CryptoJS from "crypto-js"

//设置密钥：16位16进制数
const SECRET_KEY = CryptoJS.enc.Utf8.parse('1234123412341234')

//设置密钥偏移量：16位16进制数
const SECRET_IV = CryptoJS.enc.Utf8.parse('1234123412341234')

//加密
export function encrypt(data) {
    if (typeof data == 'object') {
        try {
            data = JSON.stringify(data)
        } catch (error) {
            console.log('encrypt error :', error)
        }
    }

    const dataHex = CryptoJS.enc.Utf8.parse(data)
    const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })

    return encrypted.ciphertext.toString()
}

//解密
function decrypt(data) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
}

export default {
    encrypt,
    decrypt
}