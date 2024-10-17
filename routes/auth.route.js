const router=require("express").Router();
const passport = require("passport");
const UserModel=require('../models/User.model');

router.get('/login',(req,res)=>{
    res.render('auth/login');
})

router.get('/signup',(req,res)=>{
    res.render('auth/signup');
})

router.post('/signup', async (req,res)=>{
    const {username,email,password,role}=req.body;
    const user=new UserModel({
        username,
        email,
        role
    })

    await UserModel.register(user,password);

    res.redirect('/login');

})

router.post('/login',passport.authenticate('local',{
    successRedirect:'/products',
    
    failureRedirect:'/login',
    failureFlash:true,
}))

router.get('/logout',(req,res,next)=>{
    req.logout(function(err){
        if(err){
            return next(err)
        }

        req.flash('Success','Logged Out Successfully');
        res.redirect('/login');
    })
})


module.exports=router;