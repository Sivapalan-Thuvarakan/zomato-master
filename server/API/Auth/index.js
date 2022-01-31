//Library
import express from 'express';
import passport from 'passport';

//Models
import {UserModel} from "../../database/allModels";

//validation
import { validateSignin,ValidateSignup} from "../../validation/auth"

//Create a router
const Router = express.Router();

/**
 * Router   /signup
 * Des      Resigter new user
 * Params   none
 * Access   Public
 * Method   Post
 */

Router.post("/signup", async (req,res) => {
    try{

        await ValidateSignup(req.body.credentials);
        //check email and phone number
        await UserModel.findByEmailAndPhone(req.body.credentials);
        //save data to database
        const newUser = await UserModel.create(req.body.credentials);
        //generate token
        const token = await newUser.generateJwtToken();
        return res.status(200).json({token,status:"success"})

    }catch(error){
        return res.status(500).json({error:error.message})
    }
});


/**
 * Router   /signin
 * Des      Sign-in with email and password
 * Params   none
 * Access   Public
 * Method   Post
 */

 Router.post("/signin", async (req,res) => {
    try{
        await validateSignin(req.body.credentials);
        //check username and password
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);
        //generate token
        const token = await user.generateJwtToken();
        return res.status(200).json({token,status:"success"})

    }catch(error){
        return res.status(500).json({error:error.message})
    }
});

// /**
//  * Router   /google
//  * Des      Google Signin
//  * Params   none
//  * Access   Public
//  * Method   Get
//  */
//  Router.get(
//     "/google",
//     passport.authenticate("google", {
//       scope: [
//         "https://www.googleapis.com/auth/userinfo.profile",
//         "https://www.googleapis.com/auth/userinfo.email",
//       ],
//     }),
//   );

// /**
//  * Router   /google/callback
//  * Des      Google Signin callback
//  * Params   none
//  * Access   Public
//  * Method   Get
//  */
// Router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/"}),
//     (req,res) =>{
//         return res.status(200).json({token: req.session.passport.user.token,status:"success"});
//     }
// )




/**
 * Router       /google
 * Des          Google signin
 * Params       none
 * Access       Public
 * Method       GET
 */
 Router.get(
    "/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    })
  );
  
  /**
   * Router       /google/callback
   * Des          Google signin callback
   * Params       none
   * Access       Public
   * Method       GET
   */
  Router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      return res.redirect(
        `http://localhost:4000/google/${req.session.passport.user.token}`
      );
    }
  );
  

export default Router;