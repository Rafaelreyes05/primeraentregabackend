const {Router}= require('express')
let archivo = require('../data/Cart')

const router = Router()

//Productos por id
router.get('/:cid',(req,res)=>{
    console.log('Buscar elemento por ID:')
    let { cid } = req.params
    let carrito = archivo.getProductBYId(Number(cid))
    carrito!=undefined?res.json(carrito):res.json({message:'El id no existe'})
})

router.get('/',(req,res)=>{
    let carritos = archivo.getProducts()
    res.json(carritos)
})

router.post('/:cid/producto/:pid',(req,res)=>{
    let { cid } = req.params
    let { pid } = req.params
    archivo.addProduct(Number(cid),Number(pid))
    res.json(archivo.getProducts())
})

module.exports = router