const {User} = require('../models/index');

class UserRepository{

    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log('something went wrong in repository layer')
            throw error;
        }
    }

    async getUserById(userId){
        try {
            const user = await User.findByPk(userId,
                {attributes:['email','id']})
            return user;
        } catch (error) {
            console.log('something went wrong in repository layer')
            throw error;
        }
    }

    async getUserByEmail(userEmail){
        try {
            const response = await User.findOne({
                where:{
                    email:userEmail
                }
            })
            return response;
        } catch (error) {
            console.log('something went wrong in repository layer')
            throw error;
        }
    }
}

module.exports = UserRepository;