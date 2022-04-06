import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails,updateProductDetails } from '../components/actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { updateProduct } from '../actions/productActions';

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;
    const [name, setName] = useState('')

    const [price, setPrice] = useState(0)
    const [image,setImage] =useState('')
    const [brand,setBrand] =useState('')
    const [category,setCategory] =useState('')
    const [countInStock,setCountInStock] =useState('')
    const [description,setDescription] =useState('')
    

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productDetails

    useEffect(() => {
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{if(!product.name || product._id !== productId){
            dispatch(listProductDetails(productId))
        }
        else{
 setName(product.name)
 setPrice(product.price)
 setImage(product.image)
 setBrand(product.brand)
 setCategory(product.category)
 setCountInStock(product.countInStock)
 setDescription(product.description)
        }}
            
        }

, [dispatch,history,productId,product,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault() 
dispatch(updateProduct({_id:product,
name,price,image,brand,category,description,countInStock}))    }
    return (
        <>
        <Link to='/admin/productlist' className='btn btn-light'>Go back</Link>
        
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='dander'>{errorUpdate}</Message>}
               {loading ? <Loader></Loader>:error?<Message></Message>:
               (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>name </Form.Label>
                    <Form.Control type='name' placeholder='name' value={name}
                        onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
               
                <Form.Group controlId='price'>
                    <Form.Label>price </Form.Label>
                    <Form.Control type='number' placeholder='price' value={price}
                        onChange={(e) => setPrice(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Check
                     type='text' 
                    label='enter image url'
                    checked={image}
                    onChange={(e) => setImage(e.target.checked)}>

                    </Form.Check>
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Check
                     type='text' 
                    label='enter brand'
                    checked={brand}
                    onChange={(e) => setBrand(e.target.checked)}>

                    </Form.Check>
                </Form.Group>
                <Form.Group controlId='countInStock'>
                    <Form.Label>countInStock </Form.Label>
                    <Form.Control type='number' placeholder='countInStock' value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='category'>
                    <Form.Label>category </Form.Label>
                    <Form.Control type='text' placeholder='category' value={category}
                        onChange={(e) => setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>description </Form.Label>
                    <Form.Control type='text' placeholder='description' value={description}
                        onChange={(e) => setDescription(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Update</Button>
            </Form>
           
               )}
           
        </FormContainer>

         </>

    )
}

export default ProductEditScreen
 