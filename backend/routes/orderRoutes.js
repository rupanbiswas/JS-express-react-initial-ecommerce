import express from 'express'
const router = express.Router()
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
import {protect } from '../middleware/authMiddleware.js'

import { addOrderItems,getOrderById, updateOrderToPaid ,getMyOrders} from '../controllers/orderController.js'




//@desc fetch all products
//@route get/api/products
//@access public
router.route('/').post(protect,addOrderItems)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
export default router;