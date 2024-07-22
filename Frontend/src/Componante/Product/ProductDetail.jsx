import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReletedProduct from './ReletedProduct'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState([])
  const url = 'http://localhost:3000/api'

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          'Content-Type': 'Application/json',
        },
        withCredentials: true,
      })
      setProduct(api.data.product)
    }
    fetchProduct()
  }, [id])

  return (
    <>
        <div className="container text-center my-5" style={{display:"flex", 
            justifyContent:"space-evenly",
            alignItems:"center"  
        }}>
            <div className="left">
                <img src={`${product.imgSrc}`} 
                style={{width:"350px", height:"350px", borderRadius:"10px",
                    border:"2px solid yellow"
                }}
                alt="" />
            </div>
            <div className="right" style={{width:"350px"}}>
                <h1>{product.title}</h1>
                <p className='container text-start mx-5 p-2 fs-5'>{product.description}</p>
                <h1>{product.price} ₹</h1>
                <div className='my-5 d-flex'>
                    <button className='btn btn-danger mx-3' style={{fontWeight:'bold'}}>Bye Now</button>
                    <button className='btn btn-warning' style={{fontWeight:'bold'}}>Add To Cart</button>
                </div>
            </div>
        </div>
        <ReletedProduct category={product.category} />
    </>
  )
}

export default ProductDetail
