import React, { useEffect, useState } from 'react'
import { LinearProgress, Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import moment from 'moment'

// Redux Actions
import { getAllVaxCentres } from '../../redux/vaccinationCentre/vaccinationCentreActions'
import { getBookingDayInfo, bookSlot, updateSlot } from '../../redux/booking/bookingAction'
import { clearSlot } from '../../redux/users/userActions'
// Components
import VaccinationTable from '../vaccination-table/vaccinationTable'
import VaccinationModal from '../vaccinationModal/vaccinationModal'
import VaccinationPicker from '../vaccinationPicker/vaccinationPicker'
import SlotDisplay from '../slotDisplay/slotDisplay'
import VaccineDatePicker from '../vaccineDatePicker/vaccineDatePicker'
const VaccineAndDateSelect = ({ getAllVaxCentres, vaxCentreLoading, vaxCentres, getBookingDayInfo, bookingDay, user, bookSlot, clearSlot, updateSlot }) => {


    // State
    const [vaxCentre, setVaxCentre] = useState("DEFAULT")
    const [startDate, setStartDate] = useState(null);
    const [slots, setSlots] = useState([])
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [open, setOpen] = useState(false)
    const [vaxCentreName, setVaxName] = useState("")
    const [isUpdate, setUpdate] = useState(false)


    // Hooks
    useEffect(() => {
        getAllVaxCentres()
    }, [getAllVaxCentres])

    useEffect(() => {
        if (bookingDay) {
            setSlots(bookingDay.slots)
        }
    }, [bookingDay])


    // Handlers
    const onSelectDate = (date) => {
        setStartDate(date)
        getBookingDayInfo({ date: moment(date).format("YYYY-MM-DD"), vaccinationCentreId: vaxCentre })
    }

    const onSelectTime = (slotId, time) => {
        setSelectedSlot({ slotId, time })
        handleOpen()
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Grid container>
            <Grid xs={12} item style={{ padding: 100, border: "1px solid black" }} >
                {
                    user && user.slot1 ? <div>

                        You already have a  booking
                        <VaccinationTable user={user} clearSlot={clearSlot} setUpdate={setUpdate} />

                    </div> : (
                        vaxCentreLoading ? <LinearProgress /> : (
                            <div >

                                <VaccinationPicker setVaxName={setVaxName} setVaxCentre={setVaxCentre} vaxCentres={vaxCentres} vaxCentre={vaxCentre} setSlots={setSlots} setStartDate={setStartDate} />
                                <VaccineDatePicker startDate={startDate} onSelectDate={onSelectDate} />
                                <SlotDisplay slots={slots} onSelectTime={onSelectTime} />

                            </div>

                        )
                    )

                }
            </Grid>
            <VaccinationModal open={open} handleClose={handleClose} vaxCentreName={vaxCentreName} startDate={startDate} selectedSlot={selectedSlot} user={user} isUpdate={isUpdate} bookSlot={bookSlot} updateSlot={updateSlot} />
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    vaxCentreLoading: state.vaccinationCentres.loading,
    vaxCentres: state.vaccinationCentres.vaccinationCentres,
    bookingDay: state.bookings.bookingDay,
    user: state.user.currentUser
});

const mapDispatchToProps = {
    getAllVaxCentres, getBookingDayInfo, bookSlot, clearSlot, updateSlot
}

export default connect(mapStateToProps, mapDispatchToProps)(VaccineAndDateSelect)
