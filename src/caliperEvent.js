/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

function Event() {
  // Constructor
}

// Setters for Caliper Event properties

Event.prototype.setContext = function (context) {
  this.context = context;
};

Event.prototype.setType = function (type) {
  this.type = type;
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

Event.prototype.setStartedAt = function (startedAt) {
  this.startedAt = startedAt;
};

Event.prototype.setEndedAt = function (endedAt) {
  this.endedAt = endedAt;
};

Event.prototype.setDuration = function (duration) {
  this.duration = duration;
};

Event.prototype.setLisOrganization = function (lisOrganization) {
  this.lisOrganization = lisOrganization;
};

Event.prototype.setEdApp = function (edApp) {
  this.edApp = edApp;
};

module.exports = Event;
