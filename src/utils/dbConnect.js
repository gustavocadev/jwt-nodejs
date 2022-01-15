const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Demo");
        console.log("Conectado 🚀");
    } catch (error) {
        console.log(error);
    }
};

module.exports = dbConnect;
