let fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path= __dirname+path
    }

    readProducts(){
        let productos = fs.readFileSync (this.path,'utf-8')
        productos = JSON.parse(productos)
        return productos
    }

    getProducts() {
        let productos = this.readProducts()
        return productos
    }

    getProductslimit(limit) {
        let productos = this.readProducts()
        let newProducts = []
        for(let i=0;i<limit;i++){
            newProducts.push(productos[i])
        }
        console.log('array con limite')
        console.log(newProducts)
        return newProducts
    }

    writeProducts(productos){
        fs.writeFileSync(this.path,JSON.stringify(productos))
    }

    addProduct(producto) {
        let productos = this.readProducts()
        let repetido = false
        productos.forEach(item=>{
            if (item.title==producto.title){
                repetido = true
            }
        })
        if(repetido){
            console.warn("El producto ya ha sido ingresado")
        }
        else{
            producto.id = productos[productos.length-1].id+1
            productos.push(producto)
            this.writeProducts(productos)
            console.log(`El producto ha sido ingresado con exito id:${producto.id}`)
        }
    }

    getProductBYId(id) {
        let productos = this.readProducts()
        let producto = productos.find(producto => producto.id===id)
        console.log(producto)
        return producto
    }

    updateProduct(id,newProducto){
        let productos = this.readProducts()
        productos [id-1] = {
            id:id,
            title:newProducto.title,
            description: newProducto.description,
            price: newProducto.price,
            thumbnail:newProducto.thumbnail,
            code:newProducto.code,
            stock:newProducto.stock,
            status:newProducto.status,
            category:newProducto.category
        }

        this.writeProducts(productos)

    }

    deleteProduct(id){
        let productos = this.readProducts()
        
        let newarray = []
        
        for(let i = 0; i<productos.length; i++){
            if (productos[i].id!=id){
                newarray.push(productos[i])
            }
        }
        this.writeProducts(newarray)
    }

    
}

let archivo = new ProductManager('/productos.json')

module.exports = archivo
