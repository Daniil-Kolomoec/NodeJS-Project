const express = require('express')
const moment = require('moment');

const app = express()

const path = require('path')
const fs = require('fs')

const PORT = 8001

const postsPath = path.join(__dirname, "posts.json")

const posts = JSON.parse(fs.readFileSync(postsPath, 'UTF-8'))

// function getCurrentDay() {
//   console.log(moment().format('dddd'))
// }

// function getCurrentMonth() {
//   console.log(moment().format('MMMM'))
// }


// function getCurrentYear()
//   console.log(moment().format('YYYY'))
// }


function getDate() {
  return moment().format('YYYY/DD/MM HH:mm:ss')
}

app.get('/timestamp', (req, res) => {
  res.json({ timestamp: getDate() })
})

app.get('/posts', (req, res) => {
    res.status(200).json(posts)
})

// getCurrentDay()
// getCurrentMonth()
// getCurrentYear()
// getDate()

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:8001")
})