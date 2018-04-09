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

var config = require('../config/config');

var eventType = {
  annotation: {
    context: config.jsonldContext.v1p1,
    term: "AnnotationEvent",
    iri: "http://purl.imsglobal.org/caliper/AnnotationEvent"
  },
  assessment: {
    context: config.jsonldContext.v1p1,
    term: "AssessmentEvent",
    iri: "http://purl.imsglobal.org/caliper/AssessmentEvent"
  },
  assessmentItem: {
    context: config.jsonldContext.v1p1,
    term: "AssessmentItemEvent",
    iri: "http://purl.imsglobal.org/caliper/AssessmentItemEvent"
  },
  assignable: {
    context: config.jsonldContext.v1p1,
    term: "AssignableEvent",
    iri: "http://purl.imsglobal.org/caliper/AssignableEvent"
  },
  event: {
    context: config.jsonldContext.v1p1,
    term: "Event",
    iri: "http://purl.imsglobal.org/caliper/Event"
  },
  forum: {
    context: config.jsonldContext.v1p1,
    term: "ForumEvent",
    iri: "http://purl.imsglobal.org/caliper/ForumEvent"
  },
  grade: {
    context: config.jsonldContext.v1p1,
    term: "GradeEvent",
    iri: "http://purl.imsglobal.org/caliper/GradeEvent"
  },
  media: {
    context: config.jsonldContext.v1p1,
    term: "MediaEvent",
    iri: "http://purl.imsglobal.org/caliper/MediaEvent"
  },
  message: {
    context: config.jsonldContext.v1p1,
    term: "MessageEvent",
    iri: "http://purl.imsglobal.org/caliper/MessageEvent"
  },
  navigation: {
    context: config.jsonldContext.v1p1,
    term: "NavigationEvent",
    iri: "http://purl.imsglobal.org/caliper/NavigationEvent"
  },
  session: {
    context: config.jsonldContext.v1p1,
    term: "SessionEvent",
    iri: "http://purl.imsglobal.org/caliper/SessionEvent"
  },
  thread: {
    context: config.jsonldContext.v1p1,
    term: "ThreadEvent",
    iri: "http://purl.imsglobal.org/caliper/ThreadEvent"
  },
  toolLaunch: {
    context: config.jsonldContext.v1p1_toollaunch,
    term: "ToolLaunchEvent",
    iri: "http://purl.imsglobal.org/caliper/ToolLaunchEvent"
  },
  toolUse: {
    context: config.jsonldContext.v1p1,
    term: "ToolUseEvent",
    iri: "http://purl.imsglobal.org/caliper/ToolUseEvent"
  },
  view: {
    context: config.jsonldContext.v1p1,
    term: "ViewEvent",
    iri: "http://purl.imsglobal.org/caliper/ViewEvent"
  }
};

module.exports = eventType;