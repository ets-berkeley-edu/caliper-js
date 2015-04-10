/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var DigitalResource = require('../digitalResource');

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
function AssignableDigitalResource(id, type) {

  DigitalResource.call(this);

  this.setId(id);
  this.setType(this.Types.ASSIGNABLE_DIGITAL_RESOURCE);

  this.setExtensions({});
  this.setDateCreated(null);
  this.setDateToActivate(null);
  this.setDateToShow(null);
  this.setDateToStartOn(null);
  this.setDateToSubmit(null);
  this.setMaxAttempts(null);
  this.setMaxSubmits(null);
  this.setMaxScore(null);
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
