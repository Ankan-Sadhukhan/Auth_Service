const express = require('express');
const {PORT} = require('./config/serverConfig')

const apiRoutes = require('./routes/index')
const app = express();

const {User,Role} =require('./models/index')
//const UserRepository = require('./repository/user-repository')
// const UserService = require('./services/user-service')
// const {User} = require('./models/index')
// const bcrypt = require('bcrypt')


const bodyParser =require('body-parser');
const UserService = require('./services/user-service');
const prepareAndStartServer = ()=>{

    // const userRepository = new UserRepository();
    const userService = new UserService();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api',apiRoutes);
    app.listen(PORT ,async()=>{
        console.log(`Server started on PORT: ${PORT}`)

        // if(process.env.DB_SYNC) {
        //     db.sequelize.sync({alter: true});
        // }
        // const u1 = await User.findByPk(1);
        // const r1 = await Role.findByPk(2);

        // const res = await u1.hasRole(r1);
        // console.log(res);

        // const newToken = userService.createToken({
        //     email:'ankan@gmail.com',id:1
        // })
        // console.log(newToken);

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFua2FuQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE3MDcyMzEwMzUsImV4cCI6MTcwNzIzNDYzNX0.jN0Gk8xToYk5zVZwiHsyNcQVsauWRHBFr23CQBHEFuo'
        // const res = userService.verifyToken(token);
        // console.log(res);
    })
}

prepareAndStartServer();