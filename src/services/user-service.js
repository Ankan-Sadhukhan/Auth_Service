const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/serverConfig')
const bcrypt = require('bcrypt');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }


    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async createToken(user){
        try {
            const token = jwt.sign(user,JWT_KEY,{
                expiresIn:'1h'
            })
            return token;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    async verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token verification");
            throw error;
        }
    }

    async checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            const result = bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
            return result;
        } catch (error) {
            console.log("Something went wrong in password comparison")
            throw error;
        }
    }
}

module.exports = UserService;