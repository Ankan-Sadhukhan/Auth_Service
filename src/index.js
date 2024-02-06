const express = require('express');
const {PORT} = require('./config/serverConfig')

const apiRoutes = require('./routes/index')
const app = express();

// const {User} = require('./models/index')
// const bcrypt = require('bcrypt')

const bodyParser =require('body-parser');
const prepareAndStartServer = ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api',apiRoutes);
    app.listen(PORT ,async()=>{
        console.log(`Server started on PORT: ${PORT}`)

        // const myPlaintextPassword = '123456';
        // const user = await User.findByPk(4);
        // const response = bcrypt.compareSync(myPlaintextPassword, user.password);
        // console.log(response);
    })
}

prepareAndStartServer();