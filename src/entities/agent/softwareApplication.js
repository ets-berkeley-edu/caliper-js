/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var W3COrganization = require('../w3c/organization');
var EntityType = require('../entityType');

/**
 * Represents SoftwareApplication.  
 * SoftwareApplication's prototype set to W3COrganization
 * @constructor
 * @param {string} id URI
 * @param {string} type Type
 * @extends W3COrganization
 */
function SoftwareApplication(id) {

  Agent.call(this);

  this.setId(id);
  this.setType(EntityType.type.SOFTWARE_APPLICATION);

}

SoftwareApplication.prototype = _.create(Agent.prototype);

module.exports = SoftwareApplication;
