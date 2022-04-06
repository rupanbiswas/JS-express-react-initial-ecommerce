import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateTokens.js'



//@desc Auth user & get token
//@route post/api/user/login
//@access public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    console.log({email,password})
 
    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('invalid email or password')
    }
})




//@desc get user profile
//@route post/api/user/profile
//@access Private
const getUserProfile = asyncHandler(async(req, res) => {
const user = await User.findById(req.user._id)

if(user){
    res.json({ 
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
})
} else {
    res.status(401)
    throw new Error('Invalid email or password')
}
})





//@desc Auth user & get token
//@route post/api/users
//@access public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password } = req.body
    console.log({name,email,password})
 
    const userExists = await User.findOne({ email });
    console.log(userExists);
    if(userExists){
        res.status(400)
        throw new Error('user exists')
    }
    const user = await User.create({ 
        name, email, password 
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email, 
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('user not found')
    }
})




//@desc update user profile
//@route post/api/user/profile
//@access Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    
    if(user){
       user.name = req.body.name || user.name
       user.email = req.body.email || user.email
       if (req.body.password){
           user.password =req.body.password
       }

const updatedUser = await user.save()

res.json({
    _id:updatedUser._id,
    name:updatedUser.name,
    email:updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser._id)
})

    } else {
        res.status(401)
        throw new Error('user not found')
    }
    })


    //@desc get all user profile
//@route post/api/user/
//@access Private/admin
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json(users)
    
    })





    //delete user
    //delete  api/users/:id
    //private/admin


    const deleteUser = asyncHandler(async(req, res) => {
        const user = await User.findById(req.params.id)
if(user){
await user.remove()
res.json({message :"user removed"})
}        else{
    res.status(404)
    throw new Error('user not found')
}
        })
    



//get user by id
//get /api/users/:
// private/admin

const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')
if(user){
res.json(user)
}        else{
res.status(404)
throw new Error('user not found')
}
    })




//@desc update user profile
//@route put /api/user/:id
//@access Private/admin
const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    
    if(user){
       user.name = req.body.name || user.name
       user.email = req.body.email || user.email
       user.isAdmin = req.body.isAdmin
const updatedUser = await user.save()

res.json({
    _id:updatedUser._id,
    name:updatedUser.name,
    email:updatedUser.email,
    isAdmin: updatedUser.isAdmin,
})

    } else {
        res.status(401)
        throw new Error('user not found')
    }
    })



    export {getUserById,updateUser,deleteUser, authUser,getUserProfile ,registerUser,updateUserProfile,getUsers}


