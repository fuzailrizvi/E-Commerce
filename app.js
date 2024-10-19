const express=require('express');
const path=require('path');
const app=express();
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session=require('express-session');
const passport = require('passport');
const Strategy = require('passport-local');
const UserModel = require('./models/User.model');
const PORT=5000;

mongoose.connect('mongodb+srv://fuzailrizvi786:kUnMQ7KNSSpdvspZ@cluster0.y80we.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('DB Conencted');
    
})
.catch(err=>console.log(err));

//middleware
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use(session({
    secret:"some-secret"
}))
app.use(flash());


// setup passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Strategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser())
passport.deserializeUser(UserModel.deserializeUser());

app.use((req,res,next)=>{
    app.locals.success=req.flash('success');
    app.locals.error=req.flash('error');
    app.locals.user=req.user
    
    
    next();
})



//set public folder
app.use(express.static(path.join(__dirname,'public')));

//Set EJS as template engine
app.engine('ejs', ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//Routes
app.get('/',(req,res)=>{
    res.render('home',{
        title:'HOME | E-Commerce'
    })
})
const productRoutes=require('./routes/product.route');
const reviewRoutes = require('./routes/review.route');
const authRoutes=require('./routes/auth.route');



app.use(reviewRoutes);
app.use(productRoutes);
app.use(authRoutes);

//Server Listen
app.listen(PORT,()=>{
    console.log(`Server running at Port ${PORT}`);
    
})
