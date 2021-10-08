const express = require('express')
const fs = require('fs')
const csv = require('csv-parser')

const port = 3000
const app = express()

app.listen(port, () => {
  console.log(`listening on localhost:${port}`)
})

const transformCSVLine = (line) => {
  const columns = line.split(',')

  // const convertDates = (value) => {
  //   if (typeof value === "number" && value.length === 13) {
  //     return new Date(value).toISOString()
  //   }
  //   return value
  // }

  const formattedCols = columns.map((value) => {
    let formatted = value
    // formatted = convertDates(value)
    return formatted
  })

  return `${formattedCols.join(',')}\n`
}

fs.readdir('./data/raw/', (err, files) => {
  files.forEach(file => {
    const writestream = fs.createWriteStream(`./data/clean/${file}`)

    const lineReader = require('readline').createInterface({
      input: fs.createReadStream(`./data/raw/${file}`),
    })
    writestream.on('open', () => {
      lineReader.on('line', (line) => {
        writestream.write(transformCSVLine(line))
      })
        .on('close', () => {
          console.log(`Created: ./data/clean/${file}`)
        })
    })
  })
});
