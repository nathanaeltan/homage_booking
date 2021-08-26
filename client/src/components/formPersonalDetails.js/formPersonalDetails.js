import React, { useState } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import { connect } from "react-redux";
import { signUpSignIn } from "../../redux/users/userActions"


const PersonalDetails = ({ nextStep, signUpSignIn }) => {

    // State
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState({ active: true, message: "" })

    // Handlers
    const onSubmitDetails = async () => {
        if (!name || !phone || !email) {
            setError({ active: true, message: "Please Ensure all fields are filled" })
            return
        }
        signUpSignIn({ name, phone, email }, nextStep, setError)
    }
    return (
        <Grid container style={{paddingLeft: 300, paddingRight: 300}}>
            <Grid xs={12}  item style={{ padding: 100, margin: 10, border: "1px solid black" }}>
                <h1>User Details</h1>

                {error.active ? <p style={{ color: 'red' }}>{error.message}</p> : null}

                <Grid item>
                    <TextField fullWidth label="Name" onChange={(e) => setName(e.target.value)} value={name} required />
                </Grid>
                <div>
                    <TextField fullWidth label="Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div>
                    <TextField fullWidth label="Phone" onChange={(e) => setPhone(e.target.value)} value={phone} required />
                </div>
                <div style={{ marginTop: 30 }}>
                    <Button onClick={onSubmitDetails} variant="contained" color="primary">next</Button>
                </div>
            </Grid>




        </Grid>
    )
}

export default connect(null, { signUpSignIn })(PersonalDetails)
