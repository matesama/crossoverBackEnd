import express from "express";
import Restaurant from "../models/Restaurant.js";

const restaurantRouter = express.Router();

//Insert a new Restaurant
restaurantRouter.post("/", async (req, res) => {
    try{
        const response = await Restaurant.create(req.body);
        res.status(201).json(response);
    } catch (err){
        res.status(401).json({error: err.message})
    }
})

//https://crossoverbackend.onrender.com/api/restaurant

restaurantRouter.get("/restaurant", async (req, res) => {
    try{
        const response = await Restaurant.find();
        res.status(200).json(response);
    } catch (err){
        res.status(500).json({error: err.message})
    }
})

restaurantRouter.get("/restaurant/:_id", async (req, res) => {
        const {_id} = req.params
    try{
        const response = await Restaurant.findOne({_id});
        res.status(200).json(response);
    } catch (err){
        res.status(500).json({error: err.message})
    }
})


//e.g. https://crossoverbackend.onrender.com/api/restaurant/filter/:name
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
    res.status(500).json({error: err.message})
}
})
 
//e.g. https://crossoverbackend.onrender.com/api/french
restaurantRouter.get("/restaurant/:tags", async (req, res) => {
    const {tags} = req.params

    const lowerTags = tags.charAt(0).toLowerCase() + tags.slice(1)
    console.log(lowerTags)

    try{
        const response = await Restaurant.find({'tags': lowerTags});
        res.status(200).json(response);
    } catch (err){
        res.status(500).json({error: err.message})
    }
})

//e.g.  https://crossoverbackend.onrender.com/api/:city
restaurantRouter.get("/restaurant/city/:city", async (req, res) => {
    const {city} = req.params

    const upperCity = city.charAt(0).toUpperCase() + city.slice(1)
    console.log(upperCity)
    
    try{
        const response = await Restaurant.find({'location.city': upperCity});
        res.status(200).json(response);
    } catch (err){
        res.status(500).json({error: err.message})
    }
})

restaurantRouter.get("/restaurant", async (req, res) => {
    const {city, tags} = req.query;
    /*let filter = {};

    if (city) {
        filter.city = city;
    }

    if () {
        /*const tagArray = tags.split(',');
        filter.tags = { $all: tagArray };
    }*/

    try {
        const restaurants = await Restaurant.find(filter);
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})


restaurantRouter.get('/search', async (req, res) => {
    // Extract the tags and city from the query parameters
    const {tags} = req.query
    const {city} = req.query
    console.log(req.query.tags)
    console.log(req.query.city);
    
    try {

        /*const response = await Restaurant.find({location:{"location.city": req.query.city}})
        console.log(response);
        res.json(response);*/

       // If both tags and city are provided, find places that match both
       if (tags && city) {
        const lowerTags = tags.charAt(0).toLowerCase() + tags.slice(1)
        const upperCaseCity = city.charAt(0).toUpperCase() + city.slice(1)
         const allQuery = await Restaurant.find({ 'tags': { $in: lowerTags }, 'location.city': upperCaseCity });
         res.json(allQuery);
       }
       
       // If only tags are provided, find restaurant that matches the tags
       else if (tags) {
        const lowerTags = tags.charAt(0).toLowerCase() + tags.slice(1)
        const filterTags = await Restaurant.find({ "tags": lowerTags });
        res.json(filterTags);
       }
   
       // If only city is provided, find restaurant that matches the city
       else if (city) {
        const upperCaseCity = city.charAt(0).toUpperCase() + city.slice(1)
        const filterCity = await Restaurant.find({ 'location.city': upperCaseCity });
         res.json(filterCity);
       }
   
       // If neither tags nor city are provided, return all restaurants
       else {
         const restaurants = await Restaurant.find();
         res.json(restaurants);
       }
    } catch (error) {
       console.error(error);
       res.status(500).send('Error retrieving restaurants');
    }
   });

export default restaurantRouter;