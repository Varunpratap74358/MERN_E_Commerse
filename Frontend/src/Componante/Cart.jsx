import React, { useContext, useEffect, useState } from 'react'
import ContextApp from '../Context/ContextApp'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cart, decriseQty, addToCart,crearCart, removeFromCart } = useContext(ContextApp)
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)
  const navigate = useNavigate()



  useEffect(() => {
    let qty = 0,
      price = 0
    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        qty += cart.items[i].qty
        price += cart.items[i].price
      }
      setQty(qty)
      setPrice(price)
    }
  }, [cart])

  const clearCartNow=()=>{
    const choise = confirm("Clear Your Cart Items..")
    if(choise){
      crearCart()
    }
  }

  return (
    <>
    {!cart?.items.length == 0 ? (
      <div className="my-5 text-center" id="topbtn">
        <button className="btn animated-button btn-info mx-3">
          Total Items : {qty}
        </button>
        <button className="btn animated-button btn-warning mx-3">
          Total_Price : {price}
        </button>
      </div>
      ) : <div className='text-center container my-5' >
        <button onClick={()=>navigate("/") } style={{width:"500px" , color:"white"}}>Continew Shoping....</button>
      </div> }
      {cart?.items?.map((product, i) => {
        return (
          <div key={i} id="cartset" className="container p-3 bg-dark my-5">
            <div className="cart_img">
              <img src={`${product.imgSrc}`} alt="" id="cart_img" />
            </div>
            <div className="cart_des">
              <h3>
                <span className="text-danger">Product_Name:</span>{' '}
                {product.title}
              </h3>
              <h4>
                <span className="text-danger">Price:</span> {product.price}
              </h4>
              <h4>
                <span className="text-danger">Quantity:</span> {product.qty}
              </h4>
            </div>
            <div className="cart_sction">
              <button
                onClick={() => decriseQty(product?.productId, 1)}
                className="btn  mx-2 btn-secondary"
              >
                Qty--
              </button>
              <button
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc,
                  )
                }
                className="btn  mx-2 btn-info"
              >
                Qty++
              </button>
              <button
                onClick={() => removeFromCart(product?.productId)}
                className="btn  mx-2 btn-primary"
              >
                Remove
              </button>
            </div>
          </div>
        )
      })}
      {cart?.items?.length > 0 && (
      <div className="container my-5" id="clearbtn">
        <button
        onClick={clearCartNow}
          className="btn animated-button btn-info mx-3"
          style={{ height: '60px', fontSize: '18px' }}
        >
          Clear Cart
        </button>
        <button
        onClick={()=>navigate("/shipping")}
          className="btn animated-button btn-info mx-3"
          style={{ height: '60px', fontSize: '18px' }}
        >
          Check Out
        </button>
      </div>
      )}
    </>
  )
}

export default Cart
