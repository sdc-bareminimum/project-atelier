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
  db.addReview(req.body, (err, data) => {
    if (err) {
      console.log(err)
      res.status(400).send(err)
    }
    res.status(201).send(data)
  })
})

router.get('/meta', (req, res) => {
  db.fetchMetadata(req.query, (err, data) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(data)
  })
})

router.put('/:review_id/helpful', (req, res) => {
  db.setHelpful(req.params, (err, data) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(204).send(data)
  })
})

router.put('/:review_id/report', (req, res) => {
  db.setReport(req.params, (err, data) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(204).send(data)
  })
})

module.exports = router
