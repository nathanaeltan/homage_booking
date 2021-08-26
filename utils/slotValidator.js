const Slot = require("../models/slot");

exports.ValidateSlot = async (slotId, userId) => {


    const foundSlot = await Slot.findById(slotId);
    if (!foundSlot) {
        return { success: false, message: "No Slot found with this ID" }
    }
    const { userDetails, rosterCount } = foundSlot;
    if (userDetails.length >= rosterCount) {
        return { success: false, message: "This slot is already full, please select another" }
    }

    // Prevent Double Booking of time slot
    const existingBooking = userDetails.find(user => user == userId)
    if (existingBooking) {
        return { success: false, message: "You have already booked an appointment on this day" }
    }
    return { success: true }
}

exports.ValidateSlotRequest = (slotId, userId) => {
    if (!userId) {
        return { success: false, message: "Please provide a userID" }
    }
    if (!slotId) {
        return { success: false, message: "Please provide a slot ID" }
    }

    return { success: true }

}