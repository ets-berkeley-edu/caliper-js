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

var eventType = {
  annotation: {term: "AnnotationEvent", iri: "http://purl.imsglobal.org/caliper/AnnotationEvent"},
  assessment: {term: "AssessmentEvent", iri: "http://purl.imsglobal.org/caliper/AssessmentEvent"},
  assessmentItem: {term: "AssessmentItemEvent", iri: "http://purl.imsglobal.org/caliper/AssessmentItemEvent"},
  assignable: {term: "AssignableEvent", iri: "http://purl.imsglobal.org/caliper/AssignableEvent"},
  event: {term: "Event", iri: "http://purl.imsglobal.org/caliper/Event"},
  forum: {term: "ForumEvent", iri: "http://purl.imsglobal.org/caliper/ForumEvent"},
  media: {term: "MediaEvent", iri: "http://purl.imsglobal.org/caliper/MediaEvent"},
  message: {term: "MessageEvent", iri: "http://purl.imsglobal.org/caliper/MessageEvent"},
  navigation: {term: "NavigationEvent", iri: "http://purl.imsglobal.org/caliper/NavigationEvent"},
  outcome: {term: "OutcomeEvent", iri: "http://purl.imsglobal.org/caliper/OutcomeEvent"},
  reading: {term: "ReadingEvent", iri: "http://purl.imsglobal.org/caliper/ReadingEvent"},
  session: {term: "SessionEvent", iri: "http://purl.imsglobal.org/caliper/SessionEvent"},
  thread: {term: "ThreadEvent", iri: "http://purl.imsglobal.org/caliper/ThreadEvent"},
  toolUse: {term: "ToolUseEvent", iri: "http://purl.imsglobal.org/caliper/ToolUseEvent"},
  view: {term: "ViewEvent", iri: "http://purl.imsglobal.org/caliper/ViewEvent"}
};

module.exports = eventType;