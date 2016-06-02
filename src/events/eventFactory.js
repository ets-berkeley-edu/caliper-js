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
var eventType = require('./eventType');
var Event = require('./event');
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

/*
Factory function designed to mint new Caliper Event objects.  This is a regular function that does NOT require
use of the "new" keyword in order to instantiate.  As we want no instanceOf link established between the
factory function and the objects it creates the prototype property is not utilized.

To create a Caliper Event, simply select the appropriate eventType constant and provide a properties object to
assign to the Event object, e.g., var event = entityFactory.create(eventType.EVENT, properties);
*/
function eventFactory() {
  var factory = _.create(eventFactory.proto);
  return factory;
}

eventFactory.proto = {
  create: function(type, props) {
    props = props || {};

    switch(type) {
      case eventType.ANNOTATION:
        return new AnnotationEvent(props);
      case eventType.ASSESSMENT:
        return new AssessmentEvent(props);
      case eventType.ASSESSMENT_ITEM:
        return new AssessmentItemEvent(props);
      case eventType.ASSIGNABLE:
        return new AssignableEvent(props);
      case eventType.MEDIA:
        return new MediaEvent(props);
      case eventType.NAVIGATION:
        return new NavigationEvent(props);
      case eventType.OUTCOME:
        return new OutcomeEvent(props);
      case eventType.READING:
        return new ReadingEvent(props);
      case eventType.SESSION:
        return new SessionEvent(props);
      case eventType.VIEWED:
        return new ViewEvent(props);
      default:
        return new Event(props);
    }
  }
};

module.exports = eventFactory;