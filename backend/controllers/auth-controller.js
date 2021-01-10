const createError = require('http-errors')
const User = require('../models/user-models')
const { authSchema, authRegisterSchema } = require('../helpers/validation-schema')
const {
  signAccessToken,
  signRefreshToken,
  verifyAccessTokenUser,
  verifyRefreshToken,
} = require('../helpers/jwt-helper')
const client = require('../helpers/init-redis')

module.exports = {
  register: async (req, res, next) => {
    try {
      // const { email, password } = req.body
      // if (!email || !password) throw createError.BadRequest()
      const result = await authRegisterSchema.validateAsync(req.body)
  
      const doesExist = await User.findOne({ email: result.email })
      if (doesExist)
        throw createError.Conflict(`${result.email} is already been registered`)

      const doesExist1 = await User.findOne({ username: result.username })
      if (doesExist1)
        throw createError.Conflict(`${result.username} is already been registered`)
      result.roles = " ";
      const user = new User(result)
      const savedUser = await user.save()
      const accessToken = await signAccessToken(savedUser.id)
      const refreshToken = await signRefreshToken(savedUser.id)

      console.log(`${result.email} have been registered`);
      res.send({ accessToken, refreshToken })
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },
  changeRole: async (req, res, next) => {
    try {
      if (!req.headers['authorization']) return next(createError.Unauthorized())
      const authHeader = req.headers['authorization'];
      const bearerToken = authHeader.split(' ');
      const accessToken = bearerToken[1];
      const { username,roles } = req.body;
      if (!accessToken) throw createError.BadRequest();
      const userId  = await verifyAccessTokenUser(accessToken);
      const admin = await User.findOne({ _id: userId });
      if (!admin) throw createError.NotFound('Admin not registered');
      if (!admin.roles.includes("admin")) throw createError.Unauthorized('Not an admin');
      const user = await User.findOne({ username: username });
      if (!user) throw createError.NotFound('User not registered');
      user.roles = roles;
      user.save();
      console.log(user.username," roles have been changed to " , roles)
      res.send(user.username + " roles have been changed");
    } catch (error) {
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body)
      const user = await User.findOne({ username: result.username })
      if (!user) throw createError.NotFound('User not registered')
      const isMatch = await user.isValidPassword(result.password)
      if (!isMatch)
        throw createError.Unauthorized('Username/password not valid')

      const accessToken = await signAccessToken(user.id)
      const refreshToken = await signRefreshToken(user.id)

      console.log(`${result.username} have Logged In`);
      res.send({ 
        accessToken, 
        refreshToken,
        username: user.username,
        roles: user.roles
      });
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username/Password'))
      next(error)
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)

      const accessToken = await signAccessToken(userId)
      const refToken = await signRefreshToken(userId)
      res.send({ accessToken: accessToken, refreshToken: refToken })
    } catch (error) {
      next(error)
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)
      client.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message)
          throw createError.InternalServerError()
        }
//        console.log(val)
        console.log( userId + " logged out")
        res.sendStatus(204)
      })
    } catch (error) {
      next(error)
    }
  },
}
