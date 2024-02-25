const Usuario = require('../models/usuario');
const Mascota = require('../models/mascota');
const Role = require("../models/role");

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
};

const existeUsuarioById = async ( id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
};

const existenteNombre = async (nombre = '') => {
    const existeMascota = await Mascota.findOne({ nombre });
    if (existeMascota) {
        throw new Error(`La mascota con el nombre ${nombre} ya existe`);
    }
};

const existeMascotaById = async (id = '') => {
    const existeMascota = await Mascota.findOne({ _id: id });
    if (!existeMascota) {
        throw new Error(`La mascota con el ID ${id} no existe`);
    }
};

module.exports = {
    existenteEmail,
    existeUsuarioById,
    existenteNombre,
    existeMascotaById
};
