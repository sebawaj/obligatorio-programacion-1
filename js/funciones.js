//Iniciar sistema
let sistema = new Sistema();

//Agrego datos al sistema para que queden precargados en la página y poder hacer testeos
let empleado1 = new Empleado("José Perez", 12345, "Canelones", "44");
let empleado2 = new Empleado("Sofia", 54321, "Artigas", "25");
let empleado3 = new Empleado("Ramón", 77777, "Artigas", "25");
let empleado4 = new Empleado("Mojojojo", 456987123, "Salto", "14");
let rubro1 = new Rubro("Jardinero", "Plantas");
let rubro2 = new Rubro("Mecánico", "Autos, motos");
let rubro3 = new Rubro("Profesor", "Enseñar");
let oferta1 = new Oferta("José Perez", "12345", "Jardinero", "Corta el pasto", "5000");
let oferta2 = new Oferta("Sofia", "54321", "Jardinero", "Corta el pasto", "2000");
let oferta3 = new Oferta("Ramón", "77777", "Profesor", "Enseñar", "4000");
let oferta4 = new Oferta("Mojojojo", "456987123", "Jardinero", "Regar", "7000");
let oferta5 = new Oferta("Mojojojo", "456987123", "Profesor", "Inglés", "20000");

//Pruebas del sistema para ver si anda
// sistema.agregarEmpleado(empleado1);
// sistema.agregarEmpleado(empleado2);
// sistema.agregarEmpleado(empleado3);
// sistema.agregarEmpleado(empleado4);
// sistema.agregarRubro(rubro1);
// sistema.agregarRubro(rubro2);
// sistema.agregarRubro(rubro3);
// sistema.agregarOferta(oferta1);
// sistema.agregarOferta(oferta2);
// sistema.agregarOferta(oferta3);
// sistema.agregarOferta(oferta4);
// sistema.agregarOferta(oferta5);

//Actualizo la página
actualizarEmpleados();
actualizarRubros();
actualizarBajaOferta();
actualizarRubroConsultas();
actualizarTablaEmpleados();
actualizarTablaRubroConsultas();
actualizarMaximaYMinimaRubros();



//cuando carga la página se activa la función inicio
window.addEventListener("load", inicio); 

//pone en funcionamiento los addEvenListener esperando que suceda el evento submit
//de los form que tenemos localizados mediante su id
function inicio(){
    document.getElementById("empleadoForm").addEventListener("submit", agendaEmpleado);
    document.getElementById("rubroForm").addEventListener("submit", agregarRubro);
    document.getElementById("altaOfertaForm").addEventListener("submit", agregarAltaOferta);
    document.getElementById("bajaOfertaForm").addEventListener("submit", botonBajaOferta);
    document.getElementById("consultasRubro").addEventListener("submit", botonRubroConsultas);
    document.getElementById("rubroPrecio").addEventListener("input", function(){inputChecker(this)});
    document.getElementById("edadEmpleado").addEventListener("input", function(){inputChecker(this)});
}

function inputChecker(inputObject) {
    //console.log(String(inputObject.value));
    cantidadNumeros = String(inputObject.value).length;
    ///console.log(cantidadNumeros);
    if(parseInt(cantidadNumeros) > 30) {
        alert("El máximo de carácteres es 30!");
    }
}

//Extrae la información ingresada por el usuario y la guarda en el sistema --> sistema.listaEmpleados
function agendaEmpleado(event) {
    event.preventDefault();

    // Extraer los datos del empleado desde los campos(inputs)
    let nombre = document.getElementById("nombreEmpleado").value;
    let cedula = document.getElementById("cedulaEmpleado").value;
    let departamento = document.getElementById("departamentoEmpleado").value;
    let edad = document.getElementById("edadEmpleado").value;

    //Si encontramos una cédula idéntica le mostramos un alert al usuario,
    //si no encontramos nada procedemos a ingresar al nuevo empleado a la base de datos.
    if(ceduValidator(cedula)){
        alert("Su cédula de identidad coincide con otro empleado.\nNo puede registrarse.")
    } else {
        // Crear el objeto empleado
        let empleado = new Empleado(nombre, cedula, departamento, edad)
        // Guardar el objeto empleado
        //Agregar el objeto al arreglo(pushearlo) al objeto sistema
        sistema.agregarEmpleado(empleado);
        this.reset();
    }

    //actualizo el select de la página
    actualizarEmpleados();
    actualizarTablaEmpleados();
}


