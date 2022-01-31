//libraries
import { compareSync } from "bcryptjs";
import express from "express";

//database model
import {UserModel} from "../../database/allModels";

const Router = express.Router();

/**
 * Router   /:_id
 * Des      GET specific user based on id
 * Params   id
 * Access   Public
 * Method   GET
 */

Router.get("/:_id",async (req,res)=>{
    try {
        const {_id} = req.params;
        const getUser = await UserModel.findById(_id);

        if(!getUser){
            return res.status(404).json({error:"User not found"});
        }

        return res.status(200).json({user:getUser});
        
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});

/**
 * Router   /update/:_id
 * Des      Update user data
 * Params   _id
 * Access   Public
 * Method   PUT
 */

Router.put("/update/:_id",async (req,res) =>{
    try {
        const {_id} = req.params;

        const {userData} = req.body;

        const updateUserData = await UserModel.findByIdAndUpdate(_id,
            {
                $set:userData
            },{
                new:true
            });
            return res.status(200).json({user:updateUserData})
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

export default Router;