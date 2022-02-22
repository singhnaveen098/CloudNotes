const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const connecttomongo = require('./db')
const port = process.env.PORT

connecttomongo()

app.use(cors())

app.use(express.json())

app.use(express.static(path.resolve(__dirname, '../build')));

//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
    console.log(`CloudNote backend listening at http://localhost:${port}`)
})
