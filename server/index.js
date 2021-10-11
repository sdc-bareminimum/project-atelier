const express = require('express')
const router = require('./router.js')

const port = 3030
const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.use('/api/reviews', router)

app.listen(port, () => {
  console.log(`listening on localhost:${port}`)
})
