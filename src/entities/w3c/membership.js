/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('../entity');
var EntityType = require('../entityType');

/**
 * Represents a W3C Membership.
 * Membership's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @property {string} memberId member Identifier
 * @property {string} organizationId organization Identifier
 * @property {Object[]} roles Array of roles
 * @extends Entity
 */
function Membership(id) {

    Entity.call(this);

    this.setId(id);
    this.setType(EntityType.MEMBERSHIP);
    this.setName(null);
    this.setDescription(null);
    this.setExtensions({});

}

Membership.prototype = _.create(Entity.prototype);

Membership.prototype.setMember = function(member) {
    this.member = member;
};

Membership.prototype.setOrganization = function(organization) {
    this.organization = organization;
};

Membership.prototype.setRoles = function(roles) {
    this.roles = roles;
};

Membership.prototype.setStatus = function(status) {
    this.status = status;
};

module.exports = Membership;