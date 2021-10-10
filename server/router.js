const express = require('express')
const router = express.Router()
const db = require('./helpers.js')

router.use(express.json())

router.get('/', (req, res) => {
  db.fetchReviews(req.query, (err, data) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(data)
  })
})

router.post('/', (req, res) => {
  console.log(req.body)
  db.addReview(req.body, (err, data) => {
    if (err) {
      console.log(err)
      res.status(400).send(err)
    }
    console.log(data)
    res.status(201).send(data)
  })
})

router.get('/meta', (req, res) => {

})

router.put('/:review_id/helpful', (req, res) => {

})

router.put('/:review_id/report', (req, res) => {

})

module.exports = router
