var fs = require('fs');
var { HTTP_CODIGOS } = require('../config/codigos_http');
require('../server/config/connection');
var Cliente = require('../models/clientes');
var buscarTodos = require('../functions/validaciones');
var respuesta_json;

exports.buscarTodos = async (req, res) => {
    try {
        // se obtiene el json de respuesta
        respuesta_json = JSON.parse(fs.readFileSync("config/respuesta.json"));
        const cliente = await Cliente.find().sort({ nombre: 1});
        let busquedaCliente = await buscarTodos.busqueda(cliente); // se hace un tratamiendo para los datos
        if (!cliente) {
            respuesta_json.mensaje = HTTP_CODIGOS._500.contexto._100.mensaje;
            respuesta_json.resultado = [];
            respuesta_json.error = cliente;
            return res.status(HTTP_CODIGOS._500.estatus).send(respuesta_json);
        }
        respuesta_json.mensaje = HTTP_CODIGOS._200.contexto._000.mensaje;
        respuesta_json.resultado = busquedaCliente;
        return res.status(HTTP_CODIGOS._200.estatus).send(respuesta_json);
    } catch (error) {
        console.error("Error: " + error);
        respuesta_json.error = (error.message);
        respuesta_json.mensaje = HTTP_CODIGOS._500.contexto._101.mensaje;
        return res.status(HTTP_CODIGOS._500.estatus).send(respuesta_json);
    }
}
