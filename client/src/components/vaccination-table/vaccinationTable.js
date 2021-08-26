import React from 'react'
import moment from 'moment'
import { Button } from '@material-ui/core'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const VaccinationTable = ({ user, clearSlot, setUpdate }) => {
    return (
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Vaccination Centre</TableCell>
                    <TableCell >Date</TableCell>
                    <TableCell >Time</TableCell>
                    <TableCell ></TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow >
                    <TableCell >{user.slot1.vaccinationCentre.name}</TableCell>
                    <TableCell >{moment(user.slot1.date).format("YYYY-MM-DD")}</TableCell>
                    <TableCell >{user.slot1.time}</TableCell>
                    <TableCell ><Button variant="contained" color="secondary" onClick={() => {
                        const obj = { ...user }
                        obj.slot1 = null;
                        clearSlot(obj)
                        setUpdate(true)
                    }}>Reschedule</Button></TableCell>

                </TableRow>
            </TableBody>
        </Table>
    )
}

export default VaccinationTable
