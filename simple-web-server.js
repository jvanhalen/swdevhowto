// Include external express library to your project
const express = require('express')

// create expressjs application
const app = express()

// select application port
const port = 3000

// Respond to the client HTTP request at 
// server root (/) address http://localhost:3000/
app.get('/', (req, res) => {
  res.send('Hello all ye coders out there!')
})

app.get('/swdevhowto', (req, res) => {
  res.send('The project source code is available at https://github.com/jvanhalen/swdevhowto')
})

app.listen(port, () => {
  console.log(`My web server is listening at http://127.0.0.1:${port}`)
})