import React from 'react'
import { Container, Button } from '@material-ui/core'

import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const VaccinationModal = ({ open, handleClose, vaxCentreName, startDate, selectedSlot, user, isUpdate, bookSlot, updateSlot }) => {
    return (
        <Modal open={open}
            onClose={handleClose} style={{ marginTop: 50 }}>
            <div>
                <Container>
                    <TableContainer component={Paper} style={{ padding: 30 }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Vaccination Centre</TableCell>
                                    <TableCell >Date</TableCell>
                                    <TableCell >Time</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell >{vaxCentreName}</TableCell>
                                    <TableCell >{moment(startDate).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell >{selectedSlot && selectedSlot.time}</TableCell>

                                </TableRow>
                            </TableBody>
                        </Table>
                        <Button variant="contained" color="primary" style={{ margin: 10 }} onClick={() => {
                            if (!isUpdate) {
                                bookSlot({ userId: user._id, slotId: selectedSlot.slotId })
                                handleClose()
                            } else {
                                updateSlot({ userId: user._id, slotId: selectedSlot.slotId })
                                handleClose()
                            }
                        }}>Confirm</Button>

                    </TableContainer>
                </Container>

            </div>
        </Modal>
    )
}

export default VaccinationModal
