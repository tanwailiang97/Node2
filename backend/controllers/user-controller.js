const createError = require('http-errors');
const User = require('../models/user-models');
const Attendance = require('../models/attendance-models');
const {verifyAccessToken,verifyAccessTokenUser} = require('../helpers/jwt-helper');

module.exports = {
    user: async (req, res, next) => {
        try{
            const accessToken = req.headers['authorization'].split(' ')[1];
            const userId  = await verifyAccessTokenUser(accessToken);
            
            const user = await User.findOne({_id: userId});
            const result = await Attendance.find({username :user.username},{_id: 0,location: 1, date: 1, state:1});
            res.send(result);
        } catch (error) {
            next(error)
        }
    }
    ,
    moderator: async (req, res, next)=> {
        try{
            if (!req.headers['authorization']) return next(createError.Unauthorized())
            const authHeader = req.headers['authorization'];
            const bearerToken = authHeader.split(' ');
            const accessToken = bearerToken[1];
            if (!accessToken) throw createError.BadRequest();
            const userId  = await verifyAccessTokenUser(accessToken);
            const admin = await User.findOne({ _id: userId });
            if (!admin) throw createError.NotFound('Admin not registered');
            if (!admin.roles.includes("admin")) throw createError.Unauthorized('Not an admin');
            const result = await Attendance.find({},{_id: 0, username: 1,location: 1, date: 1, state:1});
            res.send(result);
        } catch (error) {
            next(error)
        }
    }
    ,
    admin: async (req, res, next) => {
        try{
            if (!req.headers['authorization']) return next(createError.Unauthorized())
            const authHeader = req.headers['authorization'];
            const bearerToken = authHeader.split(' ');
            const accessToken = bearerToken[1];
            if (!accessToken) throw createError.BadRequest();
            const userId  = await verifyAccessTokenUser(accessToken);
            const admin = await User.findOne({ _id: userId });
            if (!admin) throw createError.NotFound('Admin not registered');
            if (!admin.roles.includes("admin")) throw createError.Unauthorized('Not an admin');
            const result = await User.find({},{_id: 0, username: 1, roles: 1});
            res.send(result);           
        } catch (error) {
            next(error)
        }
    }
}