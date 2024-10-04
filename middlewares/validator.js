const { productSchema, reviewSchema } = require('../Validation/product');

module.exports.validator = (schema) => {
    return function (req, res, next) {
      const body = req.body;
      const { error, value } = schema.validate(body);
  
      if (error) {
        console.log(error);
        res.send("Something went Wrong!!", error);
      }
  
      next();
    };
  };