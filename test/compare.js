require('dotenv').config()
const { Base64 } = require('js-base64')

const kbUser = process.env.KBUSER // kasikornbankuser
const kbPass = process.env.KBPASS // kasikornbankpassword

const kbU64 = process.env.KBU64 // a2FzaWtvcm5iYW5rdXNlcg==
const kbP64 = process.env.KBP64 // a2FzaWtvcm5iYW5rcGFzc3dvcmQ=

const kbKey = process.env.KBUP64 // YTJGemFXdHZjbTVpWVc1cmRYTmxjZz09OmEyRnphV3R2Y201aVlXNXJjR0Z6YzNkdmNtUT0=

console.log(kbUser, (Base64.encode(kbUser) === kbU64))
console.log(kbPass, (Base64.encode(kbPass) === kbP64))
console.log('Auth Key', (kbKey === Base64.encode(`${Base64.encode(kbUser)}:${Base64.encode(kbPass)}`)))

Base64.extendString()

const dec64 = kbKey.fromBase64().split(':')
console.log('Check base64 username', (dec64[0] === kbU64))
console.log('Check base64 password', (dec64[1] === kbP64))

console.log('Check clear username', dec64[0].fromBase64())
console.log('Check clear password', dec64[1].fromBase64())
