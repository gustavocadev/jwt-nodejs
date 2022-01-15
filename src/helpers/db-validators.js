const User = require("../models/User");

const existsEmail = async (email = "") => {
    const emailFound = await User.findOne({ email });

    if (emailFound) {
        throw new Error("el correo ya existe :(");
    }
};

module.exports = {
    existsEmail,
};
