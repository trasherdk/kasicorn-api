/* eslint-disable comma-dangle */
require('dotenv').config()
const { Base64 } = require('js-base64')
const https = require('https')

const run = async (user, pass) => {
  const data = JSON.stringify({
    grant_type: 'client_credentials'
  })

  const u64 = Base64.encode(user)
  const p64 = Base64.encode(pass)
  const k64 = Base64.encode(`${u64}:${p64}`)

  Base64.extendString()

  const dec64 = k64.fromBase64().split(':')
  console.log('Check username', (dec64[0] === u64))
  console.log('Check password', (dec64[1] === p64))

  if (dec64[0] !== u64 || dec64[1] !== p64) return false

  const options = {
    hostname: process.env.API_HOST,
    port: process.env.API_PORT,
    path: process.env.API_PATH,
    method: 'POST',
    headers: {
      Authorization: `Basic ${k64}`,
      // 'x-test-mode': 'true',
      // 'env-id': 'OAUTH2'
      // 'Content-Type': 'application/json',
      // 'Content-Length': data.length
    }
  }

  console.log(options)

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    res.on('data', d => {
      console.log('onData')
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.log('onError')
    console.error(error.statusCode)
    console.log(error.message)
  })

  req.write(data)
  req.end()
}

const authId = process.env.API_BASIC_ID
const authSec = process.env.API_BASIC_SECRET

run(authId, authSec)
run(process.env.KBUSER, process.env.KBPASS)
