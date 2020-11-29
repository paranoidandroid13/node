const express = require('express')
const bodyParser = require('body-parser')

const server = express()
const port = 3002

server.use((req, res, next) => {
  console.log(`${new Date()}: ${req.url} ${req.method}`)
  next()
})

server.use(express.static('public'))

server.use(bodyParser.json({ limit: '5mb' }))

server.post('/', (req, res) => {
  res.send(req.body)
  console.log(req.body)
})

server.get('/', (req, res) => {
  res.send('hi')
})

server.get('/json', (req, res) => {
  res.json({ test: 1 })
})

server.get('/:name/:age', (req, res) => {
  res.send(`hi, ${req.params.name} ${req.params.age}`)
  console.log(req.params);
})

server.listen(port, () => {
  console.log('server listeing')
})

console.log(port)