const express=require('express');
const path=require('path');
const app=express();
const mongoose=require('mongoose');
const PORT=5000;

mongoose.connect('mongodb://127.0.0.1:27017/E-Com-DB')
.then(()=>{
    console.log('DB Conencted');
    
})
.catch(err=>console.log(err));

//middleware
app.use(express.urlencoded({extended:true}));

//set public folder
app.use(express.static(path.join(__dirname,'public')));

//Set EJS as template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//Routes
app.get('/',(req,res)=>{
    res.render('home',{
        title:'HOME | E-Commerce'
    })
})
const productRoutes=require('./routes/product.route');
app.use(productRoutes);

//Server Listen
app.listen(PORT,()=>{
    console.log(`Server running at Port ${PORT}`);
    
})
