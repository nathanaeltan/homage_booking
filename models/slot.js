const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
    time: {
        type: String
    },
    userDetails: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    rosterCount: {
        type: Number
    },
    date: { type: Date },
    vaccinationCentre: {
        type: Schema.Types.ObjectId,
        ref: "vaccinationCentre"
    }

})

module.exports = Slot = mongoose.model("slot", SlotSchema)