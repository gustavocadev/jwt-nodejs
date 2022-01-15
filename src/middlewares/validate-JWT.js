const jwt = require("jsonwebtoken");
const User = require("../models/User");

const validateJWT = async (req, res, next) => {
    const tokenOfUser = req.header("authorization");

    // if not exists a JWToken
    if (!tokenOfUser) {
        return res.status(401).json({
            msg: "No hay jwt en la petición :/",
        });
    }

    // if exists we need to validate it
    try {
        // jwt.verify() return us the payload :D
        const { uid } = jwt.verify(
            tokenOfUser,
            process.env.SECRET_OR_PRIVATE_KEY
        );

        // search the info of the user in our database
        const user = await User.findById(uid);

        // we need to validate if the user doesn't exists
        if (!user) {
            return res.status(401).json({
                msg: "El usurio no existe, o el token no es valido :/",
            });
        }
        // verify if the uid is in state false
        if (!user.state) {
            return res.status(400).json({
                msg: "el usuario está desactivado, state: false",
            });
        }
        // set req.user globally in our application, and that's it :D
        console.log("this is your data =>", user);
        req.user = user;
        // continue with the next middleware :)
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no valido - Usuario no existe",
        });
    }
};

module.exports = {
    validateJWT,
};
