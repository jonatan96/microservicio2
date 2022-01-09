const axios = require('axios');
var fs = require('fs');
const microservicios = require('../config/microservicios.json');

const obtener_libros = async (dato) => {
    return new Promise(async (resolve, reject) => {
        try {
            let file_microservices = microservicios;
            let configuracion = file_microservices.obtenerLibros.url+dato;
            console.log(configuracion);
            let respuesta = await axios(configuracion);
            if (respuesta.data) {
                resolve(respuesta.data);
            }
            else {
                throw new Error('No se ha encontrado el data')
            }

        } catch (error) {
            console.log('Error en el consumo del servicio: ' + error.message);
            reject(["Error en el consumo del servicio"]);
        }
    });
};

module.exports = {
    obtener_libros
};
