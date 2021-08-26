const request = require("supertest");
const { app } = require("../../server");
const { USER_1 } = require("../../test/helper");


it('should fail to create a user if email, phone, or name is missing', async () => {
    await request(app).post("/api/user")
        .send({ email: "test@test.com", phone: "18181818" })
        .expect(400)
})

it('should succeed to create a user if email, phone, or name are provided', async () => {
    await request(app).post("/api/user")
        .send(USER_1)
        .expect(200)
})

it('should return user detail if user already exists in DB', async () => {
    await request(app).post("/api/user")
        .send(USER_1)
        .expect(200)
    const response = await request(app).post("/api/user")
        .send(USER_1)
    expect(response.body.success).toEqual(true)
    expect(response.body.data.name).toEqual("test1")

})


