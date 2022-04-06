import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//create new order
// post/api/orders
//acess private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
// console.log(orderItems,
//     shippingAddress,
//     paymentMethod,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,)
    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('no order items')
    }else {
        const order = new Order({
        orderItems,
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        })
        console.log(order)

        const  createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
});




//create new order by id

// get/api/orders
//acess private
const getOrderById = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id).populate('user','name email')
    if(order){
       res.json(order)
    }else{
        res.status(404)
        throw new Error('order not found')
    }

});


//update order to paid
// get/api/orders
//acess private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
     if(order){
order.isPaid=true
order.paidAt=Date.now()
order.paymentResult={
id:req.body.id,
status:req.body.status, 
update_time:req.body.update_time,
email_address:req.body.payer.email_address
}    

const updatedOrder= await order.save()
res.json(updatedOrder)
 }else{
         res.status(404)
         throw new Error('order not found')
     }
 
 });



//update get logged in user orders
// get/api/orders/myorders
//acess private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user:req.user._id})
res.json(orders)
 });

export {addOrderItems ,getOrderById,updateOrderToPaid,getMyOrders}