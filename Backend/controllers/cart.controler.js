import { Cart } from '../models/cart.model.js'

export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, qty, imgSrc } = req.body

    const userId =  req.user

    let cart = await Cart.findOne({ userId })
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      })
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    )

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty
      cart.items[itemIndex].price += price * qty
    } else {
      cart.items.push({ productId, title, price, qty, imgSrc })
    }

    await cart.save()
    res.json({
      success: true,
      message: 'Item addded to cart',
      cart,
    })
  } catch (error) {
    res.json({
      message: error.message,
    })
  }
}

export const userCart = async (req, res) => {
  try {
    const userId =  req.user
    let cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.json({
        message: 'cart not found',
        success: false,
      })
    }
    res.json({
      message: 'User Cart',
      cart,
    })
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    })
  }
}

export const removeProductFromCart = async (req, res) => {
  try {
    const productId = req.params.productId

    const userId =  req.user

    let cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.json({
        message: 'cart not found',
        success: false,
      })
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    )

    await cart.save()

    res.json({
      message: 'Product remove from cart',
      success: true,
    })
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    })
  }
}

export const clearCart = async (req, res) => {
  try {
    const userId = req.user

    let cart = await Cart.findOne({ userId })
    if (!cart) {
      cart = new Cart({ items: [] })
    } else {
      cart.items = []
    }

    await cart.save()

    res.json({
      message: 'cart cleared',
      success: true,
    })
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    })
  }
}

export const decreaseProductQty = async (req, res) => {
  try {
    const { productId, qty } = req.body

    const userId =  req.user

    let cart = await Cart.findOne({ userId })
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      })
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    )

    if (itemIndex > -1) {
      const item = cart.items[itemIndex]
      if (item.qty > qty) {
        const pricePerUnit = item.price / item.qty

        item.qty -= qty
        item.price -= pricePerUnit * qty
      } else {
        cart.items.splice(itemIndex, 1)
      }
    } else {
      return res.json({ message: 'Invalid product id' })
    }

    await cart.save()
    res.json({
      success: true,
      message: 'Item qty decrioesed....',
      cart,
    })
  } catch (error) {
    res.json({
      message: error.message,
    })
  }
}
