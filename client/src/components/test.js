// import React, { Component } from 'react';
// import axios from 'axios';

// class Test extends Component {
    
//         state = {
//             location: null
//         }

//         async dataReceiving() {
//             const location = await axios.get('/api/location');          
//             this.setState({
//                 location: location
//             })
//         }
//         componentDidMount() {
//             this.dataReceiving();
//         }
//         // const resp = await axios.get('/api/test');
//         // // console.log("Resp:", resp);
//         // const postResp = await axios.post('/api/test', {
//         //     name: 'Doug Frank',
//         //     email: 'therealdoug@yahoo.com',
//         //     phone: '(571) 891-3267'
//         // });
//         // // console.log('Post Resp:', postResp);

        
    
//     render(){
//         const {location} = this.state;

//         if(location){
//             return (
//                 <div>
//                     lat-----{location.data.wholeFoodsLocations[0].lat}
//                    long--- {location.data.wholeFoodsLocations[0].lng}
//                 </div>
//             )
//         }
//         else{
//             return(
//                 <div>
//                     <h1>AINT LOADED YET</h1>
//                 </div>
//             )
//         }
        
//     }
// }

// export default Test;