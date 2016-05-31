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
  create: function(type, props) {
    switch(type) {
      case EventType.ANNOTATION:
        return new AnnotationEvent(props);
      case EventType.ASSESSMENT:
        return new AssessmentEvent(props);
      case EventType.ASSESSMENT_ITEM:
        return new AssessmentItemEvent(props);
      case EventType.ASSIGNABLE:
        return new AssignableEvent(props);
      case EventType.MEDIA:
        return new MediaEvent(props);
      case EventType.NAVIGATION:
        return new NavigationEvent(props);
      case EventType.OUTCOME:
        return new OutcomeEvent(props);
      case EventType.READING:
        return new ReadingEvent(props);
      case EventType.SESSION:
        return new SessionEvent(props);
      case EventType.VIEWED:
        return new ViewEvent(props);
      default:
        return new Event(props);
    }
  }
};

module.exports = EventFactory;