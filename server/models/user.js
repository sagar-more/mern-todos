const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    userEmail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        virtuals: true,
        transform(doc, ret) {
            delete ret.password;
            delete ret._id;
            return ret;
        }
    }
});

module.exports = model("user", UserSchema);
