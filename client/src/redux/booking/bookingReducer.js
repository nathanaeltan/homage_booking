import { BookingActionTypes } from "./bookingTypes";

const INITIAL_STATE = {
    bookingDay: null,
    loading: true
}

const bookingReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case BookingActionTypes.SET_BOOKING_DAY:
            return {
                ...state,
                bookingDay: payload
            }
        case BookingActionTypes.BOOK_SLOT:
        case BookingActionTypes.UPDATE_SLOT:
            return {
                ...state,
                loading: false,
                bookingDay: null
            }
        default:
            return state
    }
}

export default bookingReducer