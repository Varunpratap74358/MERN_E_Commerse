import React, { useContext, useEffect, useState } from 'react'
import ContextApp from '../../Context/ContextApp'
import { Link } from 'react-router-dom';


const ReletedProduct = ({category}) => {
    const [reletedProduct,setreletedProduct]=useState([])
    const {products}= useContext(ContextApp);
    // console.log( products )
    useEffect(()=>{
        setreletedProduct(products?.filter((data)=>data?.category?.toLowerCase()== category?.toLowerCase()))
        // console.log(reletedProduct)
    },[category,products])
  return (
    <>
      <div className="container text-center">
        <h1>Releted Products</h1>
        <div className="container d--flex justify-content-center align-items-center">
        <div className="row container d-flex justify-content-center align-items-center my-5">
          {reletedProduct?.map((product, i) => {
            return (
              <div
                className=" my-3 col-md-4 d-flex justify-content-center align-items-center"
                key={i}
              >
                <div
                  className="card bg-secondary text-light text-center "
                  style={{ width: '18rem' }}
                >
                  <Link to={`/product/${product._id}`} className="d-flex justify-content-center align-items-center p-3">
                    <img
                      src={`${product.imgSrc}`}
                      className="card-img-top"
                      alt="Card image cap"
                      style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '10px',
                        border: '2px solid',
                      }}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <div className="my-3 d-flex">
                      <button className="btn btn-primary mx-3">
                        {product.price} ₹
                      </button>
                      <button className="btn btn-warning">Add To Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      </div>
    </>
  )
}

export default ReletedProduct
