const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeMascotaById } = require('../helpers/db-validators');
const { mascotasPost, mascotasGet, getMascotaById, mascotasPut, mascotasDelete } = require('../controllers/pets.controller');

const router = Router();

router.get("/", mascotasGet);

router.get(
    "/:id",
    [
        check("id", "El ID no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ],
    getMascotaById
);

router.put(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], 
    mascotasPut
);

router.delete(
    "/:id",
    [
        check("id", "El ID no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ],
    mascotasDelete
);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("especie", "La especie es obligatoria").not().isEmpty(),
        check("edad", "La edad es obligatoria").not().isEmpty(),
        check("dueño", "El dueño es obligatorio").not().isEmpty(),
        validarCampos
    ],
    mascotasPost
);

module.exports = router;
