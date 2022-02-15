const express = require('express');
const app = express();

const router=express.Router();
const { check, validationResult } = require('express-validator');

app.use(express.json());

 

router.post('/',
    check('name','Name is required')
    .not()
    .isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with six chacrcter or more than sex'
    ).isLength()({min:6})
,(req,res)=>{
    console.log(req.body)
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() });
    }
    res.send("User Route")
})

module.exports=router;