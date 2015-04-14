/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Organization = require('../agent/organization');
var EntityType = require('../entityType');

/**
 * Represents Group.
 * Group's prototype set to Organization
 * @constructor
 * @param {string} id URI
 * @extends Entity
 */
function Group(id) {

    Organization.call(this);

    this.setId(id);
    this.setType(EntityType.GROUP);

}

Group.prototype = _.create(Organization.prototype);

module.exports = Group;