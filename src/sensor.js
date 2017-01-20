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
 * Caliper Sensor
 * @class
 */
var _ = require('lodash');
var client = require('./client');
var logger = require('./logger');

/**
 * Grab an existing namespace object or create a blank object if it doesn't exist
 * so we can attach non-sensor module exports to it
 * @type {{}|*|Caliper}
 */
var Caliper = (typeof window !== 'undefined') ? window.Caliper || {} : {};

/**
 * Represents Caliper Sensor.
 * @constructor
 */
var Sensor = {};

/**
 * Sensor Identifier.
 * @param id
 */
Sensor.setId = function(id) {
    this.id = id;
};

/**
 * Initializes the default client to use. Uses the socket consumer by default.
 * Sensor#initialize
 * @param id sensor identifier
 * @param options $options passed straight to the client
 */
Sensor.initialize = function(id, options) {
  this.setId(id);
  if (!_.isUndefined(options)) {
      client.initialize(options);
  }
};

/**
 * Describe an entity
 * @param  entity $entity The Caliper Entity we are describing
 * @return boolean whether the describe call succeeded
 */
Sensor.describe = function(entity) {
  client.describe(this, entity);
};

/**
 * Send learning events
 * @param  event $event The Caliper Event
 * @return boolean whether the measure call succeeded
 */
Sensor.send = function(event) {
  client.send(this, event);
};

/**
 * Add the modules that need to be exported under the Caliper namespace.
 * You only need to require the top-level modules. Browserify will walk the
 * dependency graph and load everything correctly.
 */
Caliper.Actions = {};
Caliper.Config = {};
Caliper.Constants = {};
Caliper.Entities = {};
Caliper.Events = {};
Caliper.Request = {};
Caliper.Validator = {};
Caliper.Utils = {};

// Actions
Caliper.Actions.Actions = require('./actions/actions');

// Config
Caliper.Config.Config = require('./config');

// Misc. constants
Caliper.Constants.Constants = require('./constants');

// Entities
Caliper.Entities.Entity          = require('./entities/entity');
Caliper.Entities.EntityFactory   = require('./entities/entityFactory');
Caliper.Entities.EntityType      = require('./entities/entityType');

// Agents
Caliper.Entities.Agent               = require('./entities/agent/agent');
Caliper.Entities.Group               = require('./entities/agent/group');
Caliper.Entities.Organization        = require('./entities/agent/organization');
Caliper.Entities.Person              = require('./entities/agent/person');
Caliper.Entities.SoftwareApplication = require('./entities/agent/softwareApplication');

// Annotations
Caliper.Entities.Annotation           = require('./entities/annotation/annotation');
Caliper.Entities.BookmarkAnnotation   = require('./entities/annotation/bookmarkAnnotation');
Caliper.Entities.HighlightAnnotation  = require('./entities/annotation/highlightAnnotation');
Caliper.Entities.SharedAnnotation     = require('./entities/annotation/sharedAnnotation');
Caliper.Entities.TagAnnotation        = require('./entities/annotation/tagAnnotation');
Caliper.Entities.TextPositionSelector = require('./entities/annotation/textPositionSelector');

// Assignment-related
Caliper.Entities.Attempt           = require('./entities/assign/attempt');
Caliper.Entities.LearningObjective = require('./entities/assign/learningObjective');
Caliper.Entities.Result            = require('./entities/assign/result');

// LIS
Caliper.Entities.CourseOffering = require('./entities/lis/courseOffering');
Caliper.Entities.CourseSection  = require('./entities/lis/courseSection');
Caliper.Entities.Membership     = require('./entities/lis/membership');
Caliper.Entities.Role           = require('./entities/lis/role');
Caliper.Entities.Status         = require('./entities/lis/status');

// Resources
Caliper.Entities.Assessment                = require('./entities/resource/assessment');
Caliper.Entities.AssessmentItem            = require('./entities/resource/assessmentItem');
Caliper.Entities.AssignableDigitalResource = require('./entities/resource/assignableDigitalResource');
Caliper.Entities.AudioObject               = require('./entities/resource/audioObject');
Caliper.Entities.Chapter                   = require('./entities/resource/chapter');
Caliper.Entities.DigitalResource           = require('./entities/resource/digitalResource');
Caliper.Entities.DigitalResourceCollection = require('./entities/resource/digitalResourceCollection');
Caliper.Entities.Document                   = require('./entities/resource/document');
Caliper.Entities.Forum                     = require('./entities/resource/forum');
Caliper.Entities.Frame                     = require('./entities/resource/frame');
Caliper.Entities.ImageObject               = require('./entities/resource/imageObject');
Caliper.Entities.MediaObject               = require('./entities/resource/mediaObject');
Caliper.Entities.MediaLocation             = require('./entities/resource/mediaLocation');
Caliper.Entities.Message                   = require('./entities/resource/message');
Caliper.Entities.Page                   = require('./entities/resource/page');
Caliper.Entities.Thread                    = require('./entities/resource/thread');
Caliper.Entities.VideoObject               = require('./entities/resource/videoObject');
Caliper.Entities.WebPage                   = require('./entities/resource/webPage');

// Response
Caliper.Entities.Response                 = require('./entities/response/response');
Caliper.Entities.FillinBlankResponse      = require('./entities/response/fillinBlankResponse');
Caliper.Entities.MultipleChoiceResponse   = require('./entities/response/multipleChoiceResponse');
Caliper.Entities.MultipleResponseResponse = require('./entities/response/multipleResponseResponse');
Caliper.Entities.SelectTextResponse       = require('./entities/response/selectTextResponse');
Caliper.Entities.TrueFalseResponse        = require('./entities/response/trueFalseResponse');

// Session
Caliper.Entities.Session = require('./entities/session/session');
Caliper.Entities.LtiSession = require('./entities/session/ltiSession');

// Events
Caliper.Events.Event               = require('./events/event');
Caliper.Events.EventFactory        = require('./events/eventFactory');
Caliper.Events.EventType           = require('./events/eventType');
Caliper.Events.AnnotationEvent     = require('./events/annotationEvent');
Caliper.Events.AssessmentEvent     = require('./events/assessmentEvent');
Caliper.Events.AssessmentItemEvent = require('./events/assessmentItemEvent');
Caliper.Events.AssignableEvent     = require('./events/assignableEvent');
Caliper.Events.ForumEvent          = require('./events/forumEvent');
Caliper.Events.MediaEvent          = require('./events/mediaEvent');
Caliper.Events.MessageEvent        = require('./events/messageEvent');
Caliper.Events.NavigationEvent     = require('./events/navigationEvent');
Caliper.Events.OutcomeEvent        = require('./events/outcomeEvent');
Caliper.Events.SessionEvent        = require('./events/sessionEvent');
Caliper.Events.ThreadEvent         = require('./events/threadEvent');
Caliper.Events.ToolUseEvent        = require('./events/toolUseEvent');
Caliper.Events.ViewEvent           = require('./events/viewEvent');

// Request
Caliper.Request.Envelope            = require('./request/envelope');
Caliper.Request.Requestor           = require('./request/requestor');
Caliper.Request.HttpRequestor       = require('./request/httpRequestor');

// Validators
Caliper.Validator.Validator       = require('./validator');
Caliper.Validator.EntityValidator = require('./entities/entityValidator');
Caliper.Validator.EventValidator  = require('./events/eventValidator');

// Replace/Create the global namespace and objects (the sensor) we want there
Caliper.Sensor = Sensor;

// Replace/create Caliper in global namespace
if (typeof window !== 'undefined') {
  window.Caliper = Caliper;
  logger.log('debug', "Added Sensor to window global %o", window.Sensor);
} else {
  module.exports = Caliper
}
