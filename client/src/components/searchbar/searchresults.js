
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { submitSearch } from '../actions';
import { connect } from 'react-redux';
import Map from '../googleMaps/wholefoodsmapgoogle';


class SearchResult extends Component {
    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        console.log('this is the valuesssss',values)
        this.props.submitSearch(values);
    }

    render() {
        return <div className="main">
            <Map />
        </div>
    }
}


SearchResult = connect(null, {
    submitSearch: submitSearch
})(SearchResult);

export default withRouter(SearchResult);