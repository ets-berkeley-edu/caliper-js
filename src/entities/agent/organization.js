/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var W3COrganization = require('../w3c/organization');
var EntityType = require('../entityType');

/**
 * Represents an LTI W3C Organization.
 * Organization's prototype set to W3COrganization
 * @constructor
 * @param {string} id URI
 * @extends W3COrganization
 */
function Organization(id) {

  W3COrganization.call(this);

  this.setId(id);
  this.setType(EntityType.ORGANIZATION);

}

Organization.prototype = _.create(W3COrganization.prototype);

module.exports = Organization;