// Pone en minúscula a todo string y su primera letra en mayúscula
// function nombreLindo(String) {
//     return String.toLowerCase.
// }

// Comprobar si hay otro empleado con la misma cédula, true si encuentra una igual
// Esta función se va a utilizar para el chequeo de la cédula
// Si el validator es = a true hay dos cédulas igual y no me va a dejar ingresar el empleado
function ceduValidator(cedula) {
    let ceduValidator = false;
    for(let i = 0; i < sistema.listaEmpleados.length;i++){
        if(sistema.listaEmpleados[i].cedula === cedula){
            ceduValidator = true;
            break;
        }
    }
    return ceduValidator;
}

function rubroValidator(rubro) {
    let rubroValidator = false;
    for(let i = 0; i < sistema.listaRubros.length;i++){
        if(sistema.listaRubros[i].nombre.toLowerCase() === rubro.toLowerCase()){
            rubroValidator = true;
            break;
        }
    }
    return rubroValidator;
}

//Extraemos los datos de los input del formulario referente al Rubro
function agregarRubro(event) {
    //Prevenimos que se ejecute el Post que viene por defecto en el form
    event.preventDefault();
    //extraer dato Nombre
    let rubroNombre = document.getElementById("rubroNombre").value;
    //extraer dato Descripción
    let rubroDescripcion = document.getElementById("rubroDescripcion").value;

    //validator de nombre de rubro
    if(rubroValidator(rubroNombre)) {
        alert("El nombre ya existe.");
    } else {
        //crear el objeto (CLASS RUBRO)
        let rubroObj = new Rubro(rubroNombre, rubroDescripcion);
        //el console.log lo utilizo para ir mirando en el navegador en inspecionar y ir viendo como va quedando el objeto
        //console.log(rubroObj);
        
        //guardarlo pushearlo al sistema
        sistema.agregarRubro(rubroObj);
        //console.log("El rubro: " +rubroObj.nombre+ " a sido agregado al sistema con éxito.")
        //console.log(sistema.listaRubros)
        
        //limpiar los campos del form
        this.reset();
    
        actualizarRubros();
        actualizarRubroConsultas();
        actualizarMaximaYMinimaRubros();
    }

}

function agregarAltaOferta(event){
    //Prevenimos que se ejecute el Post que viene por defecto en el form
    event.preventDefault();

    //extraemos el valor del option que es el index de donde se encuentra nuestro objeto empleado selecionado por el usuario 
    let valorIndexEmpleado = document.getElementById("selectAltaOfertaEmpleado").value
    let empleado = sistema.listaEmpleados[Number(valorIndexEmpleado)];
    let nombreEmpleado = empleado.nombre;
    let cedulaEmpleado = String(empleado.cedula);

    let nombreRubro = document.getElementById("selectAltaOfertaRubro").value;
    let detalle = document.getElementById("rubroDetalle").value;
    let precio = document.getElementById("rubroPrecio").value;

    if(altaOfertaValidator(cedulaEmpleado, nombreRubro)) {
        alert("Ya tiene una oferta a su nombre en un mismo rubro.")
    } else {
        //creamos el objeto ofertas
        let ofertaObj = new Oferta(nombreEmpleado, cedulaEmpleado, nombreRubro, detalle, precio)
        //console.log(ofertaObj);
        //Guardamos el objeto en nuestra base de datos sistema.listaOfertas
        sistema.agregarOferta(ofertaObj);
        this.reset();
        actualizarBajaOferta();
        actualizarTablaEmpleados();
        actualizarTablaRubroConsultas();
        actualizarMaximaYMinimaRubros();
    }
}

//Chequear que no se repita la oferta de un empleado con un rubro, solo pude haber una oferta por cada uno de ellos(empleado)
//true si encuentra coincidencias, osea tenemos que evitar que se agrege a nuestra base de datos ya que no pueden repetirse
function altaOfertaValidator(cedulaEmpleado, nombreRubro, detalle) {
    let validator = false;
    for(let i = 0; i < sistema.listaOfertas.length;i++){
        if(sistema.listaOfertas[i].cedulaEmpleado === cedulaEmpleado &&
            sistema.listaOfertas[i].rubro === nombreRubro){
                validator = true;
            break;
        }
    }
    return validator;
}

