//Servidor
const express = require('express')
const app = express()
const router = express.Router()
const PORT = 8080

//Data
const archivo = require ('./Container')

//Configurar rutas
app.use('/api/productos',router)
router.use(express.json())
router.use(express.urlencoded({extended:true}))

//Public
app.use(express.static('public'));

//Routes
router.get('/',(req,res)=>{
  console.log('llego una peticion')
  //res.send(archivo.getAll())
  res.sendFile(__dirname+'/public/pages/cursos.html',error=>{})
})

router.get('/:id',(req,res)=>{
    console.log('peticion por id')
    const {id} = req.params
    console.log(`el id es: ${id}`)
    let producto = archivo.encontrar(id)
    res.send(producto)
})

router.post('/',(req,res)=>{
  let producto = req.body
  console.log(producto)
  producto = archivo.agregar(producto)
  res.send(producto)
})

router.put('/:id',(req,res)=>{
    let {id} = req.params
    let campos = req.body
    archivo.modificar(id,campos)
    res.send('Producto actualizado con exito!')
})

router.delete('/:id',(req,res)=>{
    let {id} =req.params
    archivo.eliminar(id)
    res.send('Producto ha sido eliminado con exito!')
})

app.get('/carrito',(req,res)=>{
  res.sendFile(__dirname+'/public/pages/carrito.html',error=>{})
})

app.get('/admin',(req,res)=>{
  res.sendFile(__dirname+'/public/pages/admin.html',error=>{})
})

//Listen
app.listen(PORT,(req,res)=>{
  console.log(`Escuchando en el puerto ${PORT}`)
})