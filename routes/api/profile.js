const express=require("express")
const router=express.Router();
const auth=require('../../middleware/auth')
const Profile=require('../../models/Profile')
const User=require('../../models/User')
const { check, validationResult } = require('express-validator');





// GET/api/profile/me
// GET current users profile

router.get('/me', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']);
  
      if (!profile) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }
  
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

//   POST requets
// Create or update user profile

router.post('/',auth,
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty(),
  async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        // spread the rest of the fields we don't need to check
        ...rest
      } = req.body;
    //   build profile object
    const profileFields={}
    profileFields.user=req.user.id;
    if(company)profileFields.company=company;

    if(website)profileFields.website=website;
    if(location)profileFields.location=location;
    if(bio)profileFields.bio=bio;
    if(status)profileFields.status=status;
    if(githubusername)profileFields.githubusername=githubusername;

    if(skills){
        profileFields.skills=skills.split(',').map(skill=>skill.trim())
    }

    // Build social object
    profileFields.social={}
    if(twitter)profileFields.social.twitter=twitter;
    if(facebook)profileFields.social.facebook=facebook;
    if(linkedin)profileFields.social.linkedin=linkedin;
    if(instagram)profileFields.social.instagram=instagram;
    if(youtube)profileFields.social.youtube=youtube;

    try{
        let profile=await Profile.findOne({user:req.user.id});
        
        if(profile){
            profile=await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileFields},
                {new:true}
                );
            return res.json(profile);
        }


    // Create
    profile=new Profile(profileFields);
    await profile.save();
    res.json(profile);

    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error..')

    }

  

  }

)
// Get api/profile
// Get all profiles

router.get('/', async (req, res) => {
    try {
      const profiles = await Profile.find().populate('user', ['name', 'avatar']);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });





module.exports=router;