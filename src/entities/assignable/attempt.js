/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('../entity');
var EntityType = require('../entityType');

/**
 * Represents Attempt.  
 * Attempt's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @param {string} type Type
 * @property {string} assignable URI representing Assignment being attempted
 * @property {string} actor URI representing Actor attempted
 * @property {number} count Counter representing attempt
 * @property {string} startedAtTime String Representation of Date
 * @property {string} endedAtTime String Representation of Date
 * @property {string} duration The format is expected to be PnYnMnDTnHnMnS
 * @extends Entity
 */
function Attempt(id) {

    Entity.call(this);

    this.setId(id);
    this.setType(EntityType.ATTEMPT);

    this.setExtensions({});
}

Attempt.prototype = _.create(Entity.prototype);

Attempt.prototype.setAssignable = function (assignableId) {
    this.assignable = assignableId;
};

Attempt.prototype.setActor = function (actorId) {
    this.actor = actorId;
};

Attempt.prototype.setCount = function (count) {
    this.count = count;
};

Attempt.prototype.setStartedAtTime = function (startedAt) {
    this.startedAtTime = startedAt;
};

Attempt.prototype.setEndedAtTime = function (endedAt) {
    this.endedAtTime = endedAt;
};

Attempt.prototype.setDuration = function (duration) {
    this.duration = duration;
};

module.exports = Attempt;