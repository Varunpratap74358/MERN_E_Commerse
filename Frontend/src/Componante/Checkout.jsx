import React, { useContext, useEffect, useState } from 'react'
import ContextApp from '../Context/ContextApp'
import { LuBadgePlus } from 'react-icons/lu'
import { GrSubtractCircle } from 'react-icons/gr'
import { FaTrash } from 'react-icons/fa'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Checkout = () => {
  const {
    cart,
    decriseQty,
    addToCart,
    crearCart,
    removeFromCart,
    userAddress,
    url,
    user,
  } = useContext(ContextApp)
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

  const handelPayment = async () => {
    try {
      const orderRespons = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty:qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      })

      // console.log("order rsrsrss" ,orderRespons.data)

      const {orderId, amount:orderAmount}=orderRespons.data

      var options = {
        "key": "rzp_test_cxiK7G8pT6lf6J", // Enter the Key ID generated from the Dashboard
        "amount": orderAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Varun Singh WebDev",
        "description": "varun pratap singh payment verification ",
     
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response){
            const paymentdata = {
              orderId:response.razorpay_order_id,
              PaymentId:response.razorpay_payment_id,
              signature:response.razorpay_signature,
              amount:orderAmount,
              ordrItems:cart?.items,
              userId:user._id,
              userShipping:userAddress
            }
            const api = await axios.post(`${url}/payment/verify-payment`,paymentdata);

            console.log("rezerpay response inssss",api.data)

            if(api.data.success){
              navigate("/orderconfirmation")
              crearCart()
              alert("Payment successfull")
            }

        },
        "prefill": {
            "name": "varun Pratap Singh",
            "email": "varunparatap74358",
            "contact": "8958765733"
        },
        "notes": {
            "address": "Shahjahanpur"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();                                                   

    } catch (error) {
      console.log(error)
    }
  }

  const clearCartNow = () => {
    const choise = confirm('Clear Your Cart Items..')
    if (choise) {
      crearCart()
    }
  }

  return (
    <>
      <div className="container text-center my-3">
        <h1>Order Summery</h1>

        <table className="table bg-dark table-bordered border-primary">
          <thead>
            <tr>
              <th className="bg-dark text-light" scope="col">
                Product Dedait
              </th>
              <th className="bg-dark text-light" scope="col">
                Shiping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-dark text-light">
                <table className="table bg-dark table-bordered border-primary">
                  <thead>
                    <tr>
                      <th className="bg-dark text-light" scope="col">
                        Product Img
                      </th>
                      <th className="bg-dark text-light" scope="col">
                        Title
                      </th>
                      <th className="bg-dark text-light" scope="col">
                        Price
                      </th>
                      <th className="bg-dark text-light" scope="col">
                        Qty
                      </th>
                      <th className="bg-dark text-light" scope="col">
                        Qty--
                      </th>
                      <th className="bg-dark text-light" scope="col">
                        Qty++
                      </th>
                      <th className="bg-dark text-light" scope="col">
                        remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.items?.map((product, i) => {
                      return (
                        <tr key={i} className="bg-dark text-light">
                          <td className="bg-dark text-light">
                            <img
                              src={product.imgSrc}
                              alt="product image"
                              width={100}
                            />
                          </td>
                          <td className="bg-dark text-light">
                            {product.title}
                          </td>
                          <td className="bg-dark text-light">
                            {product.price}
                          </td>
                          <td className="bg-dark text-light">{product.qty}</td>
                          <td className="bg-dark text-light py-3 px-4">
                            <button
                              onClick={() => decriseQty(product?.productId, 1)}
                              className="btn  mx-2 btn-secondary"
                            >
                              <GrSubtractCircle />
                            </button>
                          </td>
                          <td className="bg-dark text-light py-3 px-4">
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
                              <LuBadgePlus />
                            </button>
                          </td>
                          <td className="bg-dark text-light py-3 px-4">
                            <button
                              onClick={() => removeFromCart(product?.productId)}
                              className="btn  mx-2 btn-danger"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                    <tr>
                      <th className="bg-dark text-light"></th>
                      <th className="bg-dark text-light">
                        <button className="btn btn-warning">Total</button>
                      </th>
                      <th className="bg-dark text-light">
                        <button className="btn btn-warning">{price}</button>
                      </th>
                      <th className="bg-dark text-light">
                        <button className="btn btn-primary">{qty}</button>
                      </th>
                      <th className="bg-dark text-light"></th>
                      <th className="bg-dark text-light"></th>
                      <th className="bg-dark text-light"></th>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="bg-dark text-light text-start">
                <ul>
                  <li>
                    <h5>Name: {userAddress?.fullName}</h5>
                  </li>
                  <li>
                    <h5>Phone: {userAddress?.phoneNumber}</h5>
                  </li>
                  <li>
                    <h5>Country: {userAddress?.country}</h5>
                  </li>
                  <li>
                    <h5>State: {userAddress?.state}</h5>
                  </li>
                  <li>
                    <h5>City: {userAddress?.city}</h5>
                  </li>
                  <li>
                    <h5>Pincode: {userAddress?.pincode}</h5>
                  </li>
                  <li>
                    <h5>Address: {userAddress?.address}</h5>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          className="container text-center my-5"
          style={{
            width: '250px',
          }}
        >
          <button
            className="btn btn-secondary"
            style={{
              height: '65px',
              fontSize: '20px',
              padding: '10px',
              fontWeight: 'bold',
            }}
            onClick={handelPayment}
          >
            Procced To Pay
          </button>
        </div>
      </div>
    </>
  )
}

export default Checkout
