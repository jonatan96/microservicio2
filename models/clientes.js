var mongoose = require('mongoose');

var schema_cliente = new mongoose.Schema ({
    nombre:{
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    lista_libros: {
        type: Array,
        required: true
    }
},
{
    timestamps: true
});

var libros = new mongoose.model('Clientes', schema_cliente);

module.exports = libros;
