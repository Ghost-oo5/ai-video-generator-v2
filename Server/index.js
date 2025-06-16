const app = require('./app')
const connectDB = require('./startup/db')
connectDB();

const port = 3002;
app.listen(port, ()=>{
    console.log(`Server listening at port ${port}`)
})