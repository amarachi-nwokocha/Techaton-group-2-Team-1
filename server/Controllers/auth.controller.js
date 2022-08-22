const { hashSync, compareSync } = require("bcryptjs");
const jwt = require('jsonwebtoken')
const emailValidator = require('email-validator')
const UserModel = require('../Models/users.model');
const {buildResponse, buildUser}= require('../Utils/index.utils')
const {APIError} = require('../Utils/apiError')


exports.signUp = async (req, res, next) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    if (!email || !password || !firstname || !lastname ) {
      return next(
        APIError.badRequest(
            `Field(s) missing. Please try again`
        )
      )
    }
    const validEmail = emailValidator.validate(email)
    if(!validEmail){
      return next(
        APIError.customError(
          `Invalid email format, your email should be in the form xxxx@xxxx.xxxx`,
          400
        )
      );
    }
   
    const oldAccount = await UserModel.findOne({ email });
    if (oldAccount) {
      return next(
        APIError.customError(
          `An Account with the email ${email} already exist...`,
          409
        )
      );
    }
    const hashPassword = hashSync(password, 12);
    const newUser = await UserModel.create({
      firstname,
      lastname,
      password: hashPassword,
      email
    });
    const data = buildUser(newUser.toObject());
    res
      .status(201)
      .json(buildResponse("Account Created Successfully", data, "account"));
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
    try {
      console.log(req.cookies)
      const { email, password } = req.body;
      if (!email || !password) {
        return next(
          APIError.badRequest(
              `Field(s) missing. Please enter your email and password`
          )
        )
      }
      const user = await UserModel.findOne({ email });
      if (!user) {
        return next(
          APIError.notFound("Sorry, No Account with the email supplied")
        );
      }
      const validPassword = compareSync(password, user.password);
      if (!validPassword) {
        return next(
          APIError.customError("Sorry, Invalid password for this user", 400)
        );
      }
      //creating JWTs - AccessToken and RefreshToken
      const accessSecret = `${process.env.JWT_SECRET_TOKEN}`
      const refreshSecret = `${process.env.JWT_REFRESH_TOKEN}`
      const payload = { id: user._id}
  
      const token = jwt.sign(payload, accessSecret, { expiresIn: "20s" })
      const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: "1d" })
  
      user.refreshToken = refreshToken
      await user.save()
  
      //set cookie
      res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
      const data = buildUser(user.toObject());
      res
        .status(200)
        .json(
          buildResponse("Account Logged-in successfully", data, "user", { token })
        );
    } catch (err) {
      next(err);
    }
  };
  
  exports.refreshToken = async (req, res, next) => {
    try {
      const cookies = req.cookies
      if(!cookies?.jwt) {
        return next (APIError.unauthenticated(`You need to login`))
      }
     
      const refreshToken = cookies.jwt
      const user = await UserModel.findOne({ refreshToken });
  
      if(!user) {
        return next (APIError.customError(`Forbidden`, 403))
      }
    const verifyRefreshToken = await jwt.verify (refreshToken,  `${process.env.JWT_REFRESH_TOKEN}`)
    if(!verifyRefreshToken) return next (APIError.customError(`Forbidden`, 403))
    const payload = { id: user._id, role: user.role }
    const accessSecret = `${process.env.JWT_SECRET_TOKEN}`
    const token = jwt.sign (payload, accessSecret, { expiresIn: "20s" })
    res.json({token})
  
    } 
    
    catch (err) {
      next(err);
    }
  };
  
  exports.logout = async (req, res, next) => {
    // On client, also delete the token
    try {
      const cookies = req.cookies
      if(!cookies?.jwt) {
        return next (APIError.customError(`No content, success`, 204))
      }
      const refreshToken = cookies.jwt
      const user = await UserModel.findOne({ refreshToken });
  
      if(!user) {
        res.clearCookie('jwt', {httpOnly: true , maxAge: 24*60*60*1000})
        return res.sendStatus(204)
      }
      //Delete refreshToken
      user.refreshToken = ''
      await user.save();
      res.clearCookie('jwt', {httpOnly: true, maxAge: 24*60*60*1000})
      res.status(200).json({msg: `You have successfully logged out `})
    
    } catch (err) {
      next(err);
    }
  };
  