const { Client } = require('pg')

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

const sorter = (type) => {
  return type === 'helpful'
    ? 'helpfulness DESC'
    : type === 'newest'
      ? 'date DESC'
      : 'date DESC, helpfulness DESC'
}

const fetchReviews = (params, callback) => {
  let {
    page,
    count,
    sort,
    product_id,
  } = params

  let str = `
    SELECT id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness
    FROM reviews
    WHERE product_id = ${product_id}
    ORDER BY ${sort ? sorter(sort) : sorter('relevant')}
    LIMIT ${count ? count : 5}
    OFFSET ${page > 1 && count ? (page - 1) * count : 0};
  `

  client.query(str)
    .then((results) => callback(null, results.rows))
    .catch((err) => callback(err))
    .then(() => client.end())
}

const addReview = (data, callback) => {
  let {
    id,
    product_id,
    rating,
    date,
    summary,
    body,
    recommend,
    reported,
    reviewer_name,
    reviewer_email,
    response,
    helpfulness,
  } = data

  client.query(`INSERT INTO reviews VALUES (${{
    id,
    product_id,
    rating,
    date,
    summary,
    body,
    recommend,
    reported,
    reviewer_name,
    reviewer_email,
    response,
    helpfulness
  }})`)
    .then((results) => callback(null, results))
    .catch((err) => callback(err))
    .then(() => client.end())
}

module.exports = {
  fetchReviews,
  addReview
}