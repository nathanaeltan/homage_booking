const request = require("supertest");
const { app } = require("../../server");
const { NURSE_ROSTER } = require("../../test/helper");

it('should fail to create a nurse roster if vaccinationCentreID is missing', async () => {
    const response = await request(app).post("/api/nurseRoster")
        .send({
            "schedule": {
                "mon": 2,
                "tue": 3,
                "wed": 4,
                "thu": 7,
                "fri": 9,
                "sat": 4,
                "sun": 6
            }
        })
        .expect(400)
})
it('should fail to create a roster if schedule is not provided', async () => {
    const createdVaccineCentre = await request(app).post("/api/vaccinationCentre")
        .send({ name: "Test Vaccine Centre" })
        .expect(200)

    const response = await request(app).post("/api/nurseRoster")
        .send({ vaccinationCentreId: createdVaccineCentre.body.data._id })
        .expect(400)


})
it('should fail to create a roster if there is already a schedule for that centre', async () => {
    const createdVaccineCentre = await request(app).post("/api/vaccinationCentre")
        .send({ name: "Test2 Vaccine Centre" })
        .expect(200)

    await request(app).post("/api/nurseRoster")
        .send(NURSE_ROSTER(createdVaccineCentre.body.data._id))
    const response = await request(app).post("/api/nurseRoster")
        .send(NURSE_ROSTER(createdVaccineCentre.body.data._id)).expect(400)


})
it('should succeed to create a vaccine centre if there schedule and vaccinationCentreId are provided', async () => {
    const createdVaccineCentre = await request(app).post("/api/vaccinationCentre")
        .send({ name: "Test3 Vaccine Centre" })

    const response = await request(app).post("/api/nurseRoster")
        .send(NURSE_ROSTER(createdVaccineCentre.body.data._id)).expect(200)

})

