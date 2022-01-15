const express = require("express");
const dbConnect = require("./utils/dbConnect");
const cors = require("cors");
const morgan = require("morgan");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors()); // active cors
        this.app.use(express.json()); // body
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan("dev"));
    }

    async dbConnection() {
        await dbConnect();
    }

    configs() {
        this.app.use(express.static(path.join(__dirname, "../public")));
    }

    routes() {
        this.app.use("/api/users", require("./routes/users.routes"));
        this.app.use("/api/courses", require("./routes/courses.routes"));
        this.app.use("/api/auth", require("./routes/auth.routes"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening at ${this.port} :D`);
        });
    }
}

module.exports = Server;
