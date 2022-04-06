import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducers, productDetailsReducers,productDeleteReducer, productCreateReducer,productUpdateReducer } from "./reducers/productreducers.js"
import { cartReducer } from './reducers/cartReducers.js';
import {userLoginReducer, userUpdateReducer } from './reducers/userReducers.js'
import {userRegisterReducer } from './reducers/userReducers.js'
import {userDetailsReducer} from './reducers/userReducers.js'
import {userDeleteReducer,userUpdateProfileReducer,userListReducer} from './reducers/userReducers.js'
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer} from './reducers/orderReducers.js'

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: { cartItems: cartItemsFromStorage ,shippingAddress: shippingAddressFromStorage},
    userLogin : { userInfo: userInfoFromStorage },
    
}




const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;