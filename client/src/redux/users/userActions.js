import axios from 'axios';
import { UserActionTypes } from './userTypes';


export const signUpSignIn = (data, nextStep, setError) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify(data)
        const res = await axios.post("/api/user", body, config)
        dispatch({
            type: UserActionTypes.SET_CURRENT_USER,
            payload: res.data.data
        })
        nextStep()
    } catch (error) {
        setError({ active: true, message: "Invalid Credentials" })
        console.log(error, "ERROR IN SIGNING IN USER")
    }
}

export const clearSlot = (user) => async dispatch => {
    dispatch({
        type: UserActionTypes.CLEAR_SLOT,
        payload: user
    })
}