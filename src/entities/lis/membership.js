/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var W3CMembership = require('../w3c/membership');
var EntityType = require('../entityType');

/**
 * Represents a W3C Membership.
 * Membership's prototype set to W3C Membership
 * @constructor
 * @param {string} id URI
 * @extends W3CMembership
 */
function Membership(id) {

    W3CMembership.call(this);

    this.setId(id);
    this.setType(EntityType.MEMBERSHIP)

}

Membership.prototype = _.create(W3CMembership.prototype);

module.exports = Membership;