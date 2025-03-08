const express = require("express")
const app = express()
const cors = require('cors')
const aiRoutes = require('./routes/ai.routes')


app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send(`<h1> Hello </h1>`);
})

app.use('/ai', aiRoutes);



module.exports = app;
