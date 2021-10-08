const express = require('express')
const router = require('./router.js')

const port = 3000
const app = express()

app.use('/api/reviews/', router)

app.listen(port, () => {
  console.log(`listening on localhost:${port}`)
})
