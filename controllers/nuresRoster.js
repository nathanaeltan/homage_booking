const NurseRoster = require("../models/nurseRoster");


exports.Create = async (req, res) => {
    try {
        const { schedule, vaccinationCentreId } = req.body;
        if (!schedule) {
            return res.status(400).json({ success: false, message: "Please provide a schedule" })
        }
        if (!vaccinationCentreId) {
            return res.status(400).json({ success: false, message: "Please provide a Vaccinnation Centre ID" })
        }
        const foundNurseRoster = await NurseRoster.findOne({ vaccinationCentre: vaccinationCentreId })
        if (foundNurseRoster) {
            return res.status(400).json({ success: false, message: "A nurse roster was already found for this centre, please update the existing roster instead" })
        }
        const createdRoster = await NurseRoster.create({ ...schedule, vaccinationCentre: vaccinationCentreId })
        return res.status(200).json({ success: true, data: createdRoster })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server Error Occured, Please try again later" })
    }
}