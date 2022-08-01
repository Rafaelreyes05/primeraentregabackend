let carrito = []

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
    document.getElementById("carritoCantidad").innerHTML = `Carrito (${carrito.length})`
}