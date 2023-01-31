const {Router}= require('express')
let archivo = require('../data/ProductManager')

const router = Router()

//Todos los productos
router.get('/',(req,res) => {
    let {limit} = req.query
    if(limit){
        let productos = archivo.getProductslimit(Number(limit))
        res.json(productos)
    }
    else{
        let productos = archivo.getProducts()
        res.json(productos)
    }
})

//Productos por id
router.get('/:id',(req,res)=>{
    console.log('Buscar elemento por ID:')
    let { id } = req.params
    let producto = archivo.getProductBYId(Number(id))
    producto!=undefined?res.json(producto):res.json({message:'El id no existe'})
})

//Post Producto
router.post('/',(req,res)=>{
    let producto = req.body
    archivo.addProduct(producto)
    console.log(producto)
    res.send('Producto agregado')
})

//Actualizar producto
router.put('/:id',(req,res)=>{
    let { id } = req.params
    let producto = req.body
    archivo.updateProduct(Number(id),producto)
    res.send('Producto actualizado')
})

//Eliminar producto
router.delete('/:id',(req,res)=>{
    let { id } = req.params
    archivo.deleteProduct(Number(id))
    res.send('Producto eliminado')
})

module.exports = router