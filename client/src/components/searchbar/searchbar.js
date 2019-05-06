import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderInput } from '../helpers/index';
import Script from 'react-load-script';
import apiKey from '../../../../config/apiKeyGoogle.config';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            query: ''
        };
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this);

    }

    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    }

    submitFormHandler = (data) => {
        this.props.history.push(`/find?city=${data.city}&gymType=${data.gymType}`);
    }

    handleScriptLoad() {
        this.autocomplete = null;
        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('city')
        );
        this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
    }

    handlePlaceSelect() {
        let addressObject = this.autocomplete.getPlace();
        let address = addressObject.address_components;
        if (address) {
            console.log('here is an adress...', address[0].long_name)
            console.log('here is the query', addressObject.formatted_address)
            this.setState({
                city: address[0].long_name,
                query: addressObject.formatted_address,
            });
        }
    }

    componentWillUnmount() {
        this.setState({
            city: '',
            query: ''
        })
    }

    render() {
        const { handleSubmit } = this.props;
        return (
        <div className="row search-bar-container input-field container">
            <form className="col s8 offset-s2 form-style" action="#" onSubmit={handleSubmit(this.submitFormHandler)}>
                <Field name="city" id="city" value={this.state.query} component={renderInput} label="City You Would Like To Check Out" />
                <Script url={`https://maps.googleapis.com/maps/api/js?key=${apiKey.GOOGLE_PLACES_API_KEY}&libraries=places`} onLoad={this.handleScriptLoad} />
                <Field name="gymType" id="gymType" component={renderInput} label="Crossfit Gym or 24 Hour Fitness" />
                {/* <p>
 
                    <label for="crossfit">
                     <input type="checkbox" id="crossfit"/>
  
                        <span>Crossfit</span>
  
                    </label>
  
                </p> */}
                {/* <p>
                    <label type="checkbox">
                    <span>
                        24 Hour Fitness
                    </span>
                    </label>
                </p> */}
               
                
                <div className="row">
                    <div className="s12 center">
                        <button className="btn #4db6ac green lighten-2">Discover if this city is for you</button>
                    </div>
                </div>
            </form>
            
        </div>
//         <div class="container">
 
// {/* <form action="#">
 
// <h3>Your expertise</h3>
 
//     <p>
 
//       <label for="chk-demo1">
 
//         <input type="checkbox" id="chk-demo1"/>
 
//         <span>JavaScript</span>
 
//       </label>
 
//     </p>
 
    
 
 
 
//   </form> */}
 
// </div>


        )
    }
}

function validate(data) {
    const { city, gymType } = data;
    const errors = {};
    
    

    if (!city) {
        errors.address = 'Please type in a proper city.';
    }

    if (gymType !== "crossfit") {
        
        errors.gymType = 'Please type in either "24hour" or "crossfit" ';
    }
    // if (gymType !== "24hour") {
    //     console.log(gymType)
    //     errors.gymType = 'Please type in either "24hour" or "crossfit" ';
    // }

    return errors;
}

export default reduxForm({
    form: 'submit-search',
    validate: validate
})(SearchBar);