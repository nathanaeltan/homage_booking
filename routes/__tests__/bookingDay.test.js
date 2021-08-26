const request = require("supertest");
const { app } = require("../../server");

it('should fail to create a booking day if date or vaccinationId is missing', async () => {
    await request(app).post("/api/bookingDay")
        .send({ date: "2021-08-25" }).expect(400)

})
it('should succeed to create a booking day if date and vaccinationId are provided', async () => {
    const createdVaccineCentre = await request(app).post("/api/vaccinationCentre")
        .send({ name: "Test3 Vaccine Centre" })
    await request(app).post("/api/nurseRoster")
        .send({
            "vaccinationCentreId": createdVaccineCentre.body.data._id,
            "schedule": {
                "mon": 1,
                "tue": 3,
                "wed": 4,
                "thu": 7,
                "fri": 9,
                "sat": 4,
                "sun": 6
            },
        }).expect(200)
    await request(app).post("/api/bookingDay")
        .send({ date: "2021-08-25", "vaccinationCentreId": createdVaccineCentre.body.data._id }).expect(200)

})

