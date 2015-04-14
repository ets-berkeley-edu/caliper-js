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
 * @param {string} type Type
 * @property {string} assignable URI representing Assignment being attempted
 * @property {string} actor URI representing Actor attempted
 * @property {Object} attempt representing attempt
 * @property {string} startedAtTime String Representation of Date
 * @property {string} endedAtTime String Representation of Date
 * @property {string} duration The format is expected to be PnYnMnDTnHnMnS
 * @extends Entity
 */
function Response(id) {

    Entity.call(this);

    this.setId(id);
    this.setType(EntityType.RESPONSE);

    this.setName(null);
    this.setDescription(null);
    this.setExtensions({});
    this.setDateCreated(null);
    this.setDateModified(null);
    this.setStartedAtTime(null);
    this.setEndedAtTime(null);
    this.setDuration(null);
}

Response.prototype = _.create(Entity.prototype);

Response.prototype.setAssignable = function (assignableId) {
    this.assignable = assignableId;
};

Response.prototype.setActor = function (actorId) {
    this.actor = actorId;
};

Response.prototype.setAttempt = function (attempt) {
    this.attempt = attempt;
};

Response.prototype.setStartedAtTime = function (startedAt) {
    this.startedAtTime = startedAt;
};

Response.prototype.setEndedAtTime = function (endedAt) {
    this.endedAtTime = endedAt;
};

Response.prototype.setDuration = function (duration) {
    this.duration = duration;
};

module.exports = Response;