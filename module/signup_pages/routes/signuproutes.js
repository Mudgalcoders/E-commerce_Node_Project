import express from "express";
const router = express.Router();
import signUpController from "../controller/signupPageController.js";
import checkUserAuth from "../../../middlewares/auth-middleware.js";

// router.use('/login', checkUserAuth)

router.post('/userlogindetailsregister', signUpController.signUpRegistration)
router.post('/login',signUpController.userlogin)
router.post('/logout',signUpController.logoutuser)


export default router;