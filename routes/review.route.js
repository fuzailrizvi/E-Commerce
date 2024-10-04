const ProductModel=require('../models/Product');
const ReviewModel=require('../models/Review.model');
const { validator, reviewValidator } = require("../middlewares/validator");
const { reviewSchema } = require("../Validation/product");

const router=require('express').Router();

router.post('/products/:productId/reviews',validator(reviewSchema),async (req,res)=>{
    const {productId}=req.params;
    const{rating,comment}=req.body;

   const review=await ReviewModel.create({rating,comment});

   await ProductModel.updateOne(
    {_id:productId},
    {$addToSet:{reviews:review._id}}
   );

   res.redirect(`/products/${productId}`);

})

module.exports=router;