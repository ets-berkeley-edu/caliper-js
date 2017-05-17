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
var config = require('./config/config');
var envelope = require('./envelope');
var hashMap = require('hashmap');
var logger = require('./logger');
var moment = require('moment');

/**
 * Grab an existing namespace object or create a blank object if it doesn't exist
 * so we can attach non-sensor module exports to it
 * @type {{}|*|Caliper}
 */
var Caliper = (typeof window !== 'undefined') ? window.Caliper || {} : {};

/**
 * Caliper Sensor.
 * @constructor
 * @type {{}}
 */
var Sensor = {};
var id;
var initialized = false;

/**
 * Caliper Sensor clients.
 * @type {HashMap}
 */
var clients = new hashMap();

/**
 * Initializes the default client to use.
 * Sensor#initialize
 * @memberof sensor
 * @function initialize
 * @param id sensor identifier
 */
Sensor.initialize = function initialize(id) {
  _.isNil(id) ? this.error(messages[1]) : this.id = id;
  this.initialized = true;
};

/**
 * Check if Sensor is initialized.
 * @memberof sensor
 * @function isInitialized
 * @returns {boolean}
 */
Sensor.isInitialized = function isInitialized() {
  return this.initialized;
};

/**
 * Get the Sensor identifier.
 * @memberof sensor
 * @function getId
 * @returns {*}
 */
Sensor.getId = function getId() {
  return this.id;
};

/**
 * Register client.
 * @memberof sensor
 * @function registerClient
 * @param client
 */
Sensor.registerClient = function registerClient(client) {
  clients.set(client.id, client);
};

/**
 * Unregister client.
 * @memberof sensor
 * @function unregisterClient
 * @param key
 */
Sensor.unregisterClient = function unregisterClient(key) {
  clients.remove(key);
};

/**
 * Retrieve a client.
 * @memberof sensor
 * @function getClient
 * @param key
 * @returns {*}
 */
Sensor.getClient = function getClient(key) {
  return clients.get(key);
};

/**
 * Retrieve all registered clients.
 * @memberof sensor
 * @function getClient
 * @returns {HashMap}
 */
Sensor.getClients = function getClients() {
  return clients;
};

/**
 * Create and return envelope comprised of events, entities or a mixed data payload of both.
 * @memberof sensor
 * @function createEnvelope
 * @param opts  Envelope properties
 * @returns {*}
 */
Sensor.createEnvelope = function createEnvelope(opts) {
  if (!this.isInitialized()) {
    this.error(messages[0]);
  }
  if (_.isNil(opts.data)) {
    this.error(messages[2]);
  }

  var id = opts.id || this.getId(); // permit override with opts value?
  var sendTime = opts.sendTime || moment.utc().format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
  var dataVersion = opts.dataVersion || config.dataVersion;
  var payload = [];

  if (Array.isArray(opts.data)) {
    payload = opts.data.slice();
  } else {
    payload.push(opts.data);
  }

  return _.assign({}, envelope, {sensor: id, sendTime: sendTime, dataVersion: dataVersion, data: payload});
};

/**
 * Delegate serialization and transmission of the Envelope to all registered Clients.
 * @memberof sensor
 * @function sendEnvelope
 * @param envelope
 */
Sensor.sendEnvelope = function sendEnvelope(envelope) {
  /**
   if (!self.isInitialized()) {
    self.error(messages[0]);
  }
   */

  console.log('SENSOR ENVELOPE OUTSIDE = ' + JSON.stringify(envelope));

  if (clients.count() > 0) {
    clients.forEach(function(client) {

      console.log('SENSOR ENVELOPE INSIDE = ' + JSON.stringify(envelope));

      client.sendEnvelope(envelope);
    });
  } else {
    this.error(message[3])
  }
};

/**
 * Delegate serialization and transmission of the Envelope to a particular Client.
 * @memberof sensor
 * @function sendEnvelope
 * @param client
 * @param envelope
 */
Sensor.sendEnvelopeToClient = function sendEnvelopeToClient(client, envelope) {
  /**
   if (!self.isInitialized()) {
    self.error(messages[0]);
  }
   */
  if (clients.has(client.id)) {
    client.sendEnvelope(envelope);
  } else {
    this.error(messages[4]);
  }
};

/**
 * Error Handler.
 * @memberof sensor
 * @function error
 * @param message
 */
Sensor.error = function error(message) {
  throw new Error(message);
};

/**
 * Error messages.
 * @memberof sensor
 */
var messages = [
  "Caliper Sensor has not been initialized.",
  "Caliper Sensor identifier (id) has not been provided.",
  "Caliper Sensor Envelope data has not been provided.",
  "No Clients have been registered.",
  "Chosen Client has not been registered."
];

/**
 * Add the modules that need to be exported under the Caliper namespace.
 * You only need to require the top-level modules. Browserify will walk the
 * dependency graph and load everything correctly.
 */
Caliper.Actions = {};
Caliper.Config = {};
Caliper.Constants = {};
Caliper.Entities = {};
Caliper.Envelopes = {};
Caliper.Events = {};
Caliper.Requestors = {};
Caliper.Selectors = {};
Caliper.SensorClients = {};
Caliper.Validators = {};

// Actions
Caliper.Actions                           = require('./actions/actions');

// Config
Caliper.Config.Config                     = require('./config/config');
Caliper.Config.HttpOptions                = require('./config/httpOptions');

// Envelope
Caliper.Envelopes.Envelope                 = require('./envelope');

// Entities
Caliper.Entities.Entity                   = require('./entities/entity');
Caliper.Entities.EntityFactory            = require('./entities/entityFactory');
Caliper.Entities.EntityType               = require('./entities/entityType');

// Agents
Caliper.Entities.Agent                    = require('./entities/agent/agent');
Caliper.Entities.Person                   = require('./entities/agent/person');
Caliper.Entities.SoftwareApplication      = require('./entities/agent/softwareApplication');

// Agents (Organizations)
Caliper.Entities.CourseOffering           = require('./entities/agent/courseOffering');
Caliper.Entities.CourseSection            = require('./entities/agent/courseSection');
Caliper.Entities.Group                    = require('./entities/agent/group');
Caliper.Entities.Membership               = require('./entities/agent/membership');
Caliper.Entities.Organization             = require('./entities/agent/organization');
Caliper.Entities.Role                     = require('./entities/agent/role');
Caliper.Entities.Status                   = require('./entities/agent/status');

// Annotations
Caliper.Entities.Annotation               = require('./entities/annotation/annotation');
Caliper.Entities.BookmarkAnnotation       = require('./entities/annotation/bookmarkAnnotation');
Caliper.Entities.HighlightAnnotation      = require('./entities/annotation/highlightAnnotation');
Caliper.Entities.SharedAnnotation         = require('./entities/annotation/sharedAnnotation');
Caliper.Entities.TagAnnotation            = require('./entities/annotation/tagAnnotation');

// Assignment-related
Caliper.Entities.Attempt                  = require('./entities/resource/attempt');
Caliper.Entities.LearningObjective        = require('./entities/resource/learningObjective');

// Resources
Caliper.Entities.Assessment                = require('./entities/resource/assessment');
Caliper.Entities.AssessmentItem            = require('./entities/resource/assessmentItem');
Caliper.Entities.AssignableDigitalResource = require('./entities/resource/assignableDigitalResource');
Caliper.Entities.AudioObject               = require('./entities/resource/audioObject');
Caliper.Entities.Chapter                   = require('./entities/resource/chapter');
Caliper.Entities.DigitalResource           = require('./entities/resource/digitalResource');
Caliper.Entities.DigitalResourceCollection = require('./entities/resource/digitalResourceCollection');
Caliper.Entities.Document                  = require('./entities/resource/document');
Caliper.Entities.Forum                     = require('./entities/resource/forum');
Caliper.Entities.Frame                     = require('./entities/resource/frame');
Caliper.Entities.ImageObject               = require('./entities/resource/imageObject');
Caliper.Entities.MediaObject               = require('./entities/resource/mediaObject');
Caliper.Entities.MediaLocation             = require('./entities/resource/mediaLocation');
Caliper.Entities.Message                   = require('./entities/resource/message');
Caliper.Entities.Page                      = require('./entities/resource/page');
Caliper.Entities.Thread                    = require('./entities/resource/thread');
Caliper.Entities.VideoObject               = require('./entities/resource/videoObject');
Caliper.Entities.WebPage                   = require('./entities/resource/webPage');

// Response
Caliper.Entities.Response                  = require('./entities/response/response');
Caliper.Entities.FillinBlankResponse       = require('./entities/response/fillinBlankResponse');
Caliper.Entities.MultipleChoiceResponse    = require('./entities/response/multipleChoiceResponse');
Caliper.Entities.MultipleResponseResponse  = require('./entities/response/multipleResponseResponse');
Caliper.Entities.SelectTextResponse        = require('./entities/response/selectTextResponse');
Caliper.Entities.TrueFalseResponse         = require('./entities/response/trueFalseResponse');

// Result
Caliper.Entities.Result                    = require('./entities/outcome/result');

// Session
Caliper.Entities.Session                   = require('./entities/session/session');
Caliper.Entities.LtiSession                = require('./entities/session/ltiSession');

// Events
Caliper.Events.Event                       = require('./events/event');
Caliper.Events.EventFactory                = require('./events/eventFactory');
Caliper.Events.EventType                   = require('./events/eventType');
Caliper.Events.AnnotationEvent             = require('./events/annotationEvent');
Caliper.Events.AssessmentEvent             = require('./events/assessmentEvent');
Caliper.Events.AssessmentItemEvent         = require('./events/assessmentItemEvent');
Caliper.Events.AssignableEvent             = require('./events/assignableEvent');
Caliper.Events.ForumEvent                  = require('./events/forumEvent');
Caliper.Events.MediaEvent                  = require('./events/mediaEvent');
Caliper.Events.MessageEvent                = require('./events/messageEvent');
Caliper.Events.NavigationEvent             = require('./events/navigationEvent');
Caliper.Events.OutcomeEvent                = require('./events/outcomeEvent');
Caliper.Events.SessionEvent                = require('./events/sessionEvent');
Caliper.Events.ThreadEvent                 = require('./events/threadEvent');
Caliper.Events.ToolUseEvent                = require('./events/toolUseEvent');
Caliper.Events.ViewEvent                   = require('./events/viewEvent');

// Requestors
Caliper.Requestors.HttpRequestor           = require('./requestors/httpRequestor');
Caliper.Requestors.RequestorUtils          = require('./requestors/requestorUtils');

// Selectors
Caliper.Selectors.TextPositionSelector     = require('./selectors/textPositionSelector');

// Sensor clients
Caliper.SensorClients.Client               = require('./sensorclients/client');

// Validators
Caliper.Validators.Validator               = require('./validators/validator');
Caliper.Validators.EntityValidator         = require('./validators/entityValidator');
Caliper.Validators.EventValidator          = require('./validators/eventValidator');

// Replace/Create the global namespace and objects (the sensor) we want there
Caliper.Sensor = Sensor;

// Replace/create Caliper in global namespace
if (typeof window !== 'undefined') {
  window.Caliper = Caliper;
  logger.log('debug', "Added Sensor to window global %o", window.Sensor);
} else {
  module.exports = Caliper
}