var fs = require('fs');
var microservicio = require('./consumeApi');
// sección disponibles de la biblioteca
var arreglo = ["Ciencias", "Humanidades", "Historia", "Política"];

exports.buscarExistenciaLibros = async function(objeto) {
    let bandera = null;
    for (let index = 0; index < objeto.length; index++) {
        let respuesta = await microservicio.obtener_libros(objeto[index]);
        if ((respuesta.resultado).length > 0) {
            console.log("Libro Disponible.");
            bandera++;
        }
    }
    return bandera ? bandera:null;
}


exports.buscar = function (valor) {
    let incluye = arreglo.includes(valor);
    if (incluye) {
        return true;
    }
    return false;
}

exports.busqueda = async function (libros) {
    let arreglo = [];
    let objeto = {};
    libros.forEach(element => {
        objeto = {
            id: element._id,
            nombre: element.nombre,
            apellidos: element.apellidos,
            lista_libros: element.lista_libros,
            createdAt: element.createdAt
        };
        arreglo.push(objeto);
    });
    return arreglo;
}

exports.busquedaDinamica = function (array) {
    let arregloColumnas = ['id', 'seccion_biblioteca', 'createdAt', 'nombre', 'autor'];
    let objetoValor = [];
    let objetoValor2 = [];
    let arregloBusqueda = [];
    let datosQuery = array; // rescatar datos de la query
    for (let propiedad in datosQuery) {
        if (datosQuery.hasOwnProperty(propiedad)) {
            let indice = arregloColumnas.indexOf(propiedad);
            if (indice !== -1) {
                objetoValor.push(JSON.parse(`{ "${propiedad}": "${datosQuery[propiedad]}" }`));// se guardan los objetos en el arreglo
                objetoValor2.push(JSON.parse(`{ "${propiedad}": 1 }`));
            }
        }
        arregloBusqueda = {
            objetoValor,
            objetoValor2
        }
    }
    console.log(arregloBusqueda);
    return arregloBusqueda;
}

