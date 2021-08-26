import React from 'react'
import {  Select, MenuItem, } from '@material-ui/core'

const VaccinationPicker = ({ setVaxName, setVaxCentre, vaxCentres, vaxCentre, setSlots, setStartDate}) => {
    return (
        <div >
            <h2>Vaccination Centre</h2>
            <hr />
            <div style={{ paddingTop: 30, paddingBottom: 30 }}>
                <Select defaultValue="DEFAULT" onChange={(e) => {
                    setVaxName(e.nativeEvent.target.text)
                    setVaxCentre(e.target.value)
                    setSlots([])
                    setStartDate(null)
                }} value={vaxCentre} selected={vaxCentre}>
                    <MenuItem value="DEFAULT" disabled>Choose a Vaccination Centre ...</MenuItem>
                    {
                        vaxCentres ? vaxCentres.map(centre => <option key={centre._id} value={centre._id}>{centre.name}</option>) : null
                    }

                </Select>
            </div>


        </div>
    )
}

export default VaccinationPicker
