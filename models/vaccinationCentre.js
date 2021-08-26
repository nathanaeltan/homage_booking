const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VaccinationCentreSchema = new Schema({
    name: {
        type: String,
        required: true
    },

})

module.exports = VaccinationCentre = mongoose.model("vaccinationCentre", VaccinationCentreSchema)