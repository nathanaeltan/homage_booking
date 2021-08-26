const request = require("supertest");
const { app } = require("../../server");

it('should fail to create a vaccine centre if name is missing', async () => {
    const response = await request(app).post("/api/vaccinationCentre")
        .send({ })
        .expect(400)
})
it('should succeed to create a vaccine centre if name is provided', async () => {
    const response = await request(app).post("/api/vaccinationCentre")
        .send({name: "Test Vaccine Centre" })
        .expect(200)

    expect(response.body.success).toEqual(true)
    expect(response.body.data.name).toEqual("Test Vaccine Centre")
})