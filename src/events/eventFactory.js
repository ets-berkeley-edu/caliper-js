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

var Event = require('./event');
var EventType = require('./eventType');

var AnnotationEvent = require('./annotationEvent');
var AssessmentEvent = require('./assessmentEvent');
var AssessmentItemEvent = require('./assessmentItemEvent');
var AssignableEvent = require('./assignableEvent');
var MediaEvent = require('./mediaEvent');
var NavigationEvent = require('./navigationEvent');
var OutcomeEvent = require('./outcomeEvent');
var ReadingEvent = require('./readingEvent');
var SessionEvent = require('./sessionEvent');
var ViewEvent = require('./viewEvent');

/**
 * Factory for creating events.
 * @constructor
 */

// Constructor
function EventFactory() {}

EventFactory.prototype = {
  create: function(type, required, optional) {
    switch(type) {
      case EventType.ANNOTATION:
        return new AnnotationEvent();
      case EventType.ASSESSMENT:
        return new AssessmentEvent(required, optional);
      case EventType.ASSESSMENT_ITEM:
        return new AssessmentItemEvent();
      case EventType.ASSIGNABLE:
        return new AssignableEvent();
      case EventType.MEDIA:
        return new MediaEvent();
      case EventType.NAVIGATION:
        return new NavigationEvent();
      case EventType.OUTCOME:
        return new OutcomeEvent();
      case EventType.READING:
        return new ReadingEvent();
      case EventType.SESSION:
        return new SessionEvent();
      case EventType.VIEWED:
        return new ViewEvent();
      default:
        return new Event(required, optional);
    }
  }
};

module.exports = EventFactory;