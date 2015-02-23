/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
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
 * @property {Object} lisOrganization LISOrganization Object
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

Event.prototype.setLisOrganization = function (lisOrganization) {
  this.group = lisOrganization;
};

Event.prototype.setEdApp = function (edApp) {
  this.edApp = edApp;
};

Event.prototype.Contexts = {
  "ANNOTATION": "http://purl.imsglobal.org/ctx/caliper/v1/AnnotationEvent",
  "ASSESSMENT": "http://purl.imsglobal.org/ctx/caliper/v1/AssessmentEvent",
  "ASSESSMENT_ITEM": "http://purl.imsglobal.org/ctx/caliper/v1/AssessmentItemEvent",
  "ASSIGNABLE": "http://purl.imsglobal.org/ctx/caliper/v1/AssignableEvent",
  "EVENT": "http://purl.imsglobal.org/ctx/caliper/v1/Event",
  "MEDIA": "http://purl.imsglobal.org/ctx/caliper/v1/MediaEvent",
  "NAVIGATION": "http://purl.imsglobal.org/ctx/caliper/v1/NavigationEvent",
  "OUTCOME": "http://purl.imsglobal.org/ctx/caliper/v1/OutcomeEvent",
  "VIEWED": "http://purl.imsglobal.org/ctx/caliper/v1/ViewEvent",
  "SESSION": "http://purl.imsglobal.org/ctx/caliper/v1/SessionEvent"
};

Event.prototype.Types = {
  "ANNOTATION": "http://purl.imsglobal.org/caliper/v1/AnnotationEvent",
  "ASSESSMENT": "http://purl.imsglobal.org/caliper/v1/AssessmentEvent",
  "ASSESSMENT_ITEM": "http://purl.imsglobal.org/caliper/v1/AssessmentItemEvent",
  "ASSIGNABLE": "http://purl.imsglobal.org/caliper/v1/AssignableEvent",
  "EVENT": "http://purl.imsglobal.org/caliper/v1/Event",
  "MEDIA": "http://purl.imsglobal.org/caliper/v1/MediaEvent",
  "NAVIGATION": "http://purl.imsglobal.org/caliper/v1/NavigationEvent",
  "OUTCOME": "http://purl.imsglobal.org/caliper/v1/OutcomeEvent",
  "VIEWED": "http://purl.imsglobal.org/caliper/v1/ViewEvent",
  "SESSION": "http://purl.imsglobal.org/caliper/v1/SessionEvent"
};

module.exports = Event;
