//Libraries
import express, { json } from 'express';

//Database model
import {FoodModel} from '../../database/allModels';

//validation
import {validateCategory,validateId} from "../../validation/common";

const Router = express.Router();

/**
 * Router   /r
 * Des      GET all the food pased on particular restaurant
 * Params   none
 * Access   Public
 * Method   GET
 */

Router.get("/r/:_id",async(req,res)=>{
    try {

        await validateId(req.params);
        const {_id} = req.params;
        const foods = await FoodModel.find({restaurant:_id});

        return res.json({foods});
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})

/**
 * Router   /c
 * Des      GET all the food pased on particular category
 * Params   none
 * Access   Public
 * Method   GET
 */
Router.get('/c/:category',async (req,res) =>{
    try {
        await validateCategory(req.params);
        const {category} = req.params;

        const foods = await FoodModel.find({
            category:{$regex:category,$options:"i"},
        });

        if(!foods)
        return res.status(404).json({error:`No Foods match with ${category}`});

        return res.json({foods});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})
export default Router;