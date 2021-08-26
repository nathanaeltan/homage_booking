const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NurseRosterSchema = new Schema({
    mon: {
        type: Number,
        default: 0
    },
    tue: {
        type: Number,
        default: 0
    },
    wed: {
        type: Number,
        default: 0
    },
    thu: {
        type: Number,
        default: 0
    },
    fri: {
        type: Number,
        default: 0
    },
    sat: {
        type: Number,
        default: 0
    },
    sun: {
        type: Number,
        default: 0
    },

    vaccinationCentre: {
        type: Schema.Types.ObjectId,
        ref: "vaccinationCentre"
    }
})

module.exports = NurseRoster = mongoose.model("nurseRoster", NurseRosterSchema)