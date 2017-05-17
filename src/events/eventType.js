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

var config = ('../config');

var eventType = {
  annotation: {
    context: config.jsonldExternalCaliperContext,
    term: "AnnotationEvent",
    iri: "http://purl.imsglobal.org/caliper/AnnotationEvent"
  },
  assessment: {
    context: config.jsonldExternalCaliperContext,
    term: "AssessmentEvent",
    iri: "http://purl.imsglobal.org/caliper/AssessmentEvent"
  },
  assessmentItem: {
    context: config.jsonldExternalCaliperContext,
    term: "AssessmentItemEvent",
    iri: "http://purl.imsglobal.org/caliper/AssessmentItemEvent"
  },
  assignable: {
    context: config.jsonldExternalCaliperContext,
    term: "AssignableEvent",
    iri: "http://purl.imsglobal.org/caliper/AssignableEvent"
  },
  event: {
    context: config.jsonldExternalCaliperContext,
    term: "Event",
    iri: "http://purl.imsglobal.org/caliper/Event"
  },
  forum: {
    context: config.jsonldExternalCaliperContext,
    term: "ForumEvent",
    iri: "http://purl.imsglobal.org/caliper/ForumEvent"
  },
  media: {
    context: config.jsonldExternalCaliperContext,
    term: "MediaEvent",
    iri: "http://purl.imsglobal.org/caliper/MediaEvent"
  },
  message: {
    context: config.jsonldExternalCaliperContext,
    term: "MessageEvent",
    iri: "http://purl.imsglobal.org/caliper/MessageEvent"
  },
  navigation: {
    context: config.jsonldExternalCaliperContext,
    term: "NavigationEvent",
    iri: "http://purl.imsglobal.org/caliper/NavigationEvent"
  },
  outcome: {
    context: config.jsonldExternalCaliperContext,
    term: "OutcomeEvent",
    iri: "http://purl.imsglobal.org/caliper/OutcomeEvent"
  },
  reading: {
    context: config.jsonldExternalCaliperContext,
    term: "ReadingEvent",
    iri: "http://purl.imsglobal.org/caliper/ReadingEvent"
  },
  session: {
    context: config.jsonldExternalCaliperContext,
    term: "SessionEvent",
    iri: "http://purl.imsglobal.org/caliper/SessionEvent"
  },
  thread: {
    context: config.jsonldExternalCaliperContext,
    term: "ThreadEvent",
    iri: "http://purl.imsglobal.org/caliper/ThreadEvent"
  },
  toolUse: {
    context: config.jsonldExternalCaliperContext,
    term: "ToolUseEvent",
    iri: "http://purl.imsglobal.org/caliper/ToolUseEvent"
  },
  view: {
    context: config.jsonldExternalCaliperContext,
    term: "ViewEvent",
    iri: "http://purl.imsglobal.org/caliper/ViewEvent"
  }
};

module.exports = eventType;