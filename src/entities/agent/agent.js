/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('./../entity');
var EntityType = require('./../entityType');

/**
 * Represents Agent.  Analogous to a FOAF Agent
 * Agent's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @param {string} type type
 * @param {Object[]} hasMemberships array
 * @extends Entity
 */
function Agent(id) {

    Entity.call(this);

    this.setId(id);
    this.setType(EntityType.AGENT);
    this.setName(null);
    this.setDescription(null);
    //this.setHasMembership([]);
    this.setExtensions({});
    this.setDateCreated(null);
    this.setDateModified(null);

}

Agent.prototype = _.create(Entity.prototype);

Agent.prototype.setHasMembership = function (hasMembership) {
  this.hasMembership = hasMembership;
}

module.exports = Agent;