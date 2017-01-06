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

var entityType = {
  agent: {term: "Agent", iri: "http://purl.imsglobal.org/caliper/Agent"},
  annotation: {term: "Annotation", iri: "http://purl.imsglobal.org/caliper/Annotation"},
  assessment: {term: "Assessment", iri: "http://purl.imsglobal.org/caliper/Assessment"},
  assessmentItem: {term: "AssessmentItem", iri: "http://purl.imsglobal.org/caliper/AssessmentItem"},
  assignableDigitalResource: {term: "AssignableDigitalResource", iri: "http://purl.imsglobal.org/caliper/AssignableDigitalResource"},
  attempt: {term: "Attempt", iri: "http://purl.imsglobal.org/caliper/Attempt"},
  audioObject: {term: "AudioObject", iri: "http://purl.imsglobal.org/caliper/AudioObject"},
  bookmarkAnnotation: {term: "BookmarkAnnotation", iri: "http://purl.imsglobal.org/caliper/BookmarkAnnotation"},
  chapter: {term: "Chapter", iri: "http://purl.imsglobal.org/caliper/Chapter"},
  courseOffering: {term: "CourseOffering", iri: "http://purl.imsglobal.org/caliper/CourseOffering"},
  courseSection: {term: "CourseSection", iri: "http://purl.imsglobal.org/caliper/CourseSection"},
  digitalResource: {term: "DigitalResource", iri: "http://purl.imsglobal.org/caliper/DigitalResource"},
  digitalResourceCollection: {term: "DigitalResourceCollection", iri: "http://purl.imsglobal.org/caliper/DigitalResourceCollection"},
  document: {term: "Document", iri: "http://purl.imsglobal.org/caliper/Document"},
  entity: {term: "Entity", iri: "http://purl.imsglobal.org/caliper/Entity"},
  fillinBlankResponse: {term: "FillinBlankResponse", iri: "http://purl.imsglobal.org/caliper/FillinBlankResponse"},
  forum: {term: "Forum", iri: "http://purl.imsglobal.org/caliper/Forum"},
  frame: {term: "Frame", iri: "http://purl.imsglobal.org/caliper/Frame"},
  group: {term: "Group", iri: "http://purl.imsglobal.org/caliper/Group"},
  highlightAnnotation: {term: "HighlightAnnotation", iri: "http://purl.imsglobal.org/caliper/HighlightAnnotation"},
  imageObject: {term: "ImageObject", iri: "http://purl.imsglobal.org/caliper/ImageObject"},
  learningObjective: {term: "LearningObjective", iri: "http://purl.imsglobal.org/caliper/LearningObjective"},
  ltiSession: {term: "LtiSession", iri: "http://purl.imsglobal.org/caliper/LtiSession"},
  mediaLocation: {term: "MediaLocation", iri: "http://purl.imsglobal.org/caliper/MediaLocation"},
  mediaObject: {term: "MediaObject", iri: "http://purl.imsglobal.org/caliper/MediaObject"},
  membership: {term: "Membership", iri: "http://purl.imsglobal.org/caliper/Membership"},
  message: {term: "Message", iri: "http://purl.imsglobal.org/caliper/Message"},
  multipleChoiceResponse: {term: "MultipleChoiceResponse", iri: "http://purl.imsglobal.org/caliper/MultipleChoiceResponse"},
  multipleResponseResponse: {term: "MultipleResponseResponse", iri: "http://purl.imsglobal.org/caliper/MultipleResponseResponse"},
  organization: {term: "Organization", iri: "http://purl.imsglobal.org/caliper/Organization"},
  page: {term: "Page", iri: "http://purl.imsglobal.org/caliper/Page"},
  person: {term: "Person", iri: "http://purl.imsglobal.org/caliper/Person"},
  response: {term: "Response", iri: "http://purl.imsglobal.org/caliper/Response"},
  result: {term: "Result", iri: "http://purl.imsglobal.org/caliper/Result"},
  selectTextResponse: {term: "SelectTextResponse", iri: "http://purl.imsglobal.org/caliper/SelectTextResponse"},
  session: {term: "Session", iri: "http://purl.imsglobal.org/caliper/Session"},
  sharedAnnotation: {term: "SharedAnnotation", iri: "http://purl.imsglobal.org/caliper/SharedAnnotation"},
  softwareApplication: {term: "SoftwareApplication", iri: "http://purl.imsglobal.org/caliper/SoftwareApplication"},
  tagAnnotation: {term: "TagAnnotation", iri: "http://purl.imsglobal.org/caliper/TagAnnotation"},
  thread: {term: "Thread", iri: "http://purl.imsglobal.org/caliper/Thread"},
  trueFalseResponse: {term: "TrueFalseResponse", iri: "http://purl.imsglobal.org/caliper/TrueFalseResponse"},
  videoObject: {term: "VideoObject", iri: "http://purl.imsglobal.org/caliper/VideoObject"},
  webPage: {term: "WebPage", iri: "http://purl.imsglobal.org/caliper/WebPage"}
};

module.exports = entityType;