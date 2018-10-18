/**
 * PEARSON PROPRIETARY AND CONFIDENTIAL INFORMATION SUBJECT TO NDA
 * Copyright © 2017 Pearson Education, Inc.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Pearson Education, Inc.  The intellectual and technical concepts contained
 * herein are proprietary to Pearson Education, Inc. and may be covered by U.S. and Foreign Patents,
 * patent applications, and are protected by trade secret or copyright law.
 * Dissemination of this information, reproduction of this material, and copying or distribution of this software
 * is strictly forbidden unless prior written permission is obtained
 * from Pearson Education, Inc.
 **/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
/**
 * A React component for back button icon.
 *
 * @author Rajkumar Thirugnanam
 */
const Search = props => (
  <SvgIcon {...props}>
    <g fill="none" fillRule="evenodd">
      <path fill={props.bcolor} stroke={props.bcolor} strokeWidth=".45" d="M8.364 2.636a5.734 5.734 0 0 1 5.727 5.728 5.735 5.735 0 0 1-5.727 5.727 5.734 5.734 0 0 1-5.728-5.727 5.734 5.734 0 0 1 5.728-5.728m4.447 11.449l4.81 4.674a.8.8 0 0 0 1.141.002.825.825 0 0 0 .003-1.156l-4.818-4.68a7.369 7.369 0 0 0 1.581-4.568C15.528 4.3 12.27 1 8.264 1S1 4.3 1 8.357c0 4.055 3.258 7.356 7.264 7.356 1.72 0 3.3-.612 4.547-1.628z" />
    </g>
  </SvgIcon>
);

const focusRippleColor = '#E9E9E9';
const selectedColor = '#047A9C';
const defaultColor = '#252525';

const styles = () => ({
  root: {
    verticalAlign: 'baseline',
    '&:hover': {
      backgroundColor: focusRippleColor
    },
    minHeight: 44,
    minWidth: 44,
    padding: 12
  }
});

const SearchIcon = ({
  className, ariaLabel, searchClick, ariaExpanded, iconStyle, seachMode, classes
}) => (
  <IconButton classes={{ root: classes.root }} className={className} style={iconStyle} aria-label={ariaLabel} aria-expanded={ariaExpanded} onClick={searchClick}>
    <Search viewBox="-3 -1 24 24" bcolor={seachMode ? selectedColor : defaultColor} />
  </IconButton>
);

SearchIcon.propTypes = {
  ariaLabel: PropTypes.string,
  searchClick: PropTypes.func,
  ariaExpanded: PropTypes.bool,
  className: PropTypes.string,
  iconStyle: PropTypes.object,
  seachMode: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchIcon);
