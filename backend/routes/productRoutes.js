import express from 'express'
const router = express.Router()
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

import { getProducts, getProductsById,deleteProduct, updateProduct, createProduct } from '../controllers/productControllers.js'

import {protect,admin} from '../middleware/authMiddleware.js'


//@desc fetch all products
//@route get/api/products
//@access public
router.route('/').get(getProducts).post(protect,admin,createProduct)
    //@desc fetch all product
    //@route get/api/products/:id
    //@access public
router.route('/:id').get(getProductsById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)

export default router;