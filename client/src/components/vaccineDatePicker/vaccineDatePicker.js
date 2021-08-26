import React, { Fragment } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"
const VaccineDatePicker = ({ startDate, onSelectDate }) => {
    return (
        <Fragment>
            <hr />
            <h2>Pick a Date</h2>
            <DatePicker selected={startDate} minDate={moment().toDate()} onChange={(date) => onSelectDate(date)} dateFormat="yyyy-MM-dd" />
        </Fragment>
    )
}

export default VaccineDatePicker
