const User = require("../models/user")

exports.Create = async (req, res) => {
    try {
        const { email, name, phone } = req.body;
        if (!email || !name || !phone) {
            return res.status(400).json({ success: false, message: "Please include: Name, phone and email" })
        }
        const foundUser = await User.findOne({ email, name, phone }).populate({
            path: 'slot1',
            populate: {
                path: 'vaccinationCentre',
                model: 'vaccinationCentre'
            }
        })
        if (!foundUser) {
            const newUser = await User.create({ email, name, phone })
            return res.status(200).json({ success: true, data: newUser })
        }
        return res.status(200).json({ success: true, data: foundUser })


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Server Error Occured, Please try again later" })
    }
}