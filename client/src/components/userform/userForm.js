import React, { Component } from 'react'
import PersonalDetails from '../formPersonalDetails.js/formPersonalDetails';
import VaccineAndDateSelect from '../VaccineAndDateSelect/vaccineAndDateSelect';

class UserForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1,
            name: "",
            phone: "",
            email: "",

        }
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })
    }
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })
    }
    render() {
        const { step } = this.state;
        switch (step) {
            case 1:
                return (
                    <PersonalDetails nextStep={this.nextStep} prevStep={this.prevStep} />
                )
            case 2:
                return (
                    <VaccineAndDateSelect nextStep={this.nextStep} prevStep={this.prevStep} />
                )

            default:
                return (
                    <PersonalDetails nextStep={this.nextStep} prevStep={this.prevStep} />
                )
        }
    }
}

export default UserForm
