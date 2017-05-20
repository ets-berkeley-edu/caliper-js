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

var config = require('../../src/config/config');
var options = require('../../src/clients/options');
var clientUtils = require('../../src/clients/clientUtils');

var eventFactory = require('../../src/events/eventFactory');
var AnnotationEvent = require('../../src/events/annotationEvent');
var NavigationEvent = require('../../src/events/navigationEvent');
var ViewEvent = require('../../src/events/viewEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var BookmarkAnnotation = require('../../src/entities/annotation/bookmarkAnnotation');
var CourseSection = require('../../src/entities/agent/courseSection');
var Document = require('../../src/entities/resource/document');
var Membership = require('../../src/entities/agent/membership');
var Page = require('../../src/entities/resource/page');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/agent/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Status = require('../../src/entities/agent/status');
var WebPage = require('../../src/entities/resource/webPage');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEnvelopeEventBatch.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('batchEventTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_IRI = "https://example.edu";
    const BASE_COM_IRI = "https://example.com";
    const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

    /*
     * COMMON ENTITIES FOR BATCHED EVENTS
     */
    // Actor
    var actor = entityFactory().create(Person, {id: BASE_IRI.concat("/users/554433")});

    // The edApp
    var edApp = entityFactory().create(SoftwareApplication, {
      id: BASE_COM_IRI.concat("/reader"),
      name: "ePub Reader",
      version: "1.2.3"
    });

    // Group
    var group = entityFactory().create(CourseSection, {
      id: BASE_SECTION_IRI,
      courseNumber: "CPS 435-01",
      academicSession: "Fall 2016"
    });

    // Membership
    var membership = entityFactory().create(Membership, {
      id: BASE_SECTION_IRI.concat("/rosters/1"),
      member: actor.id,
      organization: group.id,
      roles: [Role.learner.term],
      status: Status.active.term,
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
    });

    // Session
    var session = entityFactory().create(Session, {
      id: BASE_COM_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"),
      startedAtTime: moment.utc("2016-11-15T10:00:00.000Z")
    });

    /*
     * NAVIGATION EVENT
     */

    var navId = "urn:uuid:72f66ce5-d2ec-44cc-bce5-41602e1015dc";

    // The Action
    var navAction = actions.navigatedTo.term;

    // The Object of the interaction
    var navObj = entityFactory().create(WebPage, {
      id: BASE_SECTION_IRI.concat("/pages/2"),
      name: "Learning Analytics Specifications",
      description: "Overview of Learning Analytics Specifications with particular emphasis on IMS Caliper.",
      dateCreated: moment.utc("2016-08-01T09:00:00.000Z")
    });

    // Event time
    var navEventTime = moment.utc("2016-11-15T10:15:00.000Z");

    // Referring resource
    var referrer = entityFactory().create(WebPage, {id: BASE_SECTION_IRI.concat("/pages/1")});

    // Assert that key attributes are the same
    var navigationEvent = eventFactory().create(NavigationEvent, {
      id: navId,
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

    // Id
    var bookmarkId = "urn:uuid:c0afa013-64df-453f-b0a6-50f3efbe4cc0";

    // The Action
    var bookmarkAction = actions.bookmarked.term;

    // The Object of the interaction
    var bookmarkObj = entityFactory().create(Document, {
      id: BASE_COM_IRI.concat("/#/texts/imscaliperimplguide"),
      name: "IMS Caliper Implementation Guide",
      version: "1.1"
    });

    // Annotated cfi
    var annotated = entityFactory().create(Page, {
      id: BASE_COM_IRI.concat("/#/texts/imscaliperimplguide/cfi/6/10!/4/2/2/2@0:0")
    });

    // Event time
    var bookmarkEventTime = moment.utc("2016-11-15T10:20:00.000Z");

    // The generated Annotation
    var generated = entityFactory().create(BookmarkAnnotation, {
      id: BASE_COM_IRI.concat("/users/554433/texts/imscaliperimplguide/bookmarks/1"),
      annotator: actor.id,
      annotated: annotated.id,
      bookmarkNotes: "Caliper profiles model discrete learning activities or supporting activities that facilitate learning.",
      dateCreated: moment.utc("2016-11-15T10:20:00.000Z")
    });

    // Assert that key attributes are the same
    var annotationEvent = eventFactory().create(AnnotationEvent, {
      id: bookmarkId,
      actor: actor,
      action: bookmarkAction,
      object: bookmarkObj,
      eventTime: bookmarkEventTime,
      generated: generated,
      edApp: edApp,
      group: group,
      membership: membership,
      session: session
    });

    /*
     * VIEW EVENT
     */

    // Id
    var viewId = "urn:uuid:94bad4bd-a7b1-4c3e-ade4-2253efe65172";

    // The Action
    var viewAction = actions.viewed.term

    // The Object of the interaction
    var viewObj = entityFactory().create(Document, {
      id: BASE_IRI.concat("/etexts/201.epub"),
      name: "IMS Caliper Implementation Guide",
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
      datePublished: moment.utc("2016-10-01T06:00:00.000Z"),
      version: "1.1"
    });

    // Event time
    var viewEventTime = moment.utc("2016-11-15T10:21:00.000Z");

    // Assert that key attributes are the same
    var viewEvent = eventFactory().create(ViewEvent, {
      id: viewId,
      actor: actor,
      action: viewAction,
      object: viewObj,
      eventTime: viewEventTime,
      edApp: edApp,
      group: group,
      membership: membership,
      session: session
    });

    // Create data payload
    var data = [];
    data.push(navigationEvent);
    data.push(annotationEvent);
    data.push(viewEvent);

    // Hack an envelope
    var envelope = {
      sensor: "https://example.edu/sensors/1",
      sendTime: moment.utc("2016-11-15T11:05:01.000Z"),
      dataVersion: config.dataVersion,
      data: data
    };

    // Compare
    var diff = testUtils.compare(fixture, clientUtils.parse(envelope));
    var diffMsg = (!_.isUndefined(diff) ? "diff = " + clientUtils.stringify(diff) : "");
    //var diffMsg = "abc";

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});