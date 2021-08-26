const BookingDay = require("../models/bookingDay");
const { SlotsCreator } = require("../utils/slotCreator");
exports.Create = async (req, res) => {
    try {
        const { vaccinationCentreId, date } = req.body;
        if (!date) {
            return res.status(400).json({ success: false, message: "Please provide a date" })
        }
        if (!vaccinationCentreId) {
            return res.status(400).json({ success: false, message: "Please provide a vaccination Centre ID" })
        }
        const bookingFound = await BookingDay.findOne({ vaccinationCentre: vaccinationCentreId, date }).populate("slots")
        if (bookingFound) {
            const { date, vaccinationCentre, _id } = bookingFound
            let data = {
                date,
                vaccinationCentre,
                _id,
                slots: bookingFound.slots.filter(x => x.userDetails.length < x.rosterCount)
            }
            return res.status(200).json({ success: true, data })
        }
        const bookingCreated = await BookingDay.create({ vaccinationCentre: vaccinationCentreId, date })
        const data = await SlotsCreator(bookingCreated)
        if (!data.success) {
            return res.status(400).json({ success: false, message: data.message })
        }
        return res.status(200).json({ success: true, data: data.data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server Error Occured, Please try again later" })
    }
}