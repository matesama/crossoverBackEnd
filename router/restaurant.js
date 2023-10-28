import express from "express";
import Restaurant from "../models/Restaurant.js";

const restaurantRouter = express.Router();

restaurantRouter.post("/", async (req, res) => {
    try{
        const response = await Restaurant.create(req.body);
        res.status(201).json(response);
    } catch (err){
        res.status(401).json({error: err.message})
    }
})


restaurantRouter.get("/restaurant", async (req, res) => {
    try{
        const response = await Restaurant.find();
        res.status(200).json(response);
    } catch (err){
        res.status(401).json({error: err.message})
    }
})

restaurantRouter.get("/restaurant/:_id", async (req, res) => {
        const {_id} = req.params
    try{
        const response = await Restaurant.findOne({_id});
        res.status(200).json(response);
    } catch (err){
        res.status(401).json({error: err.message})
    }
})

restaurantRouter.get("/restaurant/filter/:name", async (req, res) => {
    const {name} = req.params
    const param = name.replace("%20", "+")
    console.log(param)
    const capitalLetter = () => {
    const capitalizedCity = name.split(" ")

     for (let i = 0; i < capitalizedCity.length; i++) {
         capitalizedCity[i] = capitalizedCity[i][0].toUpperCase() + capitalizedCity[i].slice(1);
    }
     const modifiedCity = capitalizedCity.join(" ");
     modifiedCity.replace("%20", "+");
     return modifiedCity;
    }
    console.log(capitalLetter());
    
try{
    const response = await Restaurant.findOne({name: capitalLetter()});
    res.status(200).json(response);
} catch (err){
    res.status(401).json({error: err.message})
}
})
 
restaurantRouter.get("/:tags", async (req, res) => {
    const {tags} = req.params

    const lowerTags = tags.charAt(0).toLowerCase() + tags.slice(1)
    console.log(lowerTags)

    try{
        const response = await Restaurant.find({'tags': lowerTags});
        res.status(200).json(response);
    } catch (err){
        res.status(401).json({error: err.message})
    }
})

restaurantRouter.get("/city/:city", async (req, res) => {
    const {city} = req.params

    const upperCity = city.charAt(0).toUpperCase() + city.slice(1)
    console.log(upperCity)
    
    try{
        const response = await Restaurant.find({'location.city': upperCity});
        res.status(200).json(response);
    } catch (err){
        res.status(401).json({error: err.message})
    }
})

export default restaurantRouter;