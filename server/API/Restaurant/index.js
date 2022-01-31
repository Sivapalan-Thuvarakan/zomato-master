//Libraries
import express from 'express';

//Database model
import {RestaurantModel} from '../../database/allModels';

//validation
import {validateId} from "../../validation/common";
import {ValidateRestaurantCity,validateRestaurantSearchString} from "../../validation/restaurant";

const Router = express.Router();

/**
 * Router   /
 * Des      GET all the restaurant details based on the city 
 * Params   none
 * Access   Public
 * Method   GET
 */
Router.get("/",async(req,res)=>{
    try{
        //http://localhost:4000/restaurent/?city=jaffna
        await ValidateRestaurantCity(req.params);
        const {city} = req.query;
        const restaurants = await RestaurantModel.find({city});
        if(restaurants.length === 0){
            return res.status(400).json({error:"No restaurants Found in this city"})
        }
        return res.json({restaurants});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
})


/**
 * Router   /:_id
 * Des      GET individual restaurants details based on id
 * Params   none
 * Access   Public
 * Method   GET
 */
//http:localhost:4000/restaurant/122323334
Router.get("/:_id",async(req,res)=>{
    try{
        await validateId(req.params);
        const {_id} = req.params;
        const restaurant = await RestaurantModel.findById(_id);

        if(!restaurant){
            return res.status(400).json({error:"Restaurent is not found"});
        }
        return res.status(500).json({restaurant});
    }catch(error){
        return res.status(500).json({error:error.message})
    }
})

/**
 * Router   /search
 * Des      GET  restaurants details based on search string
 * Params   none
 * Access   Public
 * Method   GET
 */
Router.get("/search/:searchString",async (res,req) => {
    /**
     * searchString = Ra
     * results={
     *     RajHotel
     *     Ranjith Hotel
     * }
     */
    try {
        await validateRestaurantSearchString(req.params)
        const { searchString } = req.params;
        const restaurant = await RestaurantModel.find({
            name:{$regex:searchString,$options:"i"},
        });

        if(!restaurant)
         return res.status(404).json({error:`No Restaurants match with ${restaurant}`})

        return res.json({restaurant});

    } catch (error) {
        return res.status(500).json({error : error.message})
    }
})



export default Router;