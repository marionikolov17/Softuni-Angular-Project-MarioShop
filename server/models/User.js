const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    virtuals: {
        rePassword: {}
    }
});

userSchema.pre("save", async function (next) {
    if (this.password !== this.rePassword) {
        throw new Error("Passwords must match!");
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);

    this.password = hashedPassword;

    next();
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;