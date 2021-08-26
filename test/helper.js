exports.USER_1 = { email: "test@test.com", phone: "18181818", name: "test1" }

exports.NURSE_ROSTER = (vaxId) => {
    return {
        "vaccinationCentreId": vaxId,
        "schedule": {
            "mon": 1,
            "tue": 3,
            "wed": 4,
            "thu": 7,
            "fri": 9,
            "sat": 4,
            "sun": 6
        },
    }
}