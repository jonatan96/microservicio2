var fs = require('fs');
var { HTTP_CODIGOS } = require('../config/codigos_http');
require('../server/config/connection');
var Cliente = require('../models/clientes');
var respuesta_json;

exports.eliminar = async (req, res) => {
    try {
        // se obtiene el json de respuesta
        respuesta_json = JSON.parse(fs.readFileSync("config/respuesta.json"));
        const clientes = await Cliente.findByIdAndDelete(req.params.id); // ELIMINADO FISICO
        console.log(clientes);
        if (!clientes) {
            respuesta_json.mensaje = HTTP_CODIGOS._400.contexto._012.mensaje;
            respuesta_json.resultado = [];
            respuesta_json.error = clientes;
            return res.status(HTTP_CODIGOS._400.estatus).send(respuesta_json);
        }
        respuesta_json.mensaje = HTTP_CODIGOS._200.contexto._000.mensaje;
        respuesta_json.resultado = [];
        return res.status(HTTP_CODIGOS._200.estatus).send(respuesta_json);
    } catch (error) {
        console.error("Error: " + error);
        respuesta_json.error = (error.message);
        respuesta_json.mensaje = HTTP_CODIGOS._500.contexto._101.mensaje;
        return res.status(HTTP_CODIGOS._500.estatus).send(respuesta_json);
    }
}
