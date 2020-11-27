let http = require('http')

http.createServer((req, res) => {
  if (req.url === '/start') {
    res.write('Start')
  }
  if (req.url === '/404') {
    res.statusCode = 404
    res.end()
  } else {
    res.write('hello54')
    res.end()
  }
}).listen(3001)