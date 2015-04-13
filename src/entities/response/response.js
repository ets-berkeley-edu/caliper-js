/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('../entity');
var EntityType = require('../entityType');

/**
 * Represents Response.
 * Response's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @extends Entity
 */
function Response(id) {

    Entity.call(this);

    this.setId(id);
    this.setType(EntityType.RESPONSE);
    this.setName(null);
    this.setDescription(null);
    this.setExtensions({});
}

Response.prototype = _.create(Entity.prototype);

module.exports = Response;
