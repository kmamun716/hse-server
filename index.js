const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const port = process.env.PORT || 4000;

//external routes
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/post', require('./routes/postRoutes'));


app.get('/', (req, res)=>{
    res.send('HSE Server is running')
})


app.listen(port, ()=>{
    console.log(`server is running at port ${port}`)
} )