const { Schema, model } = require("mongoose");

const CourseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        description: {
            type: String,
            required: false,
            trim: true,
        },
        state: {
            type: Boolean,
            default: true,
        },
        image: {
            type: String,
            required: false,
        },
        students: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

CourseSchema.methods.toJSON = function () {
    const { __v, _id, ...course } = this.toObject();
    course.uid = _id;

    return course;
};

module.exports = model("Course", CourseSchema);
