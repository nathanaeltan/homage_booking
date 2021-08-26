const mongoose = require("mongoose")
const { app } = require("./server.js")
const connectDB = require("./config/db");
const start = async () => {
    console.log("Starting Up")

    connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server Running on PORT ${PORT}`);
    });
}

start()