import express from 'express'
import { addProduct, deleteProductById, getOneProduct, getProducts, updateProductById } from '../controllers/product.controler.js'

const router = express.Router()

router.post('/add', addProduct)
router.get('/all', getProducts)
router.get("/:id",getOneProduct)
router.put("/:id",updateProductById)
router.delete("/:id",deleteProductById)

export default router
