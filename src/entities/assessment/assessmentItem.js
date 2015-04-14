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
 * @param {String} id URI
 * @property {boolean} isTimeDependent boolean true/false
 * @extends AssignableDigitalResource
 */
function AssessmentItem(id) {

    AssignableDigitalResource.call(this);

    this.setId(id);
    this.setType(AssignableDigitalResourceType.ASSESSMENT_ITEM);

}

AssessmentItem.prototype = _.create(AssignableDigitalResource.prototype);

AssessmentItem.prototype.isTimeDependent = function (isTimeDependent) {
    this.isTimeDependent = isTimeDependent;
};

module.exports = AssessmentItem;