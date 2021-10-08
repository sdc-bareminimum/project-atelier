const express = require('express')
const router = require('./router.js')
const { Client } = require('pg')

const port = 3000
const app = express()

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
})

client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack))

app.use('/api/reviews/', router)

app.listen(port, () => {
  console.log(`listening on localhost:${port}`)
})
