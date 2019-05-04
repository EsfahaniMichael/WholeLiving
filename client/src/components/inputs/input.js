
import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props)

        this.state = {
            address: '',
            location: '',
        }
    }

    submitInfo = (e) => {
        e.preventDefault();
        this.props.submitAddress(this.state.address, this.state.location)
        console.log('location:', this.state.location)
    }

    render() {
        // console.log('address:', this.state.address)
        return (
            <div className="background">
                <div className="subInfo">
                    Find your future home near your favorite spots
                </div>
                <form className="formInput" onSubmit={this.submitInfo}>
                    <label>Enter Zip Code or Address</label>
                    <input type="text" name="address" value={this.state.address} onChange={(e) => {
                        this.setState({
                            address: e.currentTarget.value
                        })
                    }}>
                    </input>
                    <label>Please enter a location of your preference</label>
                    <input type="text" name="location" value={this.state.location} onChange={(e) => {
                        this.setState({
                            location: e.currentTarget.value
                        })
                    }}>
                    </input>
                    <button onSubmit={this.submitInfo}>Submit</button>
                </form>
            </div>

        )
    }
}

export default Input;