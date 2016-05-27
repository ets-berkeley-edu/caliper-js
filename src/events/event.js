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

/**
 * Represents Base Caliper Event.
 * @constructor
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
function Event() {
  this.setContext(Context.CONTEXT);
  this.setType(null);
  this.setSourcedId(null);
  this.setActor(null);
  this.setAction(null);
  this.setObject(null);
  this.setEventTime(null);
  this.setGenerated(null);
  this.setTarget(null);
  this.setReferrer(null);
  this.setEdApp(null);
  this.setGroup(null);
  this.setMembership(null);
  this.setSession(null);
  this.setFederatedSession(null);
  this.setExtensions(null);
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