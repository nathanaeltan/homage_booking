const { TIMINGS, DayMapper } = require("./constants")
const Slot = require("../models/slot");
const NurseRoster = require("../models/nurseRoster");
const BookingDay = require("../models/bookingDay");

exports.SlotsCreator = async (bookingData) => {
    try {
        const slotArr = []

        const nurseRoster = await NurseRoster.findOne({ vaccinationCentre: bookingData.vaccinationCentre })
        const day = DayMapper[new Date(bookingData.date).getDay()]

        for (let slotTiming of TIMINGS) {
            const slotCreated = await Slot.create({ time: slotTiming, rosterCount: nurseRoster[day], date: bookingData.date, vaccinationCentre: bookingData.vaccinationCentre })
            slotArr.push(slotCreated._id)
        }
        const updatedWithSlots = await BookingDay.findOneAndUpdate({ _id: bookingData._id }, { $push: { slots: { $each: slotArr } }, }, { new: true }).populate("slots")
        return {success: true, data: updatedWithSlots}
    } catch (error) {
        console.log(error)
        return {success: false, message: error}
    }

}