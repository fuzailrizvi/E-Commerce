const express=require('express');
const router=express.Router();
const ProductModel=require('../models/Product');
const { validator, productValidator } = require("../middlewares/validator");
const { productSchema } = require("../Validation/product");
const { isLoggedIn, isSeller } = require('../middlewares/auth');

router.get('/products',isLoggedIn,async (req,res)=>{
    const products=await ProductModel.find();
    res.render('products/list',{products});
    
})

router.get('/products/new',isLoggedIn,isSeller,(req,res)=>{
    res.render('products/new');
})

router.post('/products',validator(productSchema),async (req,res)=>{
   const body=req.body;
   await ProductModel.create(body);

   req.flash("success","Product Added Successfully");
   res.redirect('/products');
})

router.get('/products/:id',isLoggedIn,async (req,res)=>{
    const{id}=req.params;
    const product= await ProductModel.findById(id).populate('reviews');
    
    res.render('products/show',{product});
})
router.get('/products/:id/edit',isLoggedIn,async (req,res)=>{
   
    const {id}=req.params;
    const product=await ProductModel.findById(id);
    res.render('products/edit',{product})
})

router.put('/products/:id',isLoggedIn,async (req,res)=>{
    const {id}=req.params;
    const body=req.body;
    const product=await ProductModel.findById(id);
    
    if(body.title) product.title=body.title;
    if(body.image) product.image=body.image;
    if(body.price) product.price=body.price;
    if(body.description) product.description=body.description;

    await product.save();
    req.flash("success","Product Updated Successfully");
    res.redirect('/products');
})

router.delete('/products/:id',isLoggedIn,async (req,res)=>{
    const {id}=req.params;
    await ProductModel.findByIdAndDelete(id);
    req.flash("success","Product Deleted Successfully");
    res.redirect('/products');
})
module.exports=router;