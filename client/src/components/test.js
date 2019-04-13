import React, { Component } from 'react';
import axios from 'axios';

class Test extends Component {
    async componentDidMount(){


        const resp = await axios.get('/api/test');

        console.log("Resp:", resp);

        const postResp = await axios.post('/api/test', {
            message: 'Hello from the frontend',
            name: 'Jim Bob',
            food: ['pizza', 'chips']
        });

        console.log('Post Resp:', postResp);
    }
    render(){
        return(
            <h1>this is the test comp</h1>
        )
    }
}

export default Test;