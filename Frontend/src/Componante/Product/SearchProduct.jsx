import React, { useContext, useEffect, useState } from 'react'
import ContextApp from '../../Context/ContextApp'
import { Link , useParams} from 'react-router-dom';


const SearchProduct = () => {
    const [searchProduct,setSearchProduct]=useState([])
    const {products}= useContext(ContextApp);

    const {term} = useParams();


    useEffect(()=>{
        setSearchProduct(products?.filter((data)=>data?.title?.toLowerCase().includes( term.toLowerCase() )))
    },[term,products])
  return (
    <>
      <div className="container text-center">
        <div className="container d--flex justify-content-center align-items-center">
        <div className="row container d-flex justify-content-center align-items-center my-5">
          {searchProduct?.map((product, i) => {
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
                    <div className="my-3">
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

export default SearchProduct
