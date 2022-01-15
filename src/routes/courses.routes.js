const { Router } = require("express");
const { check } = require("express-validator");
const {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourse,
} = require("../controllers");
const validateInputs = require("../middlewares/validate-inputs");
const { validateJWT } = require("../middlewares/validate-JWT");

const router = Router();

router.get("/", validateJWT, getCourses);
router.get(
    "/:id",
    [check("id", "el id no es un mongo id").isMongoId(), validateInputs],
    getCourse
);
router.post(
    "/",
    [
        validateJWT,
        check("title", "el titulo es obligatorio").notEmpty(),
        validateInputs,
    ],
    createCourse
);
router.put(
    "/:id",
    [
        validateJWT,
        check("id", "el id no es un mongo id").isMongoId(),
        validateInputs,
    ],
    updateCourse
);
router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "el id no es un mongo id").isMongoId(),
        validateInputs,
    ],
    deleteCourse
);

module.exports = router;
