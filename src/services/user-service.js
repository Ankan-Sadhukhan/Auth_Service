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

    createToken(user){
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

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token verification");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            const result = bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
            return result;
        } catch (error) {
            console.log("Something went wrong in password comparison")
            throw error;
        }
    }

    async signIn(email, plainPassword){
        try {
            //fetch the user by email
            const user = await this.userRepository.getUserByEmail(email);

            //match the stored password with incomming password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordsMatch){
                console.log("Password doesn't match")
                throw {error: "Incorrect Password"}
            }

            // step 3-> if passwords match then create a token and send it to the user
            const newJWT = this.createToken({email:user.email, id:user.id})
            return newJWT;
        } catch (error) {
            console.log("something went wrong in sign In")
            throw error;
        }
    }

    async isAuthenticate(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error:'Invalid Token'}
            }
            const user = await this.userRepository.getUserById(response.id);

            if(!user){
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    } 

    async isAdmin(userId){
        try {
            const response = await this.userRepository.isAdmin(userId);
            return response;
        } catch (error) {
            console.log("Something went wrong in service");
            throw error;
        }
    }
}

module.exports = UserService;