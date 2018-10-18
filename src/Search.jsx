/**
PEARSON PROPRIETARY AND CONFIDENTIAL INFORMATION SUBJECT TO NDA
*  Copyright © 2017 Pearson Education, Inc.
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Pearson Education, Inc.  The intellectual and technical concepts contained
* herein are proprietary to Pearson Education, Inc. and may be covered by U.S. and Foreign Patents,
* patent applications, and are protected by trade secret or copyright law.
* Dissemination of this information, reproduction of this material, and copying or distribution of this software
* is strictly forbidden unless prior written permission is obtained
* from Pearson Education, Inc.
**/

/**
* The component for search related screens.
*
* @author Hema Nandagopal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
// import youtubeSearch from 'youtube-api-v3-search';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ChapterResults from './results/ChapterResults';
import FigureResults from './results/FigureResults';
import PageResults from './results/PageResults';
import GlossaryResults from './results/GlossaryResults';
import LearningObjectiveResults from './results/LearningObjectiveResults';
// import YoutubeResults from './results/YoutubeResults';
import Utilities from './Utils/Utilities'
import SearchIcon from './SearchIcon';
import CloseIcon from './CloseIcon';
import './Search.scss';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  cssFocused: {},
  bootstrapRoot: {
    padding: 0,
    width: '100%',
    'label + &': {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootstrapInput: {
    borderRadius: 3,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #c7c7c7',
    fontSize: 14,
    padding: '6px 13px 7px'
  },
  bootstrapFormLabel: {
    fontSize: 12,
    transform: 'none',
    color: '#6a7070',
    lineHeight: 1.33,
    '&$cssFocused': {
      color: '#6a7070'
    }
  },
  searchClear: {
    marginLeft: '-36px',
    marginTop: 0,
    verticalAlign: 'baseline'
  }
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchResults = {};
    this.requestProcessing = false;
    this.timeDelay = 50;
    this.timer = null;
    this.state = {
      isOpen: false,
      searchText: '',
      showResults: false
    };
  }

  componentWillReceiveProps(prev, next) {
    console.log(prev, next);
  }

  clearInput = () => {
    this.searchResults = {};
    this.setState({ searchText: '', showResults: false });
  }

  onSearchClick = () => {
    this.clearInput();
    const isOpen = !this.state.isOpen;
    this.setState({ isOpen });
  }

  handleSearch = (event) => {
    const value = event.target.value;
    this.setState({ searchText: value });
    if (value === '') {
      this.clearInput();
    } else {
      if (!this.requestProcessing && !this.timer) {
        this.requestProcessing = true;
        this.getAPIResults(value);
        this.savedSearchQuery = value;
      } else if (!this.timer){
         // The next API request will trigger after 'timeDelay' ms
        this.setTimedRequest()
      }
    }
  }

  setTimedRequest = () => {
   this.timer = setTimeout(() => {
        if (this.savedSearchQuery !== this.state.searchText) {
          this.getAPIResults(this.state.searchText);
          this.savedSearchQuery = this.state.searchText;
          this.setTimedRequest();
        } else {
          clearTimeout(this.timer);
          this.timer = null;
        }
      }, this.timeDelay);
  }

  renderNoResult = searchTextVal => (<div className="searchNoResults">{`Sorry, we couldn’t find any matches for ${searchTextVal}`}</div>);

  getAPIResults = (value) => {
    Utilities.getSearchResults(value, this.props.searchIndex).then((data) => {
      if (!data) return; 
      this.renderAPIData(data);
    });
  }

  renderAPIData = (results) => {
    this.requestProcessing = false;
    this.searchResults = {};
    this.searchResults = Utilities.map(results);
    for (let key in this.searchResults) {
    if (this.searchResults.hasOwnProperty(key)) {
    }
    }
    if (this.searchResults.chapter.length || 
        this.searchResults.figure.length || 
        this.searchResults.glossary.length || 
        this.searchResults.page.length ||
        this.searchResults.learningObjective.length) {
      this.setState({ showResults: true });
    } else {
      this.setState({ showResults: false });
    }
  }

  renderSearchResult = (type) => {
   if (type === 'primary') {
      const resultArray = [];
      for (let prop in this.searchResults) {
        if (prop === 'chapter' && this.searchResults[prop].length) {
          resultArray.push(<ChapterResults results={this.searchResults[prop]} key={prop} onSearchResultClick={this.props.onSearchResultClick} />);
        }
        if (prop === 'figure' && this.searchResults[prop].length) {
          resultArray.push(<FigureResults results={this.searchResults[prop]} key={prop} 
          onSearchResultClick={this.props.onSearchResultClick}/>);
        }
        if (prop === 'page' && this.searchResults[prop].length) {
          resultArray.push(<PageResults results={this.searchResults[prop]} key={prop} 
          onSearchResultClick={this.props.onSearchResultClick}/>);
        }
        if (prop === 'learningObjective' && this.searchResults[prop].length) {
          resultArray.push(<LearningObjectiveResults results={this.searchResults[prop]} key={prop} 
          onSearchResultClick={this.props.onSearchResultClick}/>);
        }
      }
      return (<div><div className="took">Search took about {this.searchResults.took} ms. Total hits: {this.searchResults.total}</div>{resultArray}</div>);
    } else if (type ==='secondary') {
      const prop = 'glossary'
      if (this.searchResults[prop] && this.searchResults[prop].length > 0) {
       return (<GlossaryResults results={this.searchResults[prop]} key={prop}
       onSearchResultClick={this.props.onSearchResultClick}/>);
      }
      return this.renderEmptyStateMsg(); 
    }
  }

  renderEmptyStateMsg = (initiator) => {
   let primary = (initiator === 'primary'); 
   return (
    <div className={`emptyContainer ${ primary ? 'primaryEmpty' : 'secondaryEmpty' }`}>
      <div className="flex">
        <div className="empty-bar1" />
        <div className="empty-bar2" />
      </div>
      {primary && 
      <div className="emptyMsg">Search page numbers, chapters, figures, learning objectives, terms.</div>}
    </div>
  )
  };

  handleClickAway = () => {
    this.setState({
      isOpen: false
    });
  };

  onClose = () => {
    this.setState({
      isOpen: false
    });
  }

   renderInput = () => {
    const { classes } = this.props;
    this.searchContainer = null;
    const placeHolderText = 'Search Content';
    return (
      <div
        ref={(input) => {
          this.searchContainer = input;
        }
        }
      >
        <div className="SearchinputBar">
          <TextField
            placeholder={placeHolderText}
            id="bootstrap-input"
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.bootstrapRoot,
                input: classes.bootstrapInput
              },
              endAdornment: <InputAdornment position="end" classes={{ root: classes.searchClear }} className={`clearText ${this.state.searchText !== '' ? 'showIcon' : 'hideIcon'}`}>
                <CloseIcon fontSize={14} fill="#6a7070" className="clearIcon" onClick={this.clearInput} aria-label="Clear search text content" />
              </InputAdornment>
            }}
            fullWidth
            onChange={this.handleSearch}
            maxLength="255"
            value={this.state.searchText}
            autoFocus
          />

        </div>
      </div>
    );
  }


  renderSearchBlock = (searchTextVal) => {
     const panelStyle = {
      width: 'auto',
      height: '100%',
      textAlign: 'center',
      borderLeft: '1px solid #dedede',
      borderRight: '1px solid #dedede'
    };
    return (<ClickAwayListener onClickAway={this.handleClickAway}><Modal open={this.state.isOpen} contentlabel="Search" onClose={this.onClose}>
      <div className="outer">
        <div className="searchPanelContainer" style={{ panelStyle }}>
          <div className="primaryWrap wrap">
            <Paper className="searchPanel primary" elevation={0}>
               {this.renderInput()}
              <div className={`searchResultContainer  ${this.state.showResults ? 'responseContainer' : 'msgContainer'}`}>
                {this.state.searchText === '' && this.renderEmptyStateMsg('primary')}
                {this.state.searchText !== '' && this.state.showResults && this.renderSearchResult('primary')}
                {this.state.searchText !== '' && !this.state.showResults && !this.requestProcessing && this.renderNoResult(searchTextVal)}
              </div>
            </Paper>
          </div>
          <div className="secondaryWrap wrap">
            <Paper className="searchPanel secondary" elevation={0}>
              <div className={`searchResultContainer ${this.state.showResults ? 'responseContainer' : 'msgContainer'}`}>
                {this.state.searchText === '' && this.renderEmptyStateMsg()}
                {this.state.searchText !== '' && this.state.showResults && this.renderSearchResult('secondary')}
                {this.state.searchText !== '' && !this.state.showResults && this.renderEmptyStateMsg()}
              </div>
            </Paper>
          </div>
        </div>
        <div className="closeBtnContainer">
          <span className="esc">Hit <span className="escSpan">ESC</span> to close</span>
          <div className="closeBtn">
            <CloseIcon onClick={this.onClose} aria-label="Close" />
          </div>
        </div>
      </div>
    </Modal>
    </ClickAwayListener>);
  }

  render() {
    const searchTextVal = `"${this.state.searchText}"`;
    const searchStyle = {
      width: 34,
      height: 34,
      backgroundColor: this.state.isOpen ? '#e9f3f6' : ''
    };
    return (
      <div className="searchContainer">
        <span>
          <SearchIcon
            searchClick={this.onSearchClick}
            className="searchIconBtn"
            ariaLabel="Search"
            iconStyle={searchStyle}
            seachMode={this.state.isOpen}
          />
          {this.state.isOpen && this.renderSearchBlock(searchTextVal)}
        </span>
      </div>
    );
  }
}

Search.propTypes = {
  onSearchResultClick: PropTypes.func,
};

export default withStyles(styles)(Search);
