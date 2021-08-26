const express = require("express");
const app = express();

// Middleware
app.use(express.json({ extended: false }));


// Routes
app.use("/api/vaccinationCentre", require("./routes/api/vaccinationCentre"))
app.use("/api/nurseRoster", require("./routes/api/nurseRoster"))
app.use("/api/bookingDay", require("./routes/api/bookingDay"))
app.use("/api/slot", require("./routes/api/slots"))
app.use("/api/user", require("./routes/api/user"))


module.exports = { app }