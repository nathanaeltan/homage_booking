import React from 'react'
import { Button } from '@material-ui/core'

const SlotDisplay = ({ slots, onSelectTime }) => {
    return (
        <div style={{ paddingTop: 30, paddingBottom: 30 }}>
            {
                slots ? (
                    slots.length > 0 ?
                        slots.map(x => <Button key={x._id} style={{ margin: 4 }} variant="outlined" color="primary" onClick={() => onSelectTime(x._id, x.time)}>{x.time}</Button>)
                        : "No Slots Available for this day"
                ) : null
            }
        </div>
    )
}

export default SlotDisplay
