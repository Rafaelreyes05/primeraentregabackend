/**************CARRITO********************/

function generarCarrito() {
    if (document.getElementById("lista")) {
        let lista = '';
        let total = 0;
        //genero el codigo html carrito
        if (carrito.length == 0) {
            document.getElementById("pago").innerHTML = "<p class='vacio'>Tu carrito esta vacio<p>";
            return
        }
        for (let i = 0; i < carrito.length; i++) {
            lista += card(carrito[i])
            total += carrito[i].precio;
        }
        document.getElementById("lista").innerHTML = lista
        document.getElementById("valortotal").innerHTML = `$ ${total}`
    }
}

// Card
//uso de Desestructuracion de un objeto
function card({nombre, id, precio}) {
    return `<div class="producto row">
                <div class="nombreCursoCarrito col-md-6">${nombre}</div>
                <div class="buttonEliminar col-md-4">
                    <button class="btn btn-primary" onclick="eliminar(${id})">Eliminar</button>
                </div>
                <div class="subtotal col-md-2">$ ${precio}</div>
            </div>`
}


//Eliminar
function eliminar(id) {
    let narray = []
    for (let x of carrito) {
        if (x.id != id) {
            narray.push(x)
        }
    }
    document.getElementById("carritoCantidad").innerHTML = `Carrito (${carrito.length})`
    localStorage.setItem("carrito", JSON.stringify(narray))
    carrito = JSON.parse(localStorage.getItem("carrito"))
    document.getElementById("carritoCantidad").innerHTML = `Carrito (${carrito.length})`
    generarCarrito()
}

generarCarrito()
