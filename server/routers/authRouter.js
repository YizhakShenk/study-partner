const authRouter = require('express').Router();
const {logIn,auth,forgetPassword,resetPassword} = require('../controllers/authController')



authRouter.post('/',auth);       
authRouter.post('/log-in',logIn);
authRouter.post('/forget-pass',forgetPassword);
authRouter.post('/reset-pass',resetPassword);

//log out router needed

module.exports = authRouter; 

