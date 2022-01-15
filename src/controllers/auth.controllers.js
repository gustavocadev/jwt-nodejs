const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");
const User = require("../models/User");

const login = async (req, res) => {
    // verify if exists an email
    const { email, password } = req.body;

    try {
        // searching in the DATABASE
        const userData = await User.findOne({ email });

        // if the exists a userData, so the user don't exits..
        if (!userData) {
            return res.status(400).json({
                msg: "La contraseña o el email no son correctos :(",
            });
        }

        // verify is the user is active
        if (!userData.state) {
            return res.status(400).json({
                msg: "El usuario no existe :( state - false",
            });
        }
        // verify password with bcryptjs
        const validatePassword = await bcryptjs.compare(
            password,
            userData.password
        );
        if (!validatePassword) {
            return res.json({
                msg: "La contraseña es incorrecta :/",
            });
        }

        // Generate Json Web Token
        const token = await generateJWT(userData._id);
        // response to the client
        res.json({
            userData,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Algo no va bien, no estás registrado :/",
        });
    }
};

module.exports = {
    login,
};
