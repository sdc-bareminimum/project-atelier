const express = require('express')
const db = require('./helpers.js')
const router = express.Router()

router.get('/api/reviews/', (req, res) => {
  db.fetchReviews((err, data) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(data)
  })
})

router.post('/api/reviews', (req, res) => {
  db.addReview(req.body.data, (err, data) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(data)
  })
})

router.get('/api/reviews/meta', (req, res) => {

})

router.put('/api/reviews/:review_id/helpful', (req, res) => {

})

router.put('/api/reviews/:review_id/report', (req, res) => {

})

module.exports = router