//actualizo el select de la página
function actualizarEmpleados(){
    let empleadosSelectHTML = document.getElementById("selectAltaOfertaEmpleado");
    //limpiamos el html para agregar una nueva seleción actualizada
    empleadosSelectHTML.innerHTML = "";
    //añadimos los empleados
    //el for recorre el arreglo que tenemos todos los empleados, le extraemos el nombre y le injectamos el formato
    //`<option selected>${variable}</option>` dentro del select correspondiente
    for(let i = 0; i < sistema.listaEmpleados.length;i++) {
        //empleadosSelectHTML.innerHTML += `<option selected>${sistema.listaEmpleados[i].nombre}</option>`
        empleadosSelectHTML.innerHTML += "<option value="+i+">"+sistema.listaEmpleados[i].nombre+
        ", "+sistema.listaEmpleados[i].cedula+"</option>";
    }
    //Poner la primera opción en el navegador(en el select)
    document.getElementById("selectAltaOfertaEmpleado").options.selectedIndex = 0;
}

function botonBajaOferta(event) {
    //Prevenimos que se ejecute el Post que viene por defecto en el form
    event.preventDefault();
    let combobox = document.getElementById("selectBajaOferta").innerHTML;
    if(combobox === "<option>Sin Datos</option>"){
        alert("No tiene datos para borrar");
    } else {
        bajaOferta();
    }
}

// Borramos oferta del sistema
function bajaOferta(index){
    let text = "Se borrará la oferta!\nEither Borrar or Cancelar.";
    //si se confirma se borra el empleado del la base de datos
    if (confirm(text) == true) {
        borrarOferta(index);
        arregloActualizadoOfertas();
        actualizarTablaEmpleados();
        actualizarBajaOferta();
        actualizarMaximaYMinimaRubros();
      console.log("You pressed OK!");
    } else {
        console.log("You canceled!"); 
    }
}

// Borrar Oferta mediante el index --> sistem.listaOfertas()
function borrarOferta(){
    let valorIndexOferta = document.getElementById("selectBajaOferta").value
    sistema.listaOfertas[Number(valorIndexOferta)] = "";
}

// Actualizar Arreglo de Ofertas- Sacamos el espacio en blanco del arreglo [obj, obj, "", obj] --> [obj, obj, ob]
function arregloActualizadoOfertas(){
    let arregloLimpio = [];
    for(let i=0; i<sistema.listaOfertas.length;i++) {
        if(typeof sistema.listaOfertas[i] === "object"){
            arregloLimpio.push(sistema.listaOfertas[i]); 
        }
    }
    sistema.listaOfertas = arregloLimpio;
}

// Actualiza la página agregando las ofertas en el combobox
function actualizarBajaOferta(){
    //guardamos la dirección del select en una variable
    let bajaOfertaSelectHTML = document.getElementById("selectBajaOferta");

    if(sistema.listaOfertas.length === 0) {
        bajaOfertaSelectHTML.innerHTML = "";
        bajaOfertaSelectHTML.innerHTML = "<option>Sin Datos</option>";
    } else {
        //limpiamos el html para agregar una nueva seleción actualizada
        bajaOfertaSelectHTML.innerHTML = "";
        //añadimos los rubros
        //el for recorre el arreglo que tenemos todos los rubros, le extraemos el nombre y le injectamos el formato
        //`<option selected>${variable}</option>` dentro del select correspondiente

        /*
        Recorre el arreglo sistema.listaOfertas y extraemos los valores de cada objeto,
        estos objetos son de la clase Oferta, colocamos los valores que necesitamos dentro de un
        <option> y también le damos un valor que hace referencia el index de donde se
        extrajo el objeto del arreglo sistema.listaOfertas, con eso podremos localizarlo
        para poder borrarlo en otra función. Luego injectamos el objeto creado en el select
        y vamos concatenando todos los <option> que se encuentren y generen en el recorrido
        del arreglo sistema.listaOfertas
        En cada option guardamos el index de cada objeto.
        */
        for(let i = 0; i < sistema.listaOfertas.length;i++) {
            //bajaOfertaSelectHTML.innerHTML += `<option selected>${sistema.listaOfertas[i].rubro}</option>`
            bajaOfertaSelectHTML.innerHTML += 
            "<option value="+ i +">Rubro: "+sistema.listaOfertas[i].rubro+
            " Empleado: "+sistema.listaOfertas[i].nombreEmpleado+
            " Cédula: "+sistema.listaOfertas[i].cedulaEmpleado+
            " Detalle: "+sistema.listaOfertas[i].detalle+
            " Precio: "+sistema.listaOfertas[i].precio+
            "</option>";
        }
        //Poner la primera opción en el navegador(en el select)
        document.getElementById("selectAltaOfertaRubro").options.selectedIndex = 0;
    }
}

//actualizo el select de la página
function actualizarRubros(){
    //guardamos la dirección del select en una variable
    let rubrosSelectHTML = document.getElementById("selectAltaOfertaRubro");
    //limpiamos el html para agregar una nueva seleción actualizada
    rubrosSelectHTML.innerHTML = "";
    //añadimos los rubros
    //el for recorre el arreglo que tenemos todos los rubros, le extraemos el nombre y le injectamos el formato
    //`<option selected>${variable}</option>` dentro del select correspondiente
    for(let i = 0; i < sistema.listaRubros.length;i++) {
        //rubrosSelectHTML.innerHTML += `<option selected>${sistema.listaRubros[i].nombre}</option>`
        rubrosSelectHTML.innerHTML += "<option selected>"+sistema.listaRubros[i].nombre+"</option>";
    }
    //Poner la primera opción en el navegador(en el select)
    //document.getElementById("selectAltaOfertaRubro").options.selectedIndex = 0;
}

// actualizo el select de la página --- Agregar los rubros disponibles en la página
function actualizarRubroConsultas() {
    //guardamos la dirección del select en una variable
    let rubrosSelectHTML = document.getElementById("selectRubroConsultas");
    //limpiamos el html para agregar una nueva seleción actualizada
    rubrosSelectHTML.innerHTML = "";

    if(sistema.listaRubros.length === 0) {
        rubrosSelectHTML.innerHTML += "<option>Sin datos</option>";
    } else {
        //añadimos los rubros
        //el for recorre el arreglo que tenemos todos los rubros, le extraemos el nombre y le injectamos el formato
        for(let i = 0; i < sistema.listaRubros.length;i++) {
            rubrosSelectHTML.innerHTML += "<option>"+sistema.listaRubros[i].nombre+"</option>";
        }
        //Poner la primera opción en el navegador(en el select)
        // document.getElementById("selectRubroConsultas").options.selectedIndex = 0;
    }
}

// Extraer los valores para procesar el pedido al activarse el evento (form)
function botonRubroConsultas(event){
    event.preventDefault();
    actualizarTablaRubroConsultas();
}


// Extraer el costo promedio
function costoPromedio(arreglo){
    let promedio=0;
    let sumaTotal=0;
    let cantidadDeNumeros = arreglo.length;

    if(cantidadDeNumeros === 0) {
        promedio=0;
    } else {
        for(let i = 0; i<arreglo.length;i++) {
            sumaTotal += parseInt(arreglo[i].precio);
        }
        promedio = Math.ceil(parseInt(sumaTotal) / parseInt(cantidadDeNumeros));
    }
    return promedio;
}

// Extracción de datos por rubro
// crear un arreglo con los empledos y el rubro selecionado por el usuario
function extraerRubros(rubro) {
   // console.log(rubro);
   let consultasArr = [];
   //recorro todo sistema.listaOfertas
   for(let i = 0; i<sistema.listaOfertas.length;i++) {
        //Busco las ofertas que tengan el rubro que el usuario ingresó en el combobox
        if(sistema.listaOfertas[i].rubro === rubro) {
            //extramos la cedula que nos viene del objeto class Oferta
            let indexEmpleado = buscarIndexEmpleadoPorCedula(sistema.listaOfertas[i].cedulaEmpleado);
            let empleado = sistema.listaEmpleados[indexEmpleado];
            let objetoConsultas = {};

            /*
            El objetoConsultas fue creado para darle forma a los datos que se mostrarán en pantalla en la tabla
            de consultas.
            */ 
            objetoConsultas.nombreEmpleado = empleado.nombre;
            objetoConsultas.departamento = empleado.departamento;
            objetoConsultas.detalle = sistema.listaOfertas[i].detalle
            objetoConsultas.precio = sistema.listaOfertas[i].precio

            consultasArr.push(objetoConsultas);
        }
    }

    return consultasArr;
}

// Ordenar arreglo de rubros, dependiendo del criterio
function ordenarRubrosConCriterio(arreglo) {
    if(document.getElementById("precioCreciente").checked){
        ordenPrecio(arreglo);
    }
    if(document.getElementById("nombreCreciente").checked){
        ordenDepartamento(arreglo);
    }
}

function ordenPrecio(arreglo) {
    arreglo.sort((a, b) => {
        return parseInt(a.precio) < parseInt(b.precio);
    });
}

function ordenDepartamento(arreglo) {
    arreglo.sort((a, b) => {
        return a.departamento > b.departamento;
    });
}

//buscar empleado por cedula, nos da el index de donde se encuentra el empleado en el sistema.listaEmpleados
function buscarIndexEmpleadoPorCedula(cedulaNum) {
    let index = 0;
    for(let i = 0; i<sistema.listaEmpleados.length; i++) {
        let cedulaABuscar = sistema.listaEmpleados[i].cedula;
        if(parseInt(cedulaABuscar) === parseInt(cedulaNum)) {
            index = i;
            break;
        }
    }
    return index;
}

// Injectar las ofertas en la tabla Oferta de un rubro
function actualizarTablaRubroConsultas(){

    //Select DOM
    let selectDir = document.getElementById("selectRubroConsultas");
    //String del rubro a buscar
    let rubro = selectDir.options[selectDir.selectedIndex].text;
    //Array elegido por rubro
    let arreglo = extraerRubros(rubro);

    //Titulo
    let promedio = costoPromedio(arreglo);
    let titulo = document.getElementById("tituloPromedioRubro");
    titulo.innerHTML = "Rubro: "+rubro+" Promedio: "+ promedio +"";
    let rango = rangoDePrecioRubro(arreglo);
    
    //lista
    let body = document.getElementById("employeesTable");
    body.innerHTML = "";

    tipoPorRangoPrecio(arreglo, rango);
    ordenarRubrosConCriterio(arreglo);

    for(let i = 0; i < arreglo.length;i++) {
        body.innerHTML += "<tr><td>"+arreglo[i].nombreEmpleado+
        "</td><td>"+arreglo[i].departamento+
        "</td><td>"+arreglo[i].detalle+
        "</td><td>"+arreglo[i].precio+
        "</td><td>"+arreglo[i].tipo+"</td></tr>";
    }
}


// Rango = número menor - número mayor
function rangoDePrecioRubro(rubro){
    let rango = 0;
    let mayor = 0;
    let menor = 0;
    if(rubro.length<0){
        menor = Number(rubro[0].precio);
    }

    //mayor
    for(let i = 0; i<rubro.length;i++){
        if(mayor < Number(rubro[i].precio)) {
            mayor = Number(rubro[i].precio);
        }
    }
    //menor
    for(let i = 0; i<rubro.length;i++){
        if(menor > Number(rubro[i].precio)) {
            menor = Number(rubro[i].precio);
        }
    }
    rango = mayor - menor;
    return rango;
}


/*
    rango
    Agarrar el rango y hacerle el 75÷
    Haciendo eso te da igual que el ejemplo
*/
// Agregarle un valor al objeto para que tenga $$$$ según el rango de su precio
function tipoPorRangoPrecio(rubros, rango){
    //rango es el 100%
    //console.log(rango);
    //El 75% del rango
    let porcentaje1 = (75 / 100) * rango;
    //console.log(porcentaje1);
    //El 50% del rango
    let porcentaje2 = (50 / 100) * rango;
    //El 25% del rango
    let porcentaje3 = (25 / 100) * rango;

    for(let i = 0; i<rubros.length;i++){
        // RANGO DE PRECIOS $$$$ CADENA DE IFS
        if(rubros[i].precio > porcentaje1) {
            rubros[i].tipo = "$$$$";
        } else if(rubros[i].precio > porcentaje2){
            rubros[i].tipo = "$$$";
        } else if(rubros[i].precio > porcentaje3){
            rubros[i].tipo = "$$";
        } else {
            rubros[i].tipo = "$";
        }
    }
}

// Actualizar tabla de empleados
function actualizarTablaEmpleados() {

    let body = document.getElementById("tablaDeEmpleados");
    body.innerHTML = "";

    //Crear un nuevo array único
    let empleados = [];
    
    for(let i = 0; i<sistema.listaEmpleados.length;i++) {
        empleados.push(sistema.listaEmpleados[i]);
    }
    
    //sistema.listaEmpleados.forEach(function(a){empleados.push(a)})
    
    //Ordenar ese array único
    empleados.sort((a, b) => {
        return a.nombre > b.nombre;
    });
    
    for(let i = 0; i < empleados.length;i++) {
        body.innerHTML += "<tr><td>"+empleados[i].nombre+
        "</td><td>"+empleados[i].cedula+
        "</td><td>"+empleados[i].departamento+
        "</td><td>"+empleados[i].edad+
        "</td><td>"+cantidadDeOfertasEmpleado(empleados[i].cedula)+"</td></tr>";
    }
}

//Cantidad de ofertas por empleado
//ingreso la cedula y cuanto la cantidad de ofertas que hay a su nombre en sistema.listaOfertas
function cantidadDeOfertasEmpleado(cedulaEmpleado) {
    let contador = 0;
    for(let i = 0; i<sistema.listaOfertas.length;i++){
        let cedula = parseInt(sistema.listaOfertas[i].cedulaEmpleado);
        if( cedula == cedulaEmpleado) {
            contador+=1;
        }
    }
    return contador;
}

// Mostar en pantalla rubros sin ofertas = 0
function actualizarMaximaYMinimaRubros(){
    let rubros = extraerRubrosExistentes();
    buscarOfertasPorRubro(rubros);
    mostrarRubrosSinOfertas(rubros);
    mostrarRubrosConMaxOfertas(rubros);
    
}

// Extraer rubros existentes sistema.listaRubros
function extraerRubrosExistentes() {
        //Crear un nuevo array único
        let rubros = [];
        for(let i = 0; i<sistema.listaRubros.length;i++) {
            rubros.push(sistema.listaRubros[i]);
        }
        return rubros;
}

// Buscar si tienen oferta y contar sistema.listaOfertas
function buscarOfertasPorRubro(rubrosArr) {
    //Recoro el arrey de los rubros
    for(let i = 0; i<rubrosArr.length;i++){
        let contador = 0;
        //console.log(rubrosArr[i].nombre);
        //recorro y comparo cada rubro con cada objeto del arreglo de las ofertas en sistema.listaOfertas
        for(let j = 0; j<sistema.listaOfertas.length;j++){
            //console.log(sistema.listaOfertas[j].rubro);
            if(sistema.listaOfertas[j].rubro === rubrosArr[i].nombre) {
                contador += 1;
            }
        }
        //una vez que el contador tenga todo los datos creamos una nueva key para guardar la cantidad de ofertas
        rubrosArr[i].cantidadOfertas = contador;
        //console.log(rubrosArr[i]);
    }
}

// Mostrar en pantalla rubros con máxima cantidad de ofertas
function mostrarRubrosConMaxOfertas(rubros){
    let numeroMayor = numeroMayorOfertas(rubros);
    let liHTML = document.getElementById("rubMax");
    liHTML.innerHTML = "";
    if(rubros.length>0){
        for(let i = 0; i<rubros.length;i++){
            if(rubros[i].cantidadOfertas === numeroMayor && rubros[i].cantidadOfertas > 0) {
                // console.log(rubros[i].nombre);
                // console.log(rubros[i].cantidadOfertas);
                // console.log(rubros[i]);
                let mensaje = "<li>"+rubros[i].nombre+" "+rubros[i].descripcion+"</li>";
                liHTML.innerHTML += mensaje;
            }
        }
    }
    if(liHTML.innerHTML===""){
        liHTML.innerHTML = "";
        let mensaje = "<li>Sin Datos</li>";
        liHTML.innerHTML = mensaje;
    }
}

// Obtener el número mayor
function numeroMayorOfertas(rubros) {
    let numeroMayor = 0;
    for(let i = 0; i<rubros.length;i++) {
        if(rubros[i].cantidadOfertas>numeroMayor) {
            numeroMayor = rubros[i].cantidadOfertas;
        }
    }
    return numeroMayor;
}

// Mostrar en pantalla rubros sin ofertas
function mostrarRubrosSinOfertas(rubros){
    console.log(rubros);
    let ulHTML = document.getElementById("rubSinOfertas");
    ulHTML.innerHTML = "";
    for(let i = 0; i<rubros.length;i++){
        if(rubros[i].cantidadOfertas === 0) {
            let mensaje = "<li>"+rubros[i].nombre+" "+rubros[i].descripcion+"</li>";
            ulHTML.innerHTML += mensaje;
        }
    }
    if(rubros.length===0 || ulHTML.innerHTML==="") {
        let mensaje = "<li>Sin Datos</li>";
        ulHTML.innerHTML = mensaje;
    }
}