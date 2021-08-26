const VaccinationCentre = require("../models/vaccinationCentre");

exports.Create = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "Please provide a name for the vaccination centre" })
        }
        const vaccinationCreate = await VaccinationCentre.create({ name })
        return res.status(200).json({ success: true, data: vaccinationCreate })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server Error Occured, Please try again later" })
    }
}

exports.Get = async (req, res) => {
    try {
        const data = await VaccinationCentre.find({})
        return res.status(200).json({ success: true, data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server Error Occured, Please try again later" })
    }
}