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

var entityType = {
  agent: {
    context: config.jsonldContext.v1p1,
    term: "Agent",
    iri: "http://purl.imsglobal.org/caliper/Agent"
  },
  annotation: {
    context: config.jsonldContext.v1p1,
    term: "Annotation",
    iri: "http://purl.imsglobal.org/caliper/Annotation"
  },
  assessment: {
    context: config.jsonldContext.v1p1,
    term: "Assessment",
    iri: "http://purl.imsglobal.org/caliper/Assessment"
  },
  assessmentItem: {
    context: config.jsonldContext.v1p1,
    term: "AssessmentItem",
    iri: "http://purl.imsglobal.org/caliper/AssessmentItem"
  },
  assignableDigitalResource: {
    context: config.jsonldContext.v1p1,
    term: "AssignableDigitalResource",
    iri: "http://purl.imsglobal.org/caliper/AssignableDigitalResource"
  },
  attempt: {
    context: config.jsonldContext.v1p1,
    term: "Attempt",
    iri: "http://purl.imsglobal.org/caliper/Attempt"
  },
  audioObject: {
    context: config.jsonldContext.v1p1,
    term: "AudioObject",
    iri: "http://purl.imsglobal.org/caliper/AudioObject"
  },
  bookmarkAnnotation: {
    context: config.jsonldContext.v1p1,
    term: "BookmarkAnnotation",
    iri: "http://purl.imsglobal.org/caliper/BookmarkAnnotation"
  },
  chapter: {
    context: config.jsonldContext.v1p1,
    term: "Chapter",
    iri: "http://purl.imsglobal.org/caliper/Chapter"
  },
  courseOffering: {
    context: config.jsonldContext.v1p1,
    term: "CourseOffering",
    iri: "http://purl.imsglobal.org/caliper/CourseOffering"
  },
  courseSection: {
    context: config.jsonldContext.v1p1,
    term: "CourseSection",
    iri: "http://purl.imsglobal.org/caliper/CourseSection"
  },
  digitalResource: {
    context: config.jsonldContext.v1p1,
    term: "DigitalResource",
    iri: "http://purl.imsglobal.org/caliper/DigitalResource"
  },
  digitalResourceCollection: {
    context: config.jsonldContext.v1p1,
    term: "DigitalResourceCollection",
    iri: "http://purl.imsglobal.org/caliper/DigitalResourceCollection"
  },
  document: {
    context: config.jsonldContext.v1p1,
    term: "Document",
    iri: "http://purl.imsglobal.org/caliper/Document"
  },
  entity: {
    context: config.jsonldContext.v1p1,
    term: "Entity",
    iri: "http://purl.imsglobal.org/caliper/Entity"
  },
  fillinBlankResponse: {
    context: config.jsonldContext.v1p1,
    term: "FillinBlankResponse",
    iri: "http://purl.imsglobal.org/caliper/FillinBlankResponse"
  },
  forum: {
    context: config.jsonldContext.v1p1,
    term: "Forum",
    iri: "http://purl.imsglobal.org/caliper/Forum"
  },
  frame: {
    context: config.jsonldContext.v1p1,
    term: "Frame",
    iri: "http://purl.imsglobal.org/caliper/Frame"
  },
  group: {
    context: config.jsonldContext.v1p1,
    term: "Group",
    iri: "http://purl.imsglobal.org/caliper/Group"
  },
  highlightAnnotation: {
    context: config.jsonldContext.v1p1,
    term: "HighlightAnnotation",
    iri: "http://purl.imsglobal.org/caliper/HighlightAnnotation"
  },
  imageObject: {
    context: config.jsonldContext.v1p1,
    term: "ImageObject",
    iri: "http://purl.imsglobal.org/caliper/ImageObject"
  },
  learningObjective: {
    context: config.jsonldContext.v1p1,
    term: "LearningObjective",
    iri: "http://purl.imsglobal.org/caliper/LearningObjective"
  },
  ltiSession: {
    context: config.jsonldContext.v1p1,
    term: "LtiSession",
    iri: "http://purl.imsglobal.org/caliper/LtiSession"
  },
  mediaLocation: {
    context: config.jsonldContext.v1p1,
    term: "MediaLocation",
    iri: "http://purl.imsglobal.org/caliper/MediaLocation"
  },
  mediaObject: {
    context: config.jsonldContext.v1p1,
    term: "MediaObject",
    iri: "http://purl.imsglobal.org/caliper/MediaObject"
  },
  membership: {
    context: config.jsonldContext.v1p1,
    term: "Membership",
    iri: "http://purl.imsglobal.org/caliper/Membership"
  },
  message: {
    context: config.jsonldContext.v1p1,
    term: "Message",
    iri: "http://purl.imsglobal.org/caliper/Message"
  },
  multipleChoiceResponse: {
    context: config.jsonldContext.v1p1,
    term: "MultipleChoiceResponse",
    iri: "http://purl.imsglobal.org/caliper/MultipleChoiceResponse"
  },
  multipleResponseResponse: {
    context: config.jsonldContext.v1p1,
    term: "MultipleResponseResponse",
    iri: "http://purl.imsglobal.org/caliper/MultipleResponseResponse"
  },
  organization: {
    context: config.jsonldContext.v1p1,
    term: "Organization",
    iri: "http://purl.imsglobal.org/caliper/Organization"
  },
  page: {
    context: config.jsonldContext.v1p1,
    term: "Page",
    iri: "http://purl.imsglobal.org/caliper/Page"
  },
  person: {
    context: config.jsonldContext.v1p1,
    term: "Person",
    iri: "http://purl.imsglobal.org/caliper/Person"
  },
  response: {
    context: config.jsonldContext.v1p1,
    term: "Response",
    iri: "http://purl.imsglobal.org/caliper/Response"
  },
  result: {
    context: config.jsonldContext.v1p1,
    term: "Result",
    iri: "http://purl.imsglobal.org/caliper/Result"
  },
  score: {
    context: config.jsonldContext.v1p1,
    term: "Score",
    iri: "http://purl.imsglobal.org/caliper/Score"
  },
  selectTextResponse: {
    context: config.jsonldContext.v1p1,
    term: "SelectTextResponse",
    iri: "http://purl.imsglobal.org/caliper/SelectTextResponse"
  },
  session: {
    context: config.jsonldContext.v1p1,
    term: "Session",
    iri: "http://purl.imsglobal.org/caliper/Session"
  },
  sharedAnnotation: {
    context: config.jsonldContext.v1p1,
    term: "SharedAnnotation",
    iri: "http://purl.imsglobal.org/caliper/SharedAnnotation"
  },
  softwareApplication: {
    context: config.jsonldContext.v1p1,
    term: "SoftwareApplication",
    iri: "http://purl.imsglobal.org/caliper/SoftwareApplication"
  },
  tagAnnotation: {
    context: config.jsonldContext.v1p1,
    term: "TagAnnotation",
    iri: "http://purl.imsglobal.org/caliper/TagAnnotation"
  },
  thread: {
    context: config.jsonldContext.v1p1,
    term: "Thread",
    iri: "http://purl.imsglobal.org/caliper/Thread"
  },
  trueFalseResponse: {
    context: config.jsonldContext.v1p1,
    term: "TrueFalseResponse",
    iri: "http://purl.imsglobal.org/caliper/TrueFalseResponse"},
  videoObject: {
    context: config.jsonldContext.v1p1,
    term: "VideoObject",
    iri: "http://purl.imsglobal.org/caliper/VideoObject"},
  webPage: {
    context: config.jsonldContext.v1p1,
    term: "WebPage",
    iri: "http://purl.imsglobal.org/caliper/WebPage"}
};

module.exports = entityType;