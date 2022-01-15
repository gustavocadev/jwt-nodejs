const bcryptjs = require("bcryptjs");
const User = require("../models/User");

const getUsers = async (req, res) => {
    const users = await User.find({
        state: true,
    });

    res.json(users);
};

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    res.json(user);
};

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });

    // hash of the password
    try {
        const salt = await bcryptjs.genSalt();
        newUser.password = await bcryptjs.hash(password, salt);
    } catch (error) {
        console.log(error);
        return res.json({
            msg: "error al encryptar los datos :D",
        });
    }

    await newUser.save();

    res.json(newUser);
};

const updateUser = async (req, res) => {
    const { id } = req.params;

    const userUpdated = {
        ...req.body,
    };

    const { password } = userUpdated;

    if (password) {
        // hash password
        const salt = await bcryptjs.genSalt();
        userUpdated.password = await bcryptjs.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, userUpdated, {
        new: true,
    });

    res.json(user);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    const userDeleted = await User.findByIdAndUpdate(
        id,
        { state: false },
        {
            new: true,
        }
    );

    res.json(userDeleted);
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
