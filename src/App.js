import React, { Component } from 'react';
// import logo from './logo.svg';
import Header from './Header';
import Search from './Search';
import {searchData} from './data/searchData';
import './Search.scss';
import './App.scss';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchIndex: searchData[0]
    };
  }

  handleSearchClick = () => {
    return false; 
  }

  searchIndexChanged = (val) => {
    const index = searchData.find(obj => obj.name === val);
    this.setState({
      searchIndex: index
    })
  };

  render() {
    return (
      <div className="App">
        <Header data={searchData} cbk={this.searchIndexChanged} searchIndex={this.state.searchIndex} />
        <div className="App-intro">
          <div className="search-container">
            <Search onSearchResultClick={this.handleSearchClick} searchIndex={this.state.searchIndex} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
