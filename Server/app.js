const express = require('express')
const generations = require('./routes/generation') 
const suplimax = require('./routes/suplimax') 
const app = express();
app.use(express.json())
app.use('/api/generations', generations)
app.use('/api/suplimax', suplimax )

app.get('/', (req, res)=>{
    res.send('Home Address')
})


module.exports = app;