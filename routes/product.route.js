const express=require('express');
const router=express.Router();
const ProductModel=require('../models/Product');

router.get('/products',async (req,res)=>{
    const products=await ProductModel.find();
    res.render('products/list',{products});
    
})

router.get('/products/:id',async (req,res)=>{
    const{id}=req.params;
    const product= await ProductModel.findById(id);
    res.render('products/show',{product});
})
router.get('/products/:id/edit',async (req,res)=>{
   
    const {id}=req.params;
    const product=await ProductModel.findById(id);
    res.render('products/edit',{product})
})

router.put('/products/:id',async (req,res)=>{
    const {id}=req.params;
    const body=req.body;
    const product=await ProductModel.findById(id);
    
    if(body.title) product.title=body.title;
    if(body.image) product.image=body.image;
    if(body.price) product.price=body.price;
    if(body.description) product.description=body.description;

    await product.save();
    res.redirect('/products');
})

router.delete('/products/:id',async (req,res)=>{
    const {id}=req.params;
    await ProductModel.findByIdAndDelete(id);
    res.redirect('/products');
})
module.exports=router;