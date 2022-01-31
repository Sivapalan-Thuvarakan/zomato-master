//Libraries
import { compareSync } from 'bcryptjs';
import express from 'express';
import { modelNames } from 'mongoose';

//Database model
import {MenuModel,ImageModel} from "../../database/allModels";

const Router = express.Router();


/**
 * Router   /list
 * Des      GET all List menu based on restaurant id
 * Params   _id
 * Access   Public
 * Method   GET
 */

Router.get("/list/:_id",async (req,res) =>{
    try {
        const {_id} = req.params;
        const menu = await MenuModel.findById(_id);

        if(!menu)
        {
            return res.status(404).json({error:"No menu present for this restaurant"});
        }

        return res.json({menu});
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})

/**
 * Router   /images
 * Des      GET all List menu images based on restaurant id
 * Params   _id
 * Access   Public
 * Method   GET
 */

Router.get("/images/:_id",async(req,res)=>{
    try {
        const {_id} = res.params;
        const menuImages = await ImageModel.findById(_id);
        //TODO:validate if images are present or not,throw error if not are present
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})


export default Router;