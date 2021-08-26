const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookingDaySchema = new Schema({
    date: { type: Date, default: Date.now() },
    slots: [{ type: Schema.Types.ObjectId, ref: "slot" }],
    vaccinationCentre: {
        type: Schema.Types.ObjectId,
        ref: "vaccinationCentre"
    }
})



module.exports = BookingDay = mongoose.model("bookingDay", BookingDaySchema)