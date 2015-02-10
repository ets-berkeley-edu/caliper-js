/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('../caliperEntity');

function Session(id, type) {

    Entity.call(this);

    this.setId(id);
    this.setType(this.Types.SESSION);

    this.setProperties({});
}

Session.prototype = _.create(Entity.prototype);

Session.prototype.setActor = function(actor) {
    this.actor = actor;
};

Session.prototype.setStartedAtTime = function(startedAt) {
    this.startedAtTime = startedAt;
};

Session.prototype.setEndedAtTime = function(endedAt) {
    this.endedAtTime = endedAt;
};

Session.prototype.setDuration = function(duration) {
    this.duration = duration;
};

module.exports = Session;
