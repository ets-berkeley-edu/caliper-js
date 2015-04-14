/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Organization = require('./organization');
var EntityType = require('../entityType');

/**
 * Represents SoftwareApplication.  
 * SoftwareApplication's prototype set to Organization
 * @constructor
 * @param {string} id URI
 * @extends Organization
 */
function SoftwareApplication(id) {

  Organization.call(this);

  this.setId(id);
  this.setType(EntityType.SOFTWARE_APPLICATION);

}

SoftwareApplication.prototype = _.create(Organization.prototype);

module.exports = SoftwareApplication;
