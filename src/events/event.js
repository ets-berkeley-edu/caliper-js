/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

/**
 * Represents Base Caliper Event.
 * @constructor
 * @property {string} context Context
 * @property {string} type Type
 * @property {Object} actor Actor Object
 * @property {string} action String representing the action
 * @property {Object} target Target
 * @property {Object} generated Generated
 * @property {string} startedAtTime String representing Date
 * @property {string} endedAtTime String representing Date
 * @property {string} duration duration The format is expected to be PnYnMnDTnHnMnS
 * @property {Object} group Group Object
 * @property {Object} edApp EdApp Object
 */
function Event() {
  // Constructor
}

// Setters for Caliper Event properties

Event.prototype.setContext = function (context) {
    this['@context'] = context;
};

Event.prototype.setType = function (type) {
    this['@type'] = type;
};

Event.prototype.setActor = function (actor) {
    this.actor = actor;
};

Event.prototype.setAction = function (action) {
    this.action = action;
};

Event.prototype.setObject = function (object) {
    this.object = object;
};

Event.prototype.setTarget = function (target) {
    this.target = target;
};

Event.prototype.setGenerated = function (generated) {
    this.generated = generated;
};

Event.prototype.setStartedAtTime = function (startedAt) {
    this.startedAtTime = startedAt;
};

Event.prototype.setEndedAtTime = function (endedAt) {
    this.endedAtTime = endedAt;
};

Event.prototype.setDuration = function (duration) {
    this.duration = duration;
};

Event.prototype.setEdApp = function (edApp) {
    this.edApp = edApp;
};

Event.prototype.setGroup = function (group) {
    this.group = group;
};

Event.prototype.setMembership = function (membership) {
    this.membership = membership;
};

Event.prototype.setFederatedSession = function (federatedSession) {
    this.federatedSession = federatedSession;
};

module.exports = Event;