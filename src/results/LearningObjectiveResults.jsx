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
* @author Dhanya Menon
*
*/

import React from 'react';
import PropTypes from 'prop-types';

export default class LearningObjectiveResults extends React.Component {
	mapResults = () => {
		const numRes = this.props.results.length;
		const heading = (<div><h5>Learning Objectives - <span className="NumResults">{`(${this.props.results.length} result${numRes > 1 ? 's' : ''})`}</span></h5></div>);
		const resultdisplay = this.props.results.map((result, index) => {
			let comp = null; 
       /*eslint-disable */
      if (result && (result.highlight && result.highlight.authoredText && result.highlight.authoredText.length)) {
        comp = (<div className="resCard" key={index}>
          <div
          className="title"
          dangerouslySetInnerHTML={{ __html: result.highlight.authoredText.reduce((accumulator, title) => {
        return `${accumulator} ${title}`
      }, '') }}
          onClick={() => this.props.onSearchResultClick(result.id, 'moreRes', result._source.pageUrn)} 
        />
        {result._source.path ? <img src={result._source.path} className="imgThumb" /> : ''}
        </div>);
      }  else if (result && result._source && result._source.authoredText) {
        comp = (<div className="resCard" key={index}><div
          className="title"
          dangerouslySetInnerHTML={{ __html: result._source.authoredText }}
          onClick={() => this.props.onSearchResultClick(result.id, 'moreRes', result._source.pageUrn)} 
        />
        {result._source.title ? <div className="desc">{result._source.title}</div> : ''}
        {result._source.path ? <img src={result._source.path} className="imgThumb" /> : ''}
        </div>);
      }
  		return comp;
  	});
    return (<div>{heading}{resultdisplay}</div>);
  };

	render(){
		return(<div>{this.mapResults()}</div>)
	}
}

LearningObjectiveResults.propTypes = {
  results: PropTypes.array,
};