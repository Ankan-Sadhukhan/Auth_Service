const express = require('express');
const {PORT} = require('./config/serverConfig')

const apiRoutes = require('./routes/index')
const app = express();

const bodyParser =require('body-parser');
const prepareAndStartServer = ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api',apiRoutes);
    app.listen(PORT ,async()=>{
        console.log(`Server started on PORT: ${PORT}`)
    })
}

prepareAndStartServer();