class Servicio {
    constructor(nombre, apellido, email, ubicacion, vehiculo, distancia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.ubicacion = ubicacion;
        this.vehiculo = vehiculo;
        this.distancia = distancia;
        
    }
}

//Variables
let storageCliente;
let miformulario = document.querySelector("#formulario");

//Listeners

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("nombre")) {
        cargarTabla();
    }
} )

miformulario.addEventListener("submit", validarFormulario,);
$('#submit').on('click', guardar);
$('#submit').on('click', historial);


function guardar() {
    let nombre = document.querySelector("#nombre").value;
    let apellido = document.querySelector("#apellido").value;
    let email = document.querySelector("#email").value;

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("email", email); 
}

//Solcitamos el tipo de vehiculo
function tipoVehiculo() {
    let vehiculo = document.querySelector("#vehiculo").value;
        switch(vehiculo){
            case "moto":
                return 2000;
            case "auto":
                return 4000;
            case "camioneta":
                return 5000;
            default : 2000; 
        }
}

//Solicitamos la distacia a la que lo va a trasladar

function distanciaDeTraslado() {
    let distancia = document.querySelector("#distancia").value;;
        for (let i = 1; i >=15; i++);{
            return resultado = distancia * 20;
        }
}

//Solicitamos su ubicacion aproximada para calcular el tiempo de espera.

function demoraDelServicio() {
    let ubicacion = document.querySelector("#ubicacion").value;
    switch(ubicacion){
        case "Caba":
            return "menor a 2hs";
        case "Mas lejos":
            return "menor a 4hs";
    }
}

//validamos el formulario

function validarFormulario(e) {
    //cancelamos el comportamiento del evento
    e.preventDefault();
    //obtenemos el elemento desde el cual se disparo el evento
    let miformulario = e.target

    const nombre = document.querySelector("#nombre").value; 
    const apellido = document.querySelector("#apellido").value;
    const email = document.querySelector("#email").value;
    const costoDelTraslado = tipoVehiculo() + distanciaDeTraslado();
    const tiempoDeEspera = demoraDelServicio();


    const servicio = new Servicio(nombre, apellido, email, costoDelTraslado, tiempoDeEspera);

    localStorage.setItem('historial', JSON.stringify(servicio));

    imprimir(servicio);

    miformulario.reset();

    $('#submit').on('click', aplicarEstilo());
    
    function aplicarEstilo() {
        document.getElementById("vent").style.display="block"
        
    };


}

//imprimimos el mensaje



function imprimir() {


 
    let costoDelTraslado = tipoVehiculo() + distanciaDeTraslado();
    let tiempoDeEspera = demoraDelServicio();

    const nuevoDiv = document.createElement ("div");

    nuevoDiv.classList.add("item");
    nuevoDiv.setAttribute("class", "ventana");

    const h1 = document.createElement("h1");
    h1.textContent = `Hola ${nombre.value}, tu tiempo de espera sera ${tiempoDeEspera} y el costo total es de $${costoDelTraslado}.`;
    nuevoDiv.setAttribute("class","text-center");
    nuevoDiv.appendChild(h1);

    const p = document.createElement("p");
    p.textContent = `En menos de 2 minutos te llegara un email a ${email.value} para que puedas seguir en tiempo real el servicio.`;
    nuevoDiv.appendChild(p);
    p.setAttribute("class", "text-center");

    const img = document.createElement("img");
    img.src = "imagenes/like.png";
    nuevoDiv.appendChild(img);

    let base = document.querySelector("#vent");
    
    base.innerHTML = '';
    base.appendChild(nuevoDiv);

 
    document.getElementById("vent").style.display="none";
    $("#vent").slideDown(800).slideUp(15000);
}


//Guardamos la informacion del servicio en el storage
function historial() {

    var nombre = document.querySelector("#nombre").value;
    var apellido = document.querySelector("#apellido").value;
    var costoDelTraslado = tipoVehiculo() + distanciaDeTraslado();
    var tiempoDeEspera = demoraDelServicio();


    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("costoDelTraslado", costoDelTraslado);
    localStorage.setItem("tiempoDeEspera", tiempoDeEspera);

    cargarTabla();
    
}



//Escuchamos el evento click del boton submit para agradecer la solicitud del servicio


$("#submit").click(() =>
$.ajax({
    url: '../index.json',
    success: function(respuesta) {
        $("#vent").prepend(`${respuesta[0].mensaje}`);
    },
    error: function() {
        console.log("No se ha podido obtener la información");
    }
}));


//Se modifica el dom con los ultimos servicios
function cargarTabla() {

    //Inserto los datos en la tabla
  
    var tr1 = document.createElement("tr");
    table.appendChild(tr1);

    var th4 = document.createElement("th");
    th4.textContent = `${localStorage.getItem("nombre")}`;
    tr1.appendChild(th4);

    var td1 = document.createElement("td");
    td1.textContent = `${localStorage.getItem("apellido")}`;
    tr1.appendChild(td1);

    var td2 = document.createElement("td");
    td2.textContent = `${localStorage.getItem("costoDelTraslado")}`;
    tr1.appendChild(td2);

    var td3 = document.createElement("td");
    td3.textContent = `${localStorage.getItem("tiempoDeEspera")}`;
    tr1.appendChild(td3);

    let base1 = document.querySelector("#table").style.border="none";
    $(base1).hide()

    $(base1).slideDown(1000);
}
