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

var _ = require('lodash-node');
var DigitalResource = require('../digitalResource');
var DigitalResourceType = require('../digitalResourceType');

/**
 * Represents AssignableDigitalResource.  
 * AssignableDigitalResource's prototype set to DigitalResource
 * @constructor
 * @param {string} id URI
 * @param {string} type Type
 * @property {string} dateCreated String representation of Date
 * @property {string} dateToActivate String representation of Date
 * @property {string} dateToShow String representation of Date
 * @property {string} dateToStartOn String representation of Date
 * @property {string} dateToSubmit String representation of Date
 * @property {number} maxAttempts Maximum attempts
 * @property {number} maxSubmits  Maximum submits
 * @property {number} maxScore Maximum scores
 * @extends DigitalResource
 */
function AssignableDigitalResource(id) {
    DigitalResource.call(this);
    this.setId(id);
    this.setType(DigitalResourceType.ASSIGNABLE_DIGITAL_RESOURCE);
    this.setDateToActivate(null);
    this.setDateToShow(null);
    this.setDateToStartOn(null);
    this.setDateToSubmit(null);
    this.setMaxAttempts(null);
    this.setMaxSubmits(null);
    this.setMaxScore(null);
}

AssignableDigitalResource.prototype = _.create(DigitalResource.prototype);

AssignableDigitalResource.prototype.setDateCreated = function(dateCreated) {
  this.dateCreated = dateCreated;
};

AssignableDigitalResource.prototype.setDateToActivate = function(dateToActivate) {
  this.dateToActivate = dateToActivate;
};

AssignableDigitalResource.prototype.setDateToShow = function(dateToShow) {
  this.dateToShow = dateToShow;
};

AssignableDigitalResource.prototype.setDateToStartOn = function(dateToStartOn) {
  this.dateToStartOn = dateToStartOn;
};

AssignableDigitalResource.prototype.setDateToSubmit = function(dateToSubmit) {
  this.dateToSubmit = dateToSubmit;
};

AssignableDigitalResource.prototype.setMaxAttempts = function(maxAttempts) {
  this.maxAttempts = maxAttempts;
};

AssignableDigitalResource.prototype.setMaxSubmits = function(maxSubmits) {
  this.maxSubmits = maxSubmits;
};

AssignableDigitalResource.prototype.setMaxScore = function(maxScore) {
  this.maxScore = maxScore;
};

module.exports = AssignableDigitalResource;