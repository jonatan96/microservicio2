var fs = require('fs');
var { HTTP_CODIGOS } = require('../config/codigos_http');
require('../server/config/connection');
var Cliente = require('../models/clientes');
var buscarTodos = require('../functions/validaciones');
var respuesta_json;

exports.dinamico = async (req, res) => {
    try {
        // variables
        let objeto_find, objeto_sort, respuesta_consulta;
        let arreglo = req.query;

        // se obtiene el json de respuesta
        respuesta_json = JSON.parse(fs.readFileSync("config/respuesta.json"));

        // obtener objeto para la busqueda dinamica
        let busquedaCliente = await buscarTodos.busquedaDinamica(arreglo);
        if (busquedaCliente.length === 0) {
            respuesta_consulta = await Cliente.find(); // busca todos los registros
            let respuesta = await buscarTodos.busqueda(respuesta_consulta);
            respuesta_json.mensaje = HTTP_CODIGOS._200.contexto._000.mensaje;
            respuesta_json.resultado = respuesta;
            return res.status(HTTP_CODIGOS._200.estatus).send(respuesta_json);
        } else {
            objeto_find = busquedaCliente.objetoValor[0];
            objeto_sort = busquedaCliente.objetoValor2[0];
            respuesta_consulta = await Cliente.find(objeto_find).sort(objeto_sort);
            respuesta_json.mensaje = HTTP_CODIGOS._200.contexto._000.mensaje;
            respuesta_json.resultado = respuesta_consulta;
            return res.status(HTTP_CODIGOS._200.estatus).send(respuesta_json);
        }
    } catch (error) {
        console.error("Error: " + error);
        respuesta_json.error = (error.message);
        respuesta_json.mensaje = HTTP_CODIGOS._500.contexto._101.mensaje;
        return res.status(HTTP_CODIGOS._500.estatus).send(respuesta_json);
    }
}
