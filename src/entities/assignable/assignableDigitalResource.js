/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var DigitalResource = require('../digitalResource');

function AssignableDigitalResource(id, type) {

  DigitalResource.call(this);

  this.setId(id);
  this.setType(this.Types.ASSIGNABLE_DIGITAL_RESOURCE);

  this.setProperties({});
  this.setDateCreated(0);
  this.setDateToActivate(0);
  this.setDateToShow(0);
  this.setDateToStartOn(0);
  this.setDateToSubmit(0);
  this.setMaxAttempts(0);
  this.setMaxSubmits(0);
  this.setMaxScore(0);
}

AssignableDigitalResource.prototype = _.create(DigitalResource.prototype);

AssignableDigitalResource.prototype.setDateCreated = function (dateCreated) {
  this.dateCreated = dateCreated;
};

AssignableDigitalResource.prototype.setDateToActivate = function (dateToActivate) {
  this.dateToActivate = dateToActivate;
};

AssignableDigitalResource.prototype.setDateToShow = function (dateToShow) {
  this.dateToShow = dateToShow;
};

AssignableDigitalResource.prototype.setDateToStartOn = function (dateToStartOn) {
  this.dateToStartOn = dateToStartOn;
};

AssignableDigitalResource.prototype.setDateToSubmit = function (dateToSubmit) {
  this.dateToSubmit = dateToSubmit;
};

AssignableDigitalResource.prototype.setMaxAttempts = function (maxAttempts) {
  this.maxAttempts = maxAttempts;
};

AssignableDigitalResource.prototype.setMaxSubmits = function (maxSubmits) {
  this.maxSubmits = maxSubmits;
};

AssignableDigitalResource.prototype.setMaxScore = function (maxScore) {
  this.maxScore = maxScore;
};

AssignableDigitalResource.prototype.Types = {
  "ASSESSMENT": "http://purl.imsglobal.org/caliper/v1/Assessment",
  "ASSESSMENT_ITEM": "http://purl.imsglobal.org/caliper/v1/AssessmentItem"
};


module.exports = AssignableDigitalResource;
