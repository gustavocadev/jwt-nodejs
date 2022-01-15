const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUsers,
} = require("../controllers");
const validateInputs = require("../middlewares/validate-inputs");
const { existsEmail } = require("../helpers/db-validators");
const { validateJWT } = require("../middlewares/validate-JWT");

router.get("/", validateJWT, getUsers);

router.get(
    "/:id",
    [
        validateJWT,
        check("id", "No es un id valido de mongodb").isMongoId(),
        validateInputs,
    ],
    getUser
);

router.post(
    "/",
    [
        check("email").custom((email) => existsEmail(email)),
        check("name", "El nombre es muy corto").isLength({
            min: 2,
        }),
        check(
            "password",
            "El password tiene que ser igual o mayor a 3 caracteres"
        ).isLength({
            min: 3,
        }),
        validateInputs,
    ],
    createUser
);

router.put(
    "/:id",
    [
        validateJWT,
        check("id", "No es un id valido de mongodb").isMongoId(),
        check("name", "El nombre es muy corto").isLength({
            min: 2,
        }),
        check(
            "password",
            "El password tiene que ser igual o mayor a 3 caracteres"
        ).isLength({
            min: 3,
        }),
        validateInputs,
    ],
    updateUser
);

router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "No es un id valido de mongodb").isMongoId(),
        validateInputs,
    ],
    deleteUser
);

module.exports = router;
