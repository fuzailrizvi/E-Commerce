const express=require('express');
const path=require('path');
const app=express();
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const mongoose=require('mongoose');
const PORT=5000;

mongoose.connect('mongodb://127.0.0.1:27017/E-Com-DB')
.then(()=>{
    console.log('DB Conencted');
    
})
.catch(err=>console.log(err));

//middleware
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

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

app.use(reviewRoutes);
app.use(productRoutes);


//Server Listen
app.listen(PORT,()=>{
    console.log(`Server running at Port ${PORT}`);
    
})
