import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'



//@desc fetch all products
//@route get/api/products
//@access public
const getProducts = asyncHandler(async(req,res) => {
    const products = await Product.find({})
    res.json(products)
})



//@desc fetch all product
//@route get/api/products/:id
//@access public

const getProductsById = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})



//@desc Delete a product
//@route get/api/products/:id
//@access private/admin

const deleteProduct = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
await product.remove()
res.json({message :"product removed"})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})




//@desc create a product
//@route post/api/products
//@access private/admin

const createProduct = asyncHandler(async(req,res) => {
    const product = new Product({
        name:"sample name",
        price:0,
        user:req.user._id,
        image:'/image/sample.jpg',
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReviews:0,
        description:"sample description"
    })
    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
})




//@desc update a product
//@route put /api/products/:id
//@access private/admin

const updateProduct = asyncHandler(async(req,res) => {
    const {name,
        price,
        description,
        image,
        brand,
        category,
        countInStock}= req.body
        const product = await Product.findById(req.params.id)
        if(product){
            product.name=name
            product.price=price
            product.description=description
            product.image=image
            product.brand=brand
            product.category=category
            product.countInStock=countInStock

            const updatedProduct = await Product.save()
            res.json(updatedProduct)
        }else{
            res.status(404)
            throw new Error('product not found')
        }
})

export { getProducts, getProductsById,deleteProduct,createProduct,updateProduct }