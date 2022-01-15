const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
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
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;

    return user;
};

module.exports = model("User", UserSchema);
