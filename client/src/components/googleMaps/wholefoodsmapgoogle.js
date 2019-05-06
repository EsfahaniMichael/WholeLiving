// import React, { Component } from 'react';
// import apiKey from '../../../../config/apiKeyGoogle.config';
// import GoogleMapReact from 'google-map-react';
// import { getSearchResult } from '../actions';
// import { connect } from 'react-redux';

// const getMapBounds = (map, maps, places) => {
//     const bounds = new maps.LatLngBounds();

//     places.forEach((place) => {
//         bounds.extend(new maps.LatLng(
//             place.geometry__location__lat,
//             place.geometry__location__lng,
//         ));
//     });
//     return bounds;
// };

// // Re-center map when resizing the window
// const bindResizeListener = (map, maps, bounds) => {
//     maps.event.addDomListenerOnce(map, 'idle', () => {
//         maps.event.addDomListener(window, 'resize', () => {
//             map.fitBounds(bounds);
//         });
//     });
// };

// // Fit map to its bounds after the api is loaded
// const apiIsLoaded = (map, maps, places) => {
//     // Get bounds by our places
//     const bounds = getMapBounds(map, maps, places);
//     // Fit map to bounds
//     map.fitBounds(bounds);
//     // Bind the resize listener
//     bindResizeListener(map, maps, bounds);
// };

// const Marker = ({ name }) => {
//     return <div className="marker"><img src={
//         function () {
//             if (name.includes("Whole Food")) {
//                 return wfmIcon;
//             } else if (name.includes("Target")) {
//                 return targetIcon;
//             } else if (name.includes("Starbucks")) {
//                 return starbucksIcon;
//             } else if (name.includes("Trader Joe")) {
//                 return traderJoeIcon;
//             } else if (name.includes("CrossFit") || name.includes("Crossfit")) {
//                 return crossFitIcon;
//             }
//             return keyPlaceIcon;
//         }()
//     } alt="" /></div>
// };

// class Map extends Component {
//     // static defaultProps = {
//     //     // center: {
//     //     //     lat: 59.95,
//     //     //     lng: 30.33
//     //     // },
//     //     zoom: 11
//     // };

//     renderMarker() {
//         const { places } = this.props.locationList.payload;
//         return places.map((place) => {
//             return <Marker
//                 key={place.id}
//                 lat={place.geometry__location__lat}
//                 lng={place.geometry__location__lng}
//                 name={place.name}
//             />
//         })
//     }

//     render() {
//         const { locationList } = this.props;
//         if (locationList) {
//             const { payload } = locationList;
//             if (typeof payload == "string") {
//                 return <h1 className="center map-error-text">There is an error trying to process this request. Please try again later.</h1>
//             }
//             const { mapCenter, places } = payload;
//             return (
//                 <div className="map-container">
//                     <GoogleMapReact
//                         bootstrapURLKeys={{ key: apiKey.GOOGLE_PLACES_API_KEY }}
//                         // defaultCenter={mapCenter}
//                         center={mapCenter}
//                         defaultZoom={11}
//                         yesIWantToUseGoogleMapApiInternals
//                         onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
//                     >
//                         {this.renderMarker()}
//                     </GoogleMapReact>
//                 </div>
//             );
//         }
//         return <h1 className="center map-loading-text">Loading...</h1>
//     }
// }

// function mapStateToProps(state) {
//     return {
//         locationList: state.search.locationList
//     }
// }

// export default Map = connect(mapStateToProps, {
//     getSearchResult: getSearchResult
// })(Map);