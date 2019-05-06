import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min'; 
import '../assets/css/app.scss';
// import AllLocations from './mapping/allLocations';
import Map from './mapping/map';
import {Route, Switch} from 'react-router-dom';
import FirstPage from './firstpage/title.js';


function App(){
    return(
        <Switch>
            {/* <Route path="/" component = {Map}/> */}
            <Route path="/" component = {FirstPage}/>
        </Switch>
    );

}

export default App;
