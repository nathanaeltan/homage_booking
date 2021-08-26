const Slot = require("../models/slot")
const User = require("../models/user");
const { ValidateSlot, ValidateSlotRequest } = require("../utils/slotValidator");
exports.Create = async (req, res) => {
    try {
        const { userId, slotId } = req.body;

        const validateReq = ValidateSlotRequest(slotId, userId)
        if (!validateReq.success) {
            return res.status(400).json({ success: false, message: validateReq.message })
        }

        const validateSlot = await ValidateSlot(slotId, userId)
        if (!validateSlot.success) {
            return res.status(400).json({ success: false, message: validateSlot.message })
        }

        const bookSlot = await Slot.findByIdAndUpdate({ _id: slotId }, { $push: { userDetails: userId } }, { new: true })
        await User.findByIdAndUpdate({ _id: userId }, { slot1: bookSlot._id });
        return res.status(200).json({ success: true, data: bookSlot })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error Occured, Please try again later" })
    }
}

exports.Update = async (req, res) => {
    try {
        const { userId, slotId } = req.body;
        // Validate the desired slot 
        const validateReq = ValidateSlotRequest(slotId, userId)
        if (!validateReq.success) {
            return res.status(400).json({ success: false, message: validateReq.message })
        }
        const validateSlot = await ValidateSlot(slotId, userId)
        if (!validateSlot.success) {
            return res.status(400).json({ success: false, message: validateSlot.message })
        }

        // Delete existing Slot first
        const userDetails = await User.findById(userId);
        const { slot1 } = userDetails;

        await Slot.findByIdAndUpdate({ _id: slot1 }, { $pull: { userDetails: userId } })
        const bookSlot = await Slot.findByIdAndUpdate({ _id: slotId }, { $push: { userDetails: userId } }, { new: true })
        await User.findByIdAndUpdate({ _id: userId }, { slot1: bookSlot._id });
        return res.status(200).json({ success: true, data: bookSlot })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error Occured, Please try again later" })
    }
}
exports.Delete = async (req, res) => {
    try {
        const { userId, slotId } = req.body;
        // Validate the desired slot 
        const validateReq = ValidateSlotRequest(slotId, userId)
        if (!validateReq.success) {
            return res.status(400).json({ success: false, message: validateReq.message })
        }

        await Slot.findByIdAndUpdate({ _id: slotId }, { $pull: { userDetails: userId } })
        const data = await User.findByIdAndUpdate({ _id: userId }, { slot1: null }, { new: true });
        return res.status(200).json({ success: true, data })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error Occured, Please try again later" })
    }
}