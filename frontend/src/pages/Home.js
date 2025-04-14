import React, { useEffect } from 'react'
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import {ToastContainer} from 'react-toastify';
function Home() {
    const [LoggedInUser , setLoggedInUser] = useState('');
    const [products , setProducts] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("LoggedInUser")
        setLoggedInUser(user)
    },[])
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("LoggedInUser")
        handleSuccess("User Logout Successfully");
        setTimeout(()=>{
            navigate('/login')
        },1000)
    }
    const fetchProducts = async () => {
        try {
            const url = "https://pravesh-api.vercel.app//products";
            const headers  = {
             headers:{
                'authorization':  localStorage.getItem('token')
            }}
            const response = await fetch(url, headers);
            const result = await response.json();
            setProducts(result)
            console.log("result --->", result);
        } catch (error) {
            handleError(error)
        }
    }
    useEffect(()=>{
        fetchProducts()
    },[])

  return (
    <div > 
        <h1>Hey! {LoggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
        <div style={{ padding: '20px' }}>
  <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>🛍️ Products</h1>

  {products && products.length > 0 ? (
    products.map((product, index) => (
      <div
        key={index}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 20px',
          marginBottom: '15px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        }}
      >
        <h3 style={{ margin: 0, flex: 1 }}>{product.name}</h3>
        <h4 style={{ margin: 0, color: '#2e7d32', minWidth: '100px', textAlign: 'right' }}>
          ₹{product.price}
        </h4>
      </div>
    ))
  ) : (
    <p style={{ textAlign: 'center' }}>No products available.</p>
  )}
</div>


        <ToastContainer/>
    </div>
  )
}

export default Home