const express = require("express")
require('dotenv').config();
const cors = require('cors');
const dbConnection = require("./config/dbConnection");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
    origin: 'http://localhost:5500',
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 3000;

app.use('/api/v1', userRoutes)

app.get('/', (req, res)=>{
    res.send("Checking server")
})

app.listen(PORT, async()=>{
    await dbConnection();
    console.log(`This app is running on http://localhost:${PORT}`)
})