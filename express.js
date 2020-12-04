import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import axios from 'axios'
// import { useParams } from "react-router-dom";
const { readFile, writeFile } = require("fs").promises;

const server = express()
const port = 3001

// server.use((req, res, next) => {
//   console.log(`${new Date()}: ${req.url} ${req.method}`)
//   next()
// })

// server.use(express.static('public'))

// server.use(bodyParser.json({ limit: '50mb' }))

const setHeader = (req, res, next) => {
  res.set('test-header-1', 'value1')
  res.set('test-header-2', 'value2')
  next()
}

const middleware = [
  cors(),
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  }),
  bodyParser.json({
    limit: "50mb",
    extended: true
  }),
  cookieParser(),
  setHeader
];

middleware.forEach((func) => server.use(func))

server.use('/404', (req, res) => {
  res.status(404)
  res.end()
})

server.get('/fun', (req, res) => {
  res.json({'you': 'stupid'})
})

// const getUsers = () => {
//   axios("https://jsonplaceholder.typicode.com/users");
// }

const fileExist = () => {
  const bigData = readFile(`${__dirname}/users.json`, { encoding: "utf8" })
  .then((file) => {
    return JSON.parse(file);
  })
  .catch(async () => {
    const users = await axios("https://jsonplaceholder.typicode.com/users");
    writeFile(`${__dirname}/users.json`, JSON.stringify(users.data), {
      encoding: "utf8",
    });
    return users.data;
  });
  return bigData
}

server.get("/api/v1/users", async (req, res) => {
  const newData = await fileExist()
  res.json(newData);
});

server.post('/api/v1/users', async(req, res) => {
  const newUser = req.body
  const userData = await fileExist()
  const newUserWithId = { ...newUser, id: (typeof userData[0] === 'undefined') ? 1 : userData[userData.length - 1].id + 1}

  writeFile(`${__dirname}/users.json`, JSON.stringify([ ...userData, newUserWithId]), { encoding: 'utf8' })
  res.json({ status: "success", id: newUserWithId.id });
})

// server.patch('/api/v1/users/:userId', (req, res) => {
//   // const { userId } = useParams()
//   // console.log(userId)
// })

// -----------

// server.get('/api/v1/users', async(req, res) => {
//   const data = await axios("https://jsonplaceholder.typicode.com/users").then((res) => res.data);
//   res.json(data)
// })

// server.post('/', (req, res) => {
//   res.send(req.body)
//   console.log(req.body)
// })

// server.get('/', (req, res) => {
//   res.send('hi')
// })

// server.get('/json', (req, res) => {
//   res.json({ test: 1 })
// })

// server.get('/:name/:age', (req, res) => {
//   res.send(`hi, ${req.params.name} ${req.params.age}`)
//   console.log(req.params);
// })

server.listen(port, () => {
  console.log('server listeing')
})
