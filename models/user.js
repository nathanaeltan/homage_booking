const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String
    },
    slot1: {
        type: Schema.Types.ObjectId,
        ref: "slot",
        default: null
    },
    slot2: {
        type: Schema.Types.ObjectId,
        ref: "slot"
    },


})

module.exports = User = mongoose.model("user", UserSchema)