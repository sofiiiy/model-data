const express = require("express");
const router = express.Router();
const Joi = require('joi')
const Products = require("../model/product")

router.get("/product", async (req, res) => {
  const productsFind = await Products.getAll()
  res.render("product", {
    title: "All Products",
    products: productsFind
  });
});

router.get("/addProducts", (req, res) => {
  res.render("addProducts");
});

//POST
router.post("/addProduct", async (req, res) => {

  let productSchema = Joi.object({
    type: Joi.string().min(3).max(15).required(),
    year: Joi.number().min(1).max(30).required(),
    img: Joi.string().required()
  });
  const result = productSchema.validate(req.body);
  if (!!result.error) {
    res.status(406).send(result.error.message);
    return;
  }
  const product = new Products(
    req.body.type,
    req.body.year,
    req.body.img
  )

  await product.save()
  res.status(201).redirect('/product')


});
//PUT
router.put("/languages/edite/:id", (req, res) => {
  const allLanguages = languages;
  const idx = allLanguages.findIndex((type) => type.id === +req.params.id);
  let editedLingue = {
    type: req.body.lingue,
  };
  const lingueSchema = Joi.object({
    type: Joi.string().min(3).max(15).required(),
  });
  const result = lingueSchema.validate(req.body);
  if (!!result.error) {
    res.status(406).send(result.error.message);
    return;
  }

  allLanguages[idx] = editedLingue;
  res.status(200).send(allLanguages);
});
//DELETE
router.delete("/languages/delete/:id", (req, res) => {
  const idx = languages.findIndex((type) => type.id === +req.params.id);
  const type = languages.splice(idx, 1);
  res.status(200).send(languages);
});




module.exports = router
