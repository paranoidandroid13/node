const express = require('express')

const server = express()

const port = 3002

server.get('/', (req, res) => {
  return res.send('hi')
})

server.get('/name/:name', (req, res) => {
  res.send(`hi, ${req.params.name}`)
})

server.listen(port, () => {
  console.log('server listeing')
})

console.log(port)