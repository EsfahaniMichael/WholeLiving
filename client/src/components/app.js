import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min'; 
import '../assets/css/app.scss';
import AllLocations from './mapping.js/allLocations';


const App = () => (
    <div>
        <div className="container">
            <h1 className="center">Whole LIVING!</h1>
            <AllLocations/>
        </div>
    </div>
);

export default App;
