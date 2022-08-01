const fs = require('fs')
let ruta = __dirname+'/public/scripts/arrayCursos.json'

let getAll = ()=>{
  const data = JSON.parse(fs.readFileSync(ruta,'utf-8'))
  return data
}

let encontrar = (id) =>{
  const data = getAll()
  let producto = data.find(elemento => elemento.id==id)
  if (producto){
    return producto
  }
  else{
    return 'El producto no se ha encontrado'
  }
}

let escribir = (array) =>{
  const data = JSON.stringify(array)
  fs.writeFileSync(ruta,data,'utf-8')
}

let agregar = (producto) =>{
  const data = getAll()
  producto.id = data.length+1
  data.push(producto)
  escribir(data)
  return producto
}

let modificar = (id,campos) =>{
  campos.id = id
  const data = getAll()
  data[id-1] = campos
  escribir (data)
}

let eliminar= (id) =>{
const data = getAll()
data.splice(id-1,id)
escribir(data)
}

exports.getAll = getAll
exports.encontrar = encontrar
exports.escribir = escribir
exports.agregar = agregar
exports.modificar = modificar
exports.eliminar = eliminar