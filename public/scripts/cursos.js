/**************CURSOS********************/
let cursos = []

async function cursosPages(){
    const response = await fetch('../scripts/arrayCursos.json')
    cursos =  await response.json()
    console.log(cursos)
    generarCursos()
}

cursosPages()


function generarCursos() {   
    let lista = ''
    let agregado = true
    let btn = []
    for (let i = 0; i < cursos.length; i++) {
        agregado = Boolean(carrito.filter((element) => element.id == cursos[i].id).length)
        agregado ? btn = ['btn-success', 'Agregado'] : btn = ['btn-primary', 'Comprar']
        lista += cardCurso(cursos[i], btn)
    }
    document.getElementById('listaProductos').innerHTML = lista
}

//card de lista de los cursos
function cardCurso({ nombre, subtitle, precio, id }, btn) {
    return `<div class="col-md-4 curso">
                <div class="card">
                    <div class="nombreCurso"><p>${nombre}</p></div><br><br>
                    <div class="subtitleCurso">
                        <p>${subtitle}</p>
                        <p>$ ${precio}</p>
                    </div>
                    <div class="botonCurso"><button onclick="agregar(${id})" class="btn ${btn[0]}" data-toggle="modal" data-target="#exampleModalCenter">${btn[1]}</button></div>
                </div>
            </div>`
}

//Agregar un item al carrito
function agregar(id) {
    let count = Boolean(carrito.filter((element) => element.id == id).length)
    if (count == false) {
        let curso = cursos.filter((elemento) => elemento.id === id)
        carrito.push(curso[0])
        localStorage.setItem("carrito", JSON.stringify(carrito))
        document.getElementById("carritoCantidad").innerHTML = `Carrito (${carrito.length})`
        swal({
            title: "Felicitaciones!",
            text: "Haz agregado el producto al carrito.",
            icon: "success",
            buttons: {
                cancel: "Seguir comprando",
                defaut: "Ir al carrito"
            }
        })
        .then(value => {
            switch (value) {
                case "defaut":
                    location.href='/carrito'
                    break
                default:
                    generarCursos()
            }
        });
    }
    else {
        swal({
            title: "Atención!",
            text: "Ya has agregado el producto.",
            icon: "warning",
        });
    }
}
