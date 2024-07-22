import { Products } from '../models/product.model.js'

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, qty, imgSrc } = req.body
    let product = await Products.create({
      title,
      description,
      price,
      category,
      qty,
      imgSrc,
    })

    res.json({
      success: true,
      message: 'Products add successfully,....',
      product,
    })
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const getProducts = async (req, res) => {
  try {
    const product = await Products.find().sort({ createdAt: -1 })
    if (!product) {
      return res
        .json({ message: 'Product is not found....', success: false })
    }
    res.json({ message: 'All product', success: true, product })
  } catch (error) {
    res.json({ message: error.message })
  }
}



export const getOneProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Products.findById(id)
        if(!product){
            return res.json({
                message:"Product is not avilable",
                success: false
            })
        }
        res.json({
            success:true,
            product
        })


    } catch (error) {
        res.json({ message: error.message })
    }
}



export const updateProductById = async(req,res)=>{
    try {
        
        const {id} = req.params;
        const product = await Products.findById(id)
        if(!product){
            return res.json({
                message:"Product is not found",
                success: false
            })
        }
        const update= await Products.findByIdAndUpdate(id,req.body,{new:true})

        res.json({
            success:true,
            update
        })

    } catch (error) {
        res.json({ message: error.message })
    }
}



export const deleteProductById = async(req,res)=>{ 
    try {
        
        const {id} = req.params;
        const product = await Products.findById(id)
        if(!product){
            return res.json({
                message:"Product is not found",
                success: false
            })
        }
        const deleteProduct= await Products.findByIdAndDelete(id)

        res.json({
            message:"this Product is deleted",
            success:true,
            deleteProduct
        })

    } catch (error) {
        res.json({ message: error.message })
    }
}