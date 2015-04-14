/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Agent = require('./agent');
var EntityType = require('../entityType');

/**
 * Represents an LTI W3C Organization.
 * Organization's prototype set to Agent
 * @constructor
 * @param {string} id URI
 * @property {Object[]} memberships Array of Memberships
 * @property {Object} subOrganizationOf Parent Organization Object
 * @extends Agent
 */
function Organization(id) {

  Agent.call(this);

  this.setId(id);
  this.setType(EntityType.ORGANIZATION);
  this.setName(null);
  this.setDescription(null);
  this.setExtensions({});

}

Organization.prototype = _.create(Agent.prototype);

Organization.prototype.setMembership = function(membership) {
  this.membership = membership;
};

Organization.prototype.setSubOrganizationOf = function(subOrganizationOf) {
  this.subOrganizationOf = subOrganizationOf;
};

module.exports = Organization;