const Course = require("../models/Course");

const getCourses = async (req, res) => {
    const [total, courses] = await Promise.all([
        Course.countDocuments({ state: true }),
        Course.find({ state: true }).populate("author"),
    ]);

    res.json({ total, courses });
};

const getCourse = async (req, res) => {
    const { id } = req.params;
    const courseFound = await Course.findById(id);

    res.json(courseFound);
};

const createCourse = async (req, res) => {
    const { state, author, ...data } = req.body;

    const newCourse = new Course({
        ...data,
        author: req.user._id,
    });

    await newCourse.save();

    res.json(newCourse);
};

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const courseUpdated = await Course.findByIdAndUpdate(id, data, {
        new: true,
    });

    res.json(courseUpdated);
};

const deleteCourse = async (req, res) => {
    const { id } = req.params;

    const courseDeleted = await Course.findByIdAndUpdate(
        id,
        { state: false },
        { new: true }
    );

    res.json(courseDeleted);
};

module.exports = {
    getCourse,
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse,
};
