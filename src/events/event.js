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

var context = require('../context/context');
var eventType = require('./eventType');

/**
 * Represents Base Caliper Event.
 * @constructor
 * @param {Object} props Optional property settings
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

/*
var Event = {
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
*/

var Event = {
  '@context': context.CONTEXT,
  '@type': eventType.EVENT,
  actor: {},
  action: null,
  object: {},
  eventTime: null,
  generated: {},
  target: {},
  referrer: {},
  edApp: {},
  group: {},
  membership: {},
  session: null,
  federatedSession: null,
  extensions: {}
};


/**
 * Factory function
 * @param props
 */
/*
function Event(props) {
  props = props || {};
  return _.assign(_.create(Event(props)), {
    context: Context.CONTEXT,
    type: eventType.EVENT
  });
}
*/

// constructor
/*
function Event(props) {
  props = props || {};

  this.setContext(Context.CONTEXT);
  this.setType(eventType.EVENT);
  if (props.hasOwnProperty("sourcedId")) {
    this.setSourcedId(props.sourcedId);
  }
  if (props.hasOwnProperty("actor")) {
    this.setActor(props.actor);
  } else {
    // TODO raise error via callback
  }
  if (props.hasOwnProperty("action")) {
    this.setAction(props.action);
  } else {
    // TODO raise error via callback
  }
  if (props.hasOwnProperty("obj")) {
    this.setObject(props.obj);
  } else {
    // TODO raise error via callback
  }
  if (props.hasOwnProperty("eventTime")) {
    this.setEventTime(props.eventTime);
  } else {
    // TODO raise error via callback
  }
  if (props.hasOwnProperty("generated")) {
    this.setGenerated(props.generated);
  }
  if (props.hasOwnProperty("target")) {
    this.setTarget(props.target);
  }
  if (props.hasOwnProperty("referrer")) {
    this.setReferrer(props.referrer);
  }
  if (props.hasOwnProperty("edApp")) {
    this.setEdApp(props.edApp);
  }
  if (props.hasOwnProperty("group")) {
    this.setGroup(props.group);
  }
  if (props.hasOwnProperty("membership")) {
    this.setMembership(props.membership);
  }
  if (props.hasOwnProperty("session")) {
    this.setSession(props.session);
  }
  if (props.hasOwnProperty("federatedSession")) {
    this.setFederatedSession(props.federatedSession);
  }
  if (props.hasOwnProperty("extensions")) {
    this.setExtensions(props.extensions);
  }
}
*/

// Setters for Caliper Event properties
/*
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

*/

module.exports = Event;