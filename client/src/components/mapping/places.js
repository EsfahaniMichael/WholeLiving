import React, { Component } from 'react';
import axios from 'axios';


class Places extends Component {
    constructor(props){
        super(props);
        this.state = {
            places: '',
            wholeFoods: [],
            latLng: '',
            keywordSearch: '',
            isDataReceived: false
        }
    }

    getLatLng = async (address, location) => {

        // var parseWhiteSpaceLocation = location.split(' ').join('+');
         
        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyD-NNZfs0n53D0caUB0M_ERLC2n9psGZfc`).then( (resp) => {
        //    console.log('what is the axios', resp)
        console.log("THIS IS ADDRESS", resp)
          this.setState({
            latLng: resp.data.results[0].geometry.location,
            // keywordSearch: parseWhiteSpaceLocation
          })
        } ).catch(err => console.log(err))
        console.log('THIS IS LAT AND LONG',this.state.latLng)
        // this.sendLatLngDB();
      }

      componentDidMount(address, location){
          this.getLatLng(address, location);
      }
      render(){

        return(
            <div>
                This is where the places component is...
            </div>
        )
      }



}

export default Places;