const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    plan: { type: String, required: true, default: 'guest' },
}, {
    versionKey: false,
    timestamps: true
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    next();
});

userSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password;

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, function (err, same) {
            if (err) return reject(err);
            resolve(same);
        });
    });
}

const User = mongoose.model("user", userSchema);
module.exports = User;