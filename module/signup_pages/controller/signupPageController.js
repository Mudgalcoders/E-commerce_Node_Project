import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from "../../../models/index.js";
import path from 'path';
const userlogindetails = db.signupModel

class signUpController {
  static signUpRegistration = async(req, res)=> {
    const { Name, Email, password, cPassword} = req.body
    console.log(req.body,"signUpRegistration");
    
    const userlogindetailsFind = await userlogindetails.findOne({ where: { userEmail: req.body.Email, isDeleted: false } });
    if (userlogindetailsFind) {
        res.send({ "status": "failed", "message": "Email already exists" });
    }else{
        if (Name && Email && password && cPassword) {
            if (password === cPassword) {
                try {
                  const salt = await bcrypt.genSalt(10)
                 const hashPassword = await bcrypt.hash(password, salt)
                 const createuserlogindetails = await userlogindetails.create({
                    userName: Name,
                    userEmail: Email,
                    userPassword: hashPassword,
                 })
                 if (!createuserlogindetails || !createuserlogindetails.id) {
                    return res.status(500).send({ "status": "failed", "message": "Failed to create user" });
                }
                const token = jwt.sign({ UserId: createuserlogindetails.id }, process.env.JWT_SECRET, { expiresIn: '5d' });
                        res.cookie('token', token, {
                            httpOnly: true,      // HTTP-only, cannot be accessed via JavaScript
                            secure: true,        // Ensure cookie is sent over HTTPS
                            sameSite: 'strict',  // Helps mitigate CSRF attacks
                            maxAge: 24 * 60 * 60 * 1000 // Cookie expiry in 1 day
                        });
    
                        res.send({ "status": "success", "message": "Registration successful!", "token": token, "userlogindetails": createuserlogindetails });
                } catch (error) {
                    console.log(error);
                    res.send({ "status": "failed", "message": "Unable to Register" });
                }
            }else{
                res.send({ "status": "failed", "message": "Password and Confirm Password don't match!"});
            }
        }else{
            res.send({ "status": "failed", "message": "All Fields Are Required"});
        }
    }

  }

  static userlogin = async (req, resp) =>{
    try {
        const {Email, password} = req.body
        if(Email && password){
         const getUser =  await userlogindetails.findOne({ where: {userEmail : Email}})
         if (getUser) {
          const passwordmatch  = await bcrypt.compare(password, getUser.userPassword)
          if ((getUser.userEmail === Email) && passwordmatch) {
            const token = jwt.sign({ UserId: getUser.id }, process.env.JWT_SECRET, { expiresIn: '5d' })

            resp.cookie('token', token, {
                            httpOnly: true,      // HTTP-only, cannot be accessed via JavaScript
                            secure: true,        // Ensure cookie is sent over HTTPS
                            sameSite: 'strict',  // Helps mitigate CSRF attacks
                            maxAge: 24 * 60 * 60 * 1000 // Cookie expiry in 1 day
                        });
                        resp.send({ "status": "success", "message": "Login Success", "token": token, "userDetail": getUser })
          }else{
            resp.send({"status": "failed", "message": "Password or Email Does not Match"})
          }
         }else{
            resp.send({"status": "failed", "message": "You are not Registered Register"})
         }
         
        }else{
            resp.send({ "status": "failed", "message": "All Fields Are Required" })
        }
        
    } catch (error) {
        console.log(error)
        res.send({ "status": "failed", "message": "Unable To Login" })
    }
  } 

  static logoutuser = async (req, resp) =>{
  const logout =  await resp.clearCookie('token',{path:'/'})
    if(logout){
        resp.send({"status":"success", "message":"Logout successfully"})
    }else{
        resp.send({"status":"failed","message":"Logout failed"})
    }
  }

}

export default signUpController

