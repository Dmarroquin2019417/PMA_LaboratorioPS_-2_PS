const { response } = require('express');
const Mascota = require('../models/mascota');

const mascotasGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = {};

    try {
        const [total, mascotas] = await Promise.all([
            Mascota.countDocuments(query),
            Mascota.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            mascotas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al obtener las mascotas'
        });
    }
};

const getMascotaById = async (req, res) => {
    const { id } = req.params;

    try {
        const mascota = await Mascota.findById(id);

        if (!mascota) {
            return res.status(404).json({
                msg: 'Mascota no encontrada'
            });
        }

        res.status(200).json({
            mascota
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al obtener la mascota'
        });
    }
};

const mascotasPut = async (req, res) => {
    const { id } = req.params;
    const { nombre, especie, edad, dueño } = req.body;

    try {
        const mascotaActualizada = await Mascota.findByIdAndUpdate(id, { nombre, especie, edad, dueño }, { new: true });

        if (!mascotaActualizada) {
            return res.status(404).json({
                msg: 'Mascota no encontrada'
            });
        }

        res.status(200).json({
            msg: 'Mascota actualizada exitosamente',
            mascota: mascotaActualizada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar la mascota'
        });
    }
};

const mascotasDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const mascotaEliminada = await Mascota.findByIdAndDelete(id);

        if (!mascotaEliminada) {
            return res.status(404).json({
                msg: 'Mascota no encontrada'
            });
        }

        res.status(200).json({
            msg: 'Mascota eliminada exitosamente',
            mascota: mascotaEliminada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la mascota'
        });
    }
};

const mascotasPost = async (req, res) => {
    const { nombre, especie, edad, dueño } = req.body;

    try {
        const nuevaMascota = new Mascota({ nombre, especie, edad, dueño });
        await nuevaMascota.save();

        res.status(201).json({
            msg: 'Mascota creada exitosamente',
            mascota: nuevaMascota
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al crear la mascota'
        });
    }
};

module.exports = {
    mascotasGet,
    getMascotaById,
    mascotasPut,
    mascotasDelete,
    mascotasPost
};
