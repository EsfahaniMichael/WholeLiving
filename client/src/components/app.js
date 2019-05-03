import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min'; 
import '../assets/css/app.scss';
// import AllLocations from './mapping/allLocations';
import Map from './mapping/map';
import {Route, Switch} from 'react-router-dom';



function App(){
    return(
        <Switch>
            <Route path="/" component = {Map}/>
        </Switch>
    );

}

export default App;
