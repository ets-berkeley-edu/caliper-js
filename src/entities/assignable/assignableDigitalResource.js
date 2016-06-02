/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

var _ = require('lodash');
var DigitalResource = require('../digitalResource');
var digitalResourceType = require('../digitalResourceType');

/**
 * Represents AssignableDigitalResource.  
 * AssignableDigitalResource's prototype set to DigitalResource
 * @constructor
 * @param {string} id URI
 * @param {Object} props Optional property settings
 * @property {string} dateToActivate String representation of Date
 * @property {string} dateToShow String representation of Date
 * @property {string} dateToStartOn String representation of Date
 * @property {string} dateToSubmit String representation of Date
 * @property {number} maxAttempts Maximum attempts
 * @property {number} maxSubmits  Maximum submits
 * @property {number} maxScore Maximum scores
 * @extends DigitalResource
 */
function AssignableDigitalResource(id, props) {
  props = props || {};

  DigitalResource.call(this, id, props);
  this.setType(digitalResourceType.ASSIGNABLE_DIGITAL_RESOURCE);
  if (props.hasOwnProperty("dateToActivate")) {
    this.setDateToActivate(props.dateToActivate);
  }
  if (props.hasOwnProperty("dateToShow")) {
    this.setDateToShow(props.dateToShow);
  }
  if (props.hasOwnProperty("dateToStartOn")) {
    this.setDateToStartOn(props.dateToStartOn);
  }
  if (props.hasOwnProperty("dateToSubmit")) {
    this.setDateToSubmit(props.dateToSubmit);
  }
  if (props.hasOwnProperty("maxAttempts")) {
    this.setMaxAttempts(props.maxAttempts);
  }
  if (props.hasOwnProperty("maxSubmits")) {
    this.setMaxSubmits(props.maxSubmits);
  }
  if (props.hasOwnProperty("maxScore")) {
    this.setMaxScore(props.maxScore);
  }
}

// Inherit from the prototype and assign additional properties to the object per the model as required.
AssignableDigitalResource.prototype = _.create(DigitalResource.prototype, {
  setDateToActivate: function(dateToActivate) {
    this.dateToActivate = dateToActivate;
  },
  setDateToShow: function(dateToShow) {
    this.dateToShow = dateToShow;
  },
  setDateToStartOn: function(dateToStartOn) {
    this.dateToStartOn = dateToStartOn;
  },
  setDateToSubmit: function(dateToSubmit) {
    this.dateToSubmit = dateToSubmit;
  },
  setMaxAttempts: function(maxAttempts) {
    this.maxAttempts = maxAttempts;
  },
  setMaxSubmits: function(maxSubmits) {
    this.maxSubmits = maxSubmits;
  },
  setMaxScore: function(maxScore) {
    this.maxScore = maxScore;
  }
});

module.exports = AssignableDigitalResource;