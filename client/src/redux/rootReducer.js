import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import bookingReducer from "./booking/bookingReducer";
import userReducer from "./users/userReducer";
import vaccinationCentreReducer from "./vaccinationCentre/vaccinationCentreReducer";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    user: userReducer,
    vaccinationCentres: vaccinationCentreReducer,
    bookings: bookingReducer
})
export default persistReducer(persistConfig, rootReducer)