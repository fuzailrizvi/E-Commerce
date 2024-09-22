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

module.exports=router;