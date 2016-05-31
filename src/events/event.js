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

var Context = require('../context/context');
var EventType = require('./eventType');

/**
 * Represents Base Caliper Event.
 * @constructor
 * @param {Object} actor The Agent initiating the action
 * @param {string} action The action
 * @param {Object} obj Object of the interaction
 * @param {Object} optional Optional property settings
 * @property {string} context Context
 * @property {string} type Type
 * @property {string} sourcedId Event identifier
 * @property {Object} actor Actor initiating the action
 * @property {string} action String representing the action
 * @property {Object} object Object of the interaction
 * @property {string} eventTime String representing Date (ISO 8601 format)
 * @property {Object} generated Generated
 * @property {Object} target Target
 * @property {Object} referrer Referrer
 * @property {Object} edApp EdApp Object
 * @property {Object} group Group Object
 * @property {Object} membership Membership Object
 * @property {Object} session Current Session Object
 * @property {Object} federatedSession LTI Consumer Session Object
 * @property {Object} extensions Extensions Object
 */

// constructor
function Event(required, optional) {
  // TODO VALIDATE REQUIRED. THROUGH ERROR IF INCOMPLETE
  required = required || {};
  optional = optional || {};

  this.setContext(Context.CONTEXT);
  this.setType(EventType.EVENT);
  if (optional.hasOwnProperty("sourcedId")) {
    this.setSourcedId(optional.sourcedId);
  }
  this.setActor(required.actor);
  this.setAction(required.action);
  this.setObject(required.obj);
  this.setEventTime(required.eventTime);
  if (optional.hasOwnProperty("generated")) {
    this.setGenerated(optional.generated);
  }
  if (optional.hasOwnProperty("target")) {
    this.setTarget(optional.target);
  }
  if (optional.hasOwnProperty("referrer")) {
    this.setReferrer(optional.referrer);
  }
  if (optional.hasOwnProperty("edApp")) {
    this.setEdApp(optional.edApp);
  }
  if (optional.hasOwnProperty("group")) {
    this.setGroup(optional.group);
  }
  if (optional.hasOwnProperty("membership")) {
    this.setMembership(optional.membership);
  }
  if (optional.hasOwnProperty("session")) {
    this.setSession(optional.session);
  }
  if (optional.hasOwnProperty("federatedSession")) {
    this.setFederatedSession(optional.federatedSession);
  }
  if (optional.hasOwnProperty("extensions")) {
    this.setExtensions(optional.extensions);
  }
}

// Setters for Caliper Event properties
Event.prototype = {
  setContext: function(context) {
    this['@context'] = context;
  },
  setType: function(type) {
    this['@type'] = type;
  },
  setSourcedId: function(sourcedId) {
    this.sourcedId = sourcedId;
  },
  setActor: function(actor) {
    this.actor = actor;
  },
  setAction: function(action) {
    this.action = action;
  },
  setObject: function(object) {
    this.object = object;
  },
  setEventTime: function(eventTime) {
    this.eventTime = eventTime;
  },
  setGenerated: function(generated) {
    this.generated = generated;
  },
  setTarget: function(target) {
    this.target = target;
  },
  setReferrer: function(referrer) {
    this.referrer = referrer;
  },
  setEdApp: function(edApp) {
    this.edApp = edApp;
  },
  setGroup: function(group) {
    this.group = group;
  },
  setMembership: function(membership) {
    this.membership = membership;
  },
  setSession: function(session) {
    this.session = session;
  },
  setFederatedSession: function(federatedSession) {
    this.federatedSession = federatedSession;
  },
  setExtensions: function(extensions) {
    this.extensions = extensions;
  }
};

module.exports = Event;