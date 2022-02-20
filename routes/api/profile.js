const express=require("express")
const router=express.Router();
const auth=require('../../middleware/auth')
const Profile=require('../../models/Profile')
const User=require('../../models/User')
const request=require('request')
const config=require('config')
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


// Get api/profile/user/:user_id
// Get profile by user ID
// @access Public

router.get(
  '/user/:user_id',
  // checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id
      }).populate('user', ['name', 'avatar']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      if(err.kind=='ObjectId'){
        return res.status(400).json({ msg: 'Profile not found' });
      }
      return res.status(500).json({ msg: 'Server error..' });
    }
  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    // await Promise.all([
      // Post.deleteMany({ user: req.user.id }),
      await Profile.findOneAndRemove({ user: req.user.id }),
      await User.findOneAndRemove({ _id: req.user.id })
    // ]);

    res.json({ msg: 'User deleted Sucessfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put('/experience',[auth,[
  check('title','Title is required').not().isEmpty(),
  check('company','Company is required').not().isEmpty(),
  check('from','From date is required').not().isEmpty()
]],async(req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  }=req.body;

  const newExp={
    title,
    company,
    location,
    from,
    to,
    current,
    description

  }
  try{
    const profile=await Profile.findOne({user:req.user.id});
    profile.experience.unshift(newExp)
    await profile.save();
    res.json(profile)

  }catch(err){
    console.log(err.message);
    res.status(500).send('Server error');
  }

})

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete('/experience/:exp_id',auth,async(req,res)=>{
  try{
    const profile=await Profile.findOne({user:req.user.id});
    // Get remove index
    const removeIndex=profile.experience.map(item=>item.id).indexOf
    (req.params.exp_id);

    profile.experience.splice(removeIndex,1);
    await profile.save();
    res.json(profile);

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error..')
  }
})



// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put('/education',[auth,[
  check('school','School is required').not().isEmpty(),
  check('degree','Degree is required').not().isEmpty(),
  check('fieldofstudy','Field of study is required').not().isEmpty(),
  check('from','From date is required').not().isEmpty()
]],async(req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  }=req.body;

  const newEdu={
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description

  }
  try{
    const profile=await Profile.findOne({user:req.user.id});
    profile.education.unshift(newEdu)
    await profile.save();
    res.json(profile)

  }catch(err){
    console.log(err.message);
    res.status(500).send('Server error');
  }

})

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:edu_id',auth,async(req,res)=>{
  try{
    const profile=await Profile.findOne({user:req.user.id});
    // Get remove index
    const removeIndex=profile.education.map(item=>item.id).indexOf
    (req.params.edu_id);

    profile.education.splice(removeIndex,1);
    await profile.save();
    res.json(profile);

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error..')
  }
})

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public

router.get('/github/:username', async (req, res) => {
  try {
    const options={
      uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
      method:'GET',
      headers:{'user-agent':'node.js'}
    };
    request(options,(error,response,body)=>{
      if(error) console.error(error);
      if (response.statusCode!==200){
        res.status(404).json({msg:'No gitHub profile found'})
      }
      res.json(JSON.parse(body));
    })
    
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
});








module.exports=router;