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

var _ = require('lodash');
var Event = require('./event');
var EventType = require('./eventType');

/**
 * Represents Assessment Event.  
 * Assessment's prototype set to Event
 * @constructor
 * @param {Object} actor The Agent initiating the action
 * @param {string} action The action
 * @param {Object} obj Object of the interaction
 * @param {Object} props Optional property settings
 * @extends Event
 */
function AssessmentEvent(required, optional) {
  // TODO VALIDATE REQUIRED. THROUGH ERROR IF INCOMPLETE
  required = required || {};
  optional = optional || {};

  Event.call(this);
  this.setType(EventType.ASSESSMENT);
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

AssessmentEvent.prototype = _.create(Event.prototype);

module.exports = AssessmentEvent;