/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var AssignableDigitalResource = require('../assignable/assignableDigitalResource');

/**
 * Represents AssessmentItem.  
 * AssessmentItem's prototype set to AssignableDigitalResource
 * @constructor
 * @param {String} id URI
 * @param {String} type Type
 * @extends AssignableDigitalResource
 */
function AssessmentItem(id, type) {

  AssignableDigitalResource.call(this);

  this.setId(id);
  this.setType(this.Types.ASSESSMENT_ITEM);

  this.setProperties({});
}

AssessmentItem.prototype = _.create(AssignableDigitalResource.prototype);


module.exports = AssessmentItem;
