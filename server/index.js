const express = require('express')
const cors = require('cors')
const app = express()
const connecttomongo = require('./db')
const port = 3001

connecttomongo()

app.use(cors())

app.use(express.json())

//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
  
app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`)
})