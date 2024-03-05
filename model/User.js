const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("users", UserSchema)