class Sistema {
  constructor(){
    this.listaEmpleados = [];
    this.listaRubros = [];
    this.listaOfertas = [];
  }
  agregarEmpleado(unElemento){
    this.listaEmpleados.push(unElemento);
  }
  agregarRubro(unElemento){
      this.listaRubros.push(unElemento);
  }
  agregarOferta(unElemento){
      this.listaOfertas.push(unElemento);
  }
}

class Empleado {
	constructor(nombre, cedula, departamento, edad){
    this.nombre = nombre;
    this.cedula = cedula;
    this.departamento = departamento;
    this.edad = edad;
  }
}

class Rubro {
	constructor(nombre, descripcion){
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}

class Oferta {
	constructor(nombreEmpleado, cedulaEmpleado, rubro, detalle, precio){
    this.nombreEmpleado = nombreEmpleado;
    this.cedulaEmpleado = cedulaEmpleado;
    this.rubro = rubro;
    this.detalle = detalle;
    this.precio = precio;
  }
}
