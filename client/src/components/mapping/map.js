// /// access token    pk.eyJ1IjoiZXNmYWhhbmltaWNoYWVsIiwiYSI6ImNqdWhpcDFybDEwOWI0NHAzcTR4eXJ1eWUifQ.Sw6AuYZ9N4f7co2BqAQ29Q
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = 'pk.eyJ1IjoiZXNmYWhhbmltaWNoYWVsIiwiYSI6ImNqdWhpcDFybDEwOWI0NHAzcTR4eXJ1eWUifQ.Sw6AuYZ9N4f7co2BqAQ29Q';
import React, {Component, Fragment} from 'react';
import axios from 'axios';
import './map.css';
import Title from '../firstpage/title';
import Places from './places';
import Input from '../inputs/input';


class Map extends Component {

    state = {
        wholefoods: null
    }

    async getData() {
        let wholefoods = await axios.get('/api/location');

        wholefoods = wholefoods.data.geoJson;


        this.setState({
            wholefoods: wholefoods
        })

        this.createMap();

    }
    // async getStateData(){
    //   let stateData = await axios.get('/api/states');

    //   console.log('Hit the endpoint mate');
    // }

    createMap(){
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/esfahanimichael/cjv5m541o4e6r1frywrxzpnzo',
            center: [-97.2263, 37.7091],
            zoom: 2.6,
            pitch: 45,
            
        });

        this.map.on('style.load', () => {
           
            this.map.addControl(new mapboxgl.FullscreenControl());

           
            var layers = this.map.getStyle().layers;

            var labelLayerId;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }
            }

            
            this.map.addSource('wholefoods', {
                type: 'geojson',                
                data: this.state.wholefoods
            });

            this.map.addLayer({
              "id": "state-fills",
              "type": "fill",
              "source": "states",
              "layout": {},
              "paint": {
                  "fill-color": "#627BC1",
                  "fill-opacity": ["case",
                      ["boolean", ["feature-state", "hover"], false],
                      1,
                      0.5
                  ]
              }
          });

           
            this.map.addLayer({
                id: 'wholefoods-heat',
                type: 'heatmap',
                source: 'wholefoods',
                maxzoom: 15,
                paint: {
                    
                    'heatmap-weight': {
                        property: 'dbh',
                        type: 'exponential',
                        stops: [
                            [1, 0],
                            [62, 1]
                        ]
                    },
                    
                    'heatmap-intensity': {
                        stops: [
                            [11, 1],
                            [15, 3]
                        ]
                    },
                    
                    'heatmap-color': [
                        'interpolate',
                        ['linear'],
                        ['heatmap-density'],
                        0, 'rgba(236,2,2,0)',
                        0.2, 'rgb(208,2,2)',
                        0.4, 'rgb(166,1,2)',
                        0.6, 'rgb(103,1,2)',
                        0.8, 'rgb(28,1,1)'
                    ],
                   
                    'heatmap-radius': {
                        stops: [
                            [11, 15],
                            [15, 20]
                        ]
                    },
                    
                    'heatmap-opacity': {
                        default: 1,
                        stops: [
                            [14, 1],
                            [15, 0]
                        ]
                    },
                }
            }, 'waterway-label');

            
            this.map.addLayer({
                id: 'wholefoods-point',
                type: 'circle',
                source: 'wholefoods',
                minzoom: 14,
                paint: {
                   
                    'circle-radius': {
                        property: 'dbh',
                        type: 'exponential',
                        stops: [
                            [{ zoom: 15, value: 1 }, 5],
                            [{ zoom: 15, value: 62 }, 10],
                            [{ zoom: 22, value: 1 }, 20],
                            [{ zoom: 22, value: 62 }, 50],
                        ]
                    },
                    'circle-color': {
                        property: 'dbh',
                        type: 'exponential',
                        stops: [
                            [0, 'rgba(236,222,239,0)'],
                            [10, 'rgb(236,222,239)'],
                            [20, 'rgb(208,209,230)'],
                            [30, 'rgb(166,189,219)'],
                            [40, 'rgb(103,169,207)'],
                            [50, 'rgb(28,144,153)'],
                            [60, 'rgb(1,108,89)']
                        ]
                    },
                    'circle-stroke-color': 'red',
                    'circle-stroke-width': 1,
                    'circle-opacity': {
                        stops: [
                            [14, 0],
                            [15, 1]
                        ]
                    }
                }
            }, 'waterway-label');
            this.map.on('click', (e) => {
            //   this.getStateData();
              console.log('WOOOOW');
            })
            this.map.on('click', 'wholefoods-point', (e) => {
                console.log(e.features[0].properties);
                console.log('HI!!!')

               
                new mapboxgl.Popup()
                    .setLngLat(e.features[0].geometry.coordinates)
                    .setHTML('<b>Whole Foods</b>' + '<br><b>Address:</b> ' + e.features[0].properties.Address + '<br><b>City:</b> ' + e.features[0].properties.City + '<br><b>Phone:</b> ' + e.features[0].properties.Phone + '<br><b>Hours:</b> ' + e.features[0].properties.Hours)
                    .addTo(this.map);
               
            });
        });
    }

    componentDidMount() {
        
        this.getData();
    }

    render(){
        return(
                <Fragment>
                    <Title />
                    <Input />
                    {/* <Places address={} location={}/> */}
                    <Places />
                    <div id='map'/>
                </Fragment>
            )

    }
}

export default Map;