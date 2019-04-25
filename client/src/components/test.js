import React, { Component } from 'react';
import axios from 'axios';

class Test extends Component {
    async componentDidMount(){


        const resp = await axios.get('/api/test');

        // console.log("Resp:", resp);

        const postResp = await axios.post('/api/test', {
            name: 'Doug Frank',
            email: 'therealdoug@yahoo.com',
            phone: '(571) 891-3267'
        });

        // console.log('Post Resp:', postResp);


        const locationResp = await axios.get('/api/location');
        console.log('GETTING DATA???:', locationResp.data.wholeFoodsLocations);
        console.log('GETTING DATA???.. FIRST ONE IN ARRAY:', locationResp.data.wholeFoodsLocations[0]);
        console.log('Longitude...:', locationResp.data.wholeFoodsLocations[0].lng);
        console.log('latitutde...:', locationResp.data.wholeFoodsLocations[0].lat);
    }
    render(){
        return(
            <h1>this is the test comp</h1>
        )
    }
}

export default Test;