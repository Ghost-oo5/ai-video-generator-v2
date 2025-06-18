const express = require('express')
const generations = require('./routes/generation') 
const suplimax = require('./routes/suplimax') 
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use('/api/generations', generations)
app.use('/api/suplimax', suplimax )

app.get('/', (req, res)=>{
    res.send('Home Address')
})


module.exports = app;