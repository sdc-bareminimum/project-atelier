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

  // missing photos
  let select = `
    SELECT id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness
    FROM reviews
    WHERE product_id = ${product_id}
    ORDER BY ${sort ? sorter(sort) : sorter('relevant')}
    LIMIT ${count ? count : 5}
    OFFSET ${page > 1 && count ? (page - 1) * count : 0};
  `

  client.query(select)
    .then((results) => callback(null, results.rows))
    .catch((err) => callback(err))
}

const addReview = (data, callback) => {
  let {
    product_id,
    rating,
    summary,
    body,
    recommend,
    reviewer_name,
    reviewer_email,
  } = data

  // missing photos & characteristics
  let insert = `
    INSERT INTO reviews (
      product_id,
      rating,
      summary,
      body,
      recommend,
      reviewer_name,
      reviewer_email
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id;
  `

  client.query(insert, [
    product_id,
    rating,
    summary,
    body,
    recommend,
    reviewer_name,
    reviewer_email
  ])
    .then((results) => callback(null, results.rows))
    .catch((err) => callback(err))
}

module.exports = {
  fetchReviews,
  addReview
}