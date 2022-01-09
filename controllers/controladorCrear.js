var fs = require('fs');
var { HTTP_CODIGOS } = require('../config/codigos_http');
require('../server/config/connection');
var servicio = require('../functions/validaciones');
var Cliente = require('../models/clientes');
var respuesta_json;

exports.crear = async (req, res) => {
    try {
        let body = req.body;
        let lista_libros = req.body.lista_libros;
        // se obtiene el json de respuesta
        respuesta_json = JSON.parse(fs.readFileSync("config/respuesta.json"));
        // validar existencia del libro
        let respuesta_servicio = await servicio.buscarExistenciaLibros(lista_libros);
        if (!respuesta_servicio) {
            respuesta_json.mensaje = HTTP_CODIGOS._200.contexto._002.mensaje;
            respuesta_json.resultado = [];
            return res.status(HTTP_CODIGOS._200.estatus).send(respuesta_json);
        }
        // armado del body para el modelo
        let armadoBody = {
            nombre: body.nombre,
            apellidos: body.apellidos,
            lista_libros: body.lista_libros
        }
        const objetoCliente = new Cliente(armadoBody);
        if (!objetoCliente) {
            respuesta_json.mensaje = HTTP_CODIGOS._500.contexto._100.mensaje;
            respuesta_json.resultado = [];
            respuesta_json.error = objetoCliente;
            return res.status(HTTP_CODIGOS._500.estatus).send(respuesta_json);
        }
        let resultado = await objetoCliente.save();
        respuesta_json.mensaje = HTTP_CODIGOS._200.contexto._000.mensaje;
        respuesta_json.resultado = resultado;
        return res.status(HTTP_CODIGOS._200.estatus).send(respuesta_json);
    } catch (error) {
        console.error("Error: " + error);
        respuesta_json.error = (error.message);
        respuesta_json.mensaje = HTTP_CODIGOS._500.contexto._101.mensaje;
        return res.status(HTTP_CODIGOS._500.estatus).send(respuesta_json);
    }
}
