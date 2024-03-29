//const { response } = require('express');
const UserService = require('../services/user-service');

const userService = new UserService();

const create = async(req,res)=>{
    try {
        const response = await userService.create({
            email:req.body.email,
            password:req.body.password
        })
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

const signIn = async(req,res) =>{
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            message:"Successfully signed in",
            data: response,
            success:true,
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

const isAuthenticated= async(req,res)=>{
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticate(token);
        return res.status(200).json({
            success:true,
            data:response,
            message:'user is authenticated and token is valid',
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

const isAdmin =async(req,res)=>{
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:'Successfully fetched whether user is admin or not',
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

module.exports ={
    create,
    signIn,
    isAuthenticated,
    isAdmin
}