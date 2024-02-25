const { Schema, model } = require('mongoose');

const MascotaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    especie: {
        type: String,
        required: [true, 'La especie es obligatoria']
    },
    edad: {
        type: Number,
        required: [true, 'La edad es obligatoria']
    },
    dueño: {
        type: String,
        required: [true, 'El dueño es obligatorio']

    }
});

module.exports = model('Mascota', MascotaSchema);
