import React, { Component } from 'react';
import './title.css';
import SearchBar from '../searchbar/searchbar';

class FirstPage extends Component {
    render(){
        return(
            <div>
                <div className="titleHeader">
                Are you looking for lower-cost healthy living? Or higher-class healthy living?
                </div>
                <SearchBar history={this.props.history}/>
            </div>
        )
    }
}

export default FirstPage;