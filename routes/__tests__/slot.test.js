const request = require("supertest");
const { app } = require("../../server");
const { USER_1, NURSE_ROSTER } = require("../../test/helper");

it('should fail to book a slot if userId or slotId are missing', async () => {
    const user = await request(app).post("/api/user")
        .send(USER_1)
        .expect(200)
    await request(app).post("/api/slot")
        .send({ userId: user.body.data._id }).expect(400)

})
it('should fail to book a slot if the slot is full', async () => {
    const user1 = await request(app).post("/api/user")
        .send(USER_1)
        .expect(200)
    const user2 = await request(app).post("/api/user")
        .send({ email: "test2@test.com", phone: "18181818", name: "test2" })
        .expect(200)
    const createdVaccineCentre = await request(app).post("/api/vaccinationCentre")
        .send({ name: "Test3 Vaccine Centre" })
    await request(app).post("/api/nurseRoster")
        .send(NURSE_ROSTER(createdVaccineCentre.body.data._id)).expect(200)
    const bookingDay = await request(app).post("/api/bookingDay")
        .send({ date: "2021-08-30", "vaccinationCentreId": createdVaccineCentre.body.data._id }).expect(200)
    await request(app).post("/api/slot").send({ userId: user1.body.data._id, slotId: bookingDay.body.data.slots[0]._id }).expect(200)
    await request(app).post("/api/slot").send({ userId: user2.body.data._id, slotId: bookingDay.body.data.slots[0]._id }).expect(400)

})
it('should succeed to book a slot userId and slotId are valid', async () => {
    const user1 = await request(app).post("/api/user")
        .send(USER_1)
        .expect(200)

    const createdVaccineCentre = await request(app).post("/api/vaccinationCentre")
        .send({ name: "Test3 Vaccine Centre" })
    await request(app).post("/api/nurseRoster")
        .send(NURSE_ROSTER(createdVaccineCentre.body.data._id)).expect(200)
    const bookingDay = await request(app).post("/api/bookingDay")
        .send({ date: "2021-08-30", "vaccinationCentreId": createdVaccineCentre.body.data._id }).expect(200)
    await request(app).post("/api/slot").send({ userId: user1.body.data._id, slotId: bookingDay.body.data.slots[0]._id }).expect(200)

})
it('should update a slot if userId and slotId are valid', async () => {
    const user1 = await request(app).post("/api/user")
        .send(USER_1)
        .expect(200)

    const createdVaccineCentre = await request(app).post("/api/vaccinationCentre")
        .send({ name: "Test3 Vaccine Centre" })
    await request(app).post("/api/nurseRoster")
        .send(NURSE_ROSTER(createdVaccineCentre.body.data._id)).expect(200)
    const bookingDay = await request(app).post("/api/bookingDay")
        .send({ date: "2021-08-30", "vaccinationCentreId": createdVaccineCentre.body.data._id }).expect(200)
    await request(app).post("/api/slot").send({ userId: user1.body.data._id, slotId: bookingDay.body.data.slots[0]._id }).expect(200)
    await request(app).put("/api/slot").send({ userId: user1.body.data._id, slotId: bookingDay.body.data.slots[3]._id }).expect(200)

    const foundUser = await request(app).post("/api/user")
        .send(USER_1)
    expect(foundUser.body.data.slot1._id).toEqual(bookingDay.body.data.slots[3]._id)
})