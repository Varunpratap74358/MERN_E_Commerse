import React, { useContext, useEffect, useState } from 'react'
import ContextApp from '../Context/ContextApp'

const OrderConformation = () => {
  const { userOrder } = useContext(ContextApp)
  const [latestOrder, setLatestOrder] = useState({})
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder[0])
    }

    let qty = 0,
      price = 0
    if (latestOrder?.ordrItems) {
      for (let i = 0; i < latestOrder?.ordrItems?.length; i++) {
        qty += latestOrder?.ordrItems[i].qty
        price += latestOrder?.ordrItems[i].price
      }
      setQty(qty)
      setPrice(price)
    }

  }, [userOrder])




  return (
    <>
      <div className="container my-5">
        <h1 className="text-center">Your order has been confirm</h1>
        <h3 className="text-center">It will delivered soon</h3>
        <hr />
      </div>

      <div className="container">
        <table class="table table-bordered border-start border-primary">
          <thead>
            <tr>
              <th className="text-center bg-dark text-light">OrderItems</th>
              <th className="text-center bg-dark text-light col-md-5">
                OrderDetails & ShippingAddress
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <table className="table my-3 table-bordered border-primary">
                <thead>
                  <tr>
                    <th className="text-center bg-dark text-light">
                      Product Img
                    </th>
                    <th className="text-center bg-dark text-light">Title</th>
                    <th className="text-center bg-dark text-light">Price</th>
                    <th className="text-center bg-dark text-light">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {latestOrder?.ordrItems?.map((product, i) => {
                    return (
                      <>
                        <tr key={i}>
                          <td className="text-center bg-dark text-light">
                            <img src={`${product?.imgSrc}`} alt="" width={100} />
                          </td>
                          <td className="text-center bg-dark text-light">{product?.title}</td>
                          <td className="text-center bg-dark text-light">{product?.price}</td>
                          <td className="text-center bg-dark text-light">{product?.qty}</td>
                        </tr>
                      </>
                    )
                  })}

                  <tr>
                    <td className="text-center bg-dark text-light"></td>
                    <td className="text-center bg-dark text-light">
                      <button className="bg-primart">Total</button>
                    </td>
                    <td className="text-center bg-dark text-light">
                      <button className="bg-warning">
                        {price}
                      </button>
                    </td>
                    <td className="text-center bg-dark text-light">
                      <button className="bg-primart">{qty}</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <td className="text-start bg-dark text-light">
                <ul>
                  <li>
                    <h5>PaymentId: {latestOrder?.PaymentId}</h5>
                  </li>
                  <li>
                    <h5>OrderId: {latestOrder?.orderId}</h5>
                  </li>
                  <li>
                    <h5>PayStatus: {latestOrder?.payStatus}</h5>
                  </li>
                  <li>
                    <h5>OrderDate: {latestOrder?.orderDate}</h5>
                  </li>
                  <li>
                    <h5>Name: {latestOrder?.userShipping?.fullName}</h5>
                  </li>
                  <li>
                    <h5>Phone: {latestOrder?.userShipping?.phoneNumber}</h5>
                  </li>
                  <li>
                    <h5>Country: {latestOrder?.userShipping?.country}</h5>
                  </li>
                  <li>
                    <h5>State: {latestOrder?.userShipping?.state}</h5>
                  </li>
                  <li>
                    <h5>City: {latestOrder?.userShipping?.city}</h5>
                  </li>
                  <li>
                    <h5>Pincode: {latestOrder?.userShipping?.pincode}</h5>
                  </li>
                  <li>
                    <h5>Address: {latestOrder?.userShipping?.address}</h5>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default OrderConformation
