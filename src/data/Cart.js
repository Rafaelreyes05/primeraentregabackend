let fs = require('fs')

class Cart {
    constructor(path) {
        this.path= __dirname+path
    }

    readProducts(){
        let carritos = fs.readFileSync (this.path,'utf-8')
        carritos = JSON.parse(carritos)
        return carritos
    }

    getProducts() {
        let productos = this.readProducts()

        return productos
    }

    writeProducts(productos){
        fs.writeFileSync(this.path,JSON.stringify(productos))
    }

    addProduct(cid,pid) {
        let carritos = this.readProducts()
        let cartrepetido = {estado:false}
        let productorepetido = {estado:false}
        for(let i = 0;i<carritos.length;i++){            
            if(carritos[i].id==cid){
                cartrepetido={
                    estado:true,
                    number:i
                }
                for(let j =0;j<carritos[i].productos.length;j++){
                    if (carritos[i].productos[j].id==pid){
                        console.log(`el producto existe y se aumenta`)
                        productorepetido={
                            estado:true,
                            number:j
                        }
                    }
                }
            }
        }

        if (cartrepetido.estado){
            if (productorepetido.estado){
                carritos[cartrepetido.number].productos[productorepetido.number].quantity+=1
            }
            else{
                carritos[cartrepetido.number].productos.push({
                    id:pid,
                    quantity:1
                })
            }
        }
        else{
            carritos.push(
                {
                    id:cid,
                    productos:{
                        id:pid,
                        quantity:1
                    }
                }
            )
        }
    
        this.writeProducts(carritos)
    }

    getProductBYId(id) {
        let productos = this.readProducts()
        let producto = productos.find(producto => producto.id===id)
        console.log(producto)
        return producto
    }

    
}

let archivo = new Cart('/cart.json')

module.exports = archivo
