require('dotenv').config()
const {Base64} = require('js-base64')

const authId = Base64.encode(process.env.API_CONSUMER_ID)
const authSec = Base64.encode(process.env.API_CONSUMER_SECRET)

const Authorization = `${authId}:${authSec}`
console.log(Authorization)

