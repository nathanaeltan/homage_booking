import { VaxCentreTypes } from "./vaccinationCentreTypes";

const INITIAL_STATE = {
    loading: true,
    vaccinationCentres: []
}

const vaccinationCentreReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case VaxCentreTypes.SET_VAX_CENTRES:
            return {
                ...state,
                vaccinationCentres: payload,
                loading: false
            }
        default:
            return state

    }
}

export default vaccinationCentreReducer