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
 */

import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * A React component for Cancel icon.
 *
 * @author Jayanthi Kandhasamy
 */

const Cancel = props => (
  <SvgIcon {...props}>
    <path
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      fill="#6a7070"
    />
  </SvgIcon>
);

const styles = {
  root: {
    minWidth: 22,
    minHeight: 24,
    padding:0,
    borderRadius: 13
  }
};

const CloseIcon = props => (
  <Button
    {...props}
    classes={{ root: props.classes.root }}
  >
    <Cancel viewBox="-2 -2 28 28" />
  </Button>
);

CloseIcon.propTypes = {
  ariaLabel: PropTypes.string,
  iconStyle: PropTypes.object,
  onTouchTap: PropTypes.func,
  className: PropTypes.object,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CloseIcon);
