/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var AssignableDigitalResource = require('../assignable/assignableDigitalResource');
var AssignableDigitalResourceType = require('../assignable/assignableDigitalResourceType');

/**
 * Represents AssessmentItem.  
 * AssessmentItem's prototype set to AssignableDigitalResource
 * @constructor
 * @param {string} id URI
 * @param {string} type Type
 * @property assessmentItems
 * @extends AssignableDigitalResource
 */
function Assessment(id, type) {

  AssignableDigitalResource.call(this);

  this.setId(id);
  this.setType(AssignableDigitalResourceType.ASSESSMENT);

  this.setExtensions({});
}

Assessment.prototype = _.create(AssignableDigitalResource.prototype);

Assessment.prototype.setAssessmentItems = function (assessmentItems) {
  this.assessmentItems = assessmentItems;
};

module.exports = Assessment;