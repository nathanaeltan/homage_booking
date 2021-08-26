import axios from 'axios';
import Swal from "sweetalert2";

import { VaxCentreTypes } from './vaccinationCentreTypes';

export const getAllVaxCentres = () => async dispatch => {
    try {
        const res = await axios.get("/api/vaccinationCentre")
        dispatch({
            type: VaxCentreTypes.SET_VAX_CENTRES,
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