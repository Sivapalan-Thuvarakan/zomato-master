//libraries
import express from "express";

//Database model
import {ReviewModel} from "../../database/allModels";

const Router = express.Router();

/**
 * Router   /:resid
 * Des      GET all reviewa for a partcular restaurant
 * Params   restaurant_id
 * Access   Public
 * Method   GET
 */
Router.get("/:resid",async (req,res) =>{
    try {
        const {resid} = req.params;
        const reviews = await ReviewModel.find({restaurant:resid});

        return res.status(200).json({reviews});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

/**
 * Router   /new
 * Des      POST: Adding new food/restaurant review and rating
 * Params   not
 * Access   Public
 * Method   POST
 */

Router.post("/new",async (req,res)=>{
    try {
        const {reviewData} = req.body;

        await ReviewModel.create({...reviewData});

        return res.status(200).json({msg:"Reviews created successfully"})
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

/**
 * Router   /delete
 * Des      Delete a specific review
 * Params   not
 * Access   Public
 * Method   DELETE
 */

Router.delete("/delete/:_id",async (req,res)=>{
    try {
        const {_id} = req.params;
        await ReviewModel.findOneAndDelete(_id);

        return res.status(200).json({msg:"successfully deleted the review"});
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})
export default Router;