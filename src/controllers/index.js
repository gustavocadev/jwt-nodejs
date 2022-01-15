const users = require("./users.controllers");
const courses = require("./courses.controllers");
const auth = require("./auth.controllers");

module.exports = {
    ...users,
    ...courses,
    ...auth,
};
