const express = require('express')
const router = express.Router()
const db = require('./helpers.js')

router.get('/', (req, res) => {
  db.fetchReviews(req.query, (err, data) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(data)
  })
})

router.post('/', (req, res) => {
  db.addReview(req, (err, data) => {
    if (err) {
      res.status(400).send(err)
    }
    console.log(req)
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
