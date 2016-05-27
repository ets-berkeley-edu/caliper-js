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
  event: null,
  create: function(type) {
    switch(type) {
      case EventType.ANNOTATION:
        this.event = new AnnotationEvent();
        break;
      case EventType.ASSESSMENT:
        this.event = new AssessmentEvent();
        break;
      case EventType.ASSESSMENT_ITEM:
        this.event = new AssessmentItemEvent();
        break;
      case EventType.ASSIGNABLE:
        this.event = new AssignableEvent();
        break;
      case EventType.MEDIA:
        this.event = new MediaEvent();
        break;
      case EventType.NAVIGATION:
        this.event = new NavigationEvent();
        break;
      case EventType.OUTCOME:
        this.event = new OutcomeEvent();
        break;
      case EventType.READING:
        this.event = new ReadingEvent();
        break;
      case EventType.SESSION:
        this.event = new SessionEvent();
        break;
      case EventType.VIEWED:
        this.event = new ViewEvent();
        break;
      default:
        this.event = new Event();
    }
    return this.event;
  }
};

module.exports = EventFactory;