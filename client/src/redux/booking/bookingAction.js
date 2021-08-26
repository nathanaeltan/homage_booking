import axios from 'axios';
import { BookingActionTypes } from './bookingTypes';
import Swal from "sweetalert2";

export const getBookingDayInfo = (data) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify(data)
        const res = await axios.post("/api/bookingDay", body, config)
        dispatch({
            type: BookingActionTypes.SET_BOOKING_DAY,
            payload: res.data.data
        })

    } catch (error) {
        console.log(error)
        Swal.fire({
            title: "Something went wrong, Please try again later",
            icon: "error",
        });
    }
}


export const bookSlot = (data) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify(data)
      await axios.post("/api/slot", body, config)
        dispatch({
            type: BookingActionTypes.BOOK_SLOT
        })

        Swal.fire({
            title: "Successfully Booked",
            icon: "success"
        }).then(res => {
            window.location.reload()
        })
    } catch (error) {
        console.log(error)
        Swal.fire({
            title: "Something went wrong, Please try again later",
            icon: "error",
        });
    }
}
export const updateSlot = (data) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify(data)
        await axios.put("/api/slot", body, config)
        dispatch({
            type: BookingActionTypes.UPDATE_SLOT
        })
        Swal.fire({
            title: "Successfully Updated Booking",
            icon: "success"
        }).then(res => {
            window.location.reload()
        })
    } catch (error) {
        console.log(error)
        Swal.fire({
            title: "Something went wrong, Please try again later",
            icon: "error",
        });
    }
}

