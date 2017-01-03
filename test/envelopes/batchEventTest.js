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
var moment = require('moment');
var test = require('tape');

var eventFactory = require('../../src/events/eventFactory');
var AnnotationEvent = require('../../src/events/annotationEvent');
var NavigationEvent = require('../../src/events/navigationEvent');
var ViewEvent = require('../../src/events/viewEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var BookmarkAnnotation = require('../../src/entities/annotation/bookmarkAnnotation');
var Chapter = require('../../src/entities/resource/chapter');
var CourseSection = require('../../src/entities/lis/courseSection');
var Document = require('../../src/entities/resource/document');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/lis/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Status = require('../../src/entities/lis/status');
var WebPage = require('../../src/entities/resource/webPage');

var jsonCompare = require('../testUtils');
var requestor = require('../../src/request/httpRequestor');

test('Create an Envelope containing batched Navigation, Annotation, View Events and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";
  const BASE_ETEXT_IRI = "https://example.edu/etexts/201.epub";
  const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

  /*
   * COMMON ENTITIES FOR BATCHED EVENTS
   */

  // Actor
  var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));

  // edApp
  var edApp = entityFactory().create(SoftwareApplication, BASE_IRI);

  // Group
  var group = entityFactory().create(CourseSection, BASE_SECTION_IRI, {
    courseNumber: "CPS 435-01",
    academicSession: "Fall 2016"
  });

  // Membership
  var membership = entityFactory().create(Membership, BASE_SECTION_IRI.concat("/rosters/1"), {
    member: actor,
    organization: _.omit(group, ["courseNumber", "academicSession"]),
    roles: [Role.learner.term],
    status: Status.active.term,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
  });

  // Session
  var session = entityFactory().create(Session, BASE_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"), {
    startedAtTime: moment.utc("2016-11-15T10:00:00.000Z")
  });

  /*
   * NAVIGATION EVENT
   */

  // The Action
  var navAction = actions.navigatedTo.term;

  // The Object of the interaction
  var navObj = entityFactory().create(WebPage, BASE_SECTION_IRI.concat("/pages/2"), {
    name: "Learning Analytics Specifications",
    description: "Overview of Learning Analytics Specifications with particular emphasis on IMS Caliper.",
    dateCreated: moment.utc("2016-08-01T09:00:00.000Z")
  });

  // Event time
  var navEventTime = moment.utc("2016-11-15T10:15:00.000Z");

  // Referring resource
  var referrer = entityFactory().create(WebPage, BASE_SECTION_IRI.concat("/pages/1"));

  // Assert that key attributes are the same
  var navigationEvent = eventFactory().create(NavigationEvent, {
    actor: actor,
    action: navAction,
    object: navObj,
    eventTime: navEventTime,
    referrer: referrer,
    edApp: edApp,
    group: group,
    membership: membership,
    session: session
  });

  /*
   * BOOKMARKED ANNOTATION EVENT
   */

  // The Action
  var bookmarkAction = actions.bookmarked.term;

  // The Object of the interaction
  var bookmarkObj = entityFactory().create(Document, BASE_ETEXT_IRI, {
    name: "IMS Caliper Implementation Guide",
    version: "1.1"
  });

  // Annotated cfi
  var annotated = entityFactory().create(Chapter, BASE_ETEXT_IRI.concat("#epubcfi(/6/4[chap01]!/4[body01]/10[para05]/1:20)"));

  // Event time
  var bookmarkEventTime = moment.utc("2016-11-15T10:20:00.000Z");

  // The generated Annotation
  var generated = entityFactory().create(BookmarkAnnotation, BASE_IRI.concat("/users/554433/etexts/201/bookmarks/1"), {
    actor: actor,
    annotated: annotated,
    bookmarkNotes: "Caliper profiles model discrete learning activities or supporting activities that enable learning.",
    dateCreated: moment.utc("2016-11-15T10:20:00.000Z")
  });

  // The edApp
  var reader = entityFactory().create(SoftwareApplication, BASE_IRI, {
    name: "ePub Reader",
    version: "1.2.3"
  });

  // Assert that key attributes are the same
  var annotationEvent = eventFactory().create(AnnotationEvent, {
    actor: actor,
    action: bookmarkAction,
    object: bookmarkObj,
    eventTime: bookmarkEventTime,
    generated: generated,
    edApp: reader,
    group: group,
    membership: membership,
    session: session
  });

  /*
   * VIEW EVENT
   */

  // The Action
  var viewAction = actions.viewed.term

  // The Object of the interaction
  var viewObj = entityFactory().create(Document, BASE_IRI.concat("/etexts/201.epub"), {
    name: "IMS Caliper Implementation Guide",
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
    datePublished: moment.utc("2016-10-01T06:00:00.000Z"),
    version: "1.1"
  });

  // Event time
  var viewEventTime = moment.utc("2016-11-15T10:21:00.000Z");

  // Assert that key attributes are the same
  var viewEvent = eventFactory().create(ViewEvent, {
    actor: actor,
    action: viewAction,
    object: viewObj,
    eventTime: viewEventTime,
    edApp: edApp,
    group: group,
    membership: membership,
    session: session
  });

  // Initialize faux sensor and default options
  var sensor = createFauxSensor(BASE_IRI.concat("/sensors/1"));
  var options = {};

  // Initialize requestor, create envelope and reset sendTime with fixture value (or test will fail).
  requestor.initialize(options);

  var sendTime = moment.utc("2016-11-15T11:05:01.000Z");
  var data = [];
  data.push(navigationEvent);
  data.push(annotationEvent);
  data.push(viewEvent);
  var envelope = requestor.createEnvelope(sensor, sendTime, data);

  // Assert that JSON produced is the same
  jsonCompare('caliperEnvelopeEventBatch', envelope, t);
});

/**
 * Create a fake sensor object in order to avoid generating a "window is not defined"
 * reference error since we are not running tests in the browser but on the server.
 * @param id
 * @returns {{id: *}}
 */
function createFauxSensor(id) {
  return {id: id};
}