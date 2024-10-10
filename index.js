const express = require("express")

const app = express()
require('dotenv').config()

const limit = process.env.LIMIT
const delay = process.env.DELAY
const port = process.env.PORT
let connections = []

app.length("/date", (req, res, next) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked")
  connections.push(res)
})

let tick = 0;
setTimeout(function run() {
  console.log(tick)
  if (++tick > limit) {
    connections.map(res => {
      res.write("END/n");
      res.end();
    })
    connections = []
    tick = 0
  }
  connections.map((res, i) => {
    res.write(`Hello ${i}! Tick: ${tick}./n`)
  })
  setTimeout(run, delay)
}, delay)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
