const express=require("express")
const router=express.Router();

router.get('/',(req,res)=>res.send("User Route"))

module.exports=router;



// const express = require("express");
// const app = express();

// const dataModel = require('./../../models/User.js');

// app.post("/", async (request, response) => {
//   const data = new dataModel(request.body)
//   try {
//     await data.save();
//     response.send(data);
//   } catch (error) {    
//     response.status(400).send(error.message);
//   }
// });
// module.exports = app;