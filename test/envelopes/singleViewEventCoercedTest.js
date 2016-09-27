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
var ViewEvent = require('../../src/events/viewEvent');
var ViewActions = require('../../src/actions/viewActions');

var entityFactory = require('../../src/entities/entityFactory');
var CourseSection = require('../../src/entities/lis/courseSection');
var Document = require('../../src/entities/resource/document');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/lis/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Status = require('../../src/entities/lis/status');

var jsonCompare = require('../testUtils');
var requestor = require('../../src/request/httpRequestor');

test('Create an Envelope containing single ViewEvent (viewed), coerce actor, object, edApp and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";
  const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

  // Override default context
  var context = [];
    context.push("http://purl.imsglobal.org/ctx/caliper/v1/Context");
    context.push({
      "actor": {
        "@id": "http://purl.imsglobal.org/caliper/v1/Person",
        "@type": "@id"
      }
    });
    context.push({
      "object": {
        "@id": "http://purl.imsglobal.org/caliper/v1/Document",
        "@type": "@id"
      }
    });
    context.push({
      "edApp": {
        "@id": "http://purl.imsglobal.org/caliper/v1/SoftwareApplication",
        "@type": "@id"
      }
    });

  // The Actor (coerced)
  var actor = BASE_IRI.concat("/users/554433");

  // The Action
  var action = ViewActions.VIEWED;

  // The Object of the interaction (coerced)
  var obj = BASE_IRI.concat("/etexts/201.epub");

  // Event time
  var eventTime = moment.utc("2016-11-15T10:15:00.000Z");

  // The edApp (coerced)
  var edApp = BASE_IRI;

  // Group
  var group = entityFactory().create(CourseSection, BASE_SECTION_IRI, {
    courseNumber: "CPS 435-01",
    academicSession: "Fall 2016"
  });

  // The Actor's Membership
  var membership = entityFactory().create(Membership, BASE_SECTION_IRI.concat("/rosters/1"), {
    member: entityFactory().create(Person, BASE_IRI.concat("/users/554433")),
    organization: _.omit(group, ["courseNumber", "academicSession"]),
    roles: [Role.LEARNER],
    status: Status.ACTIVE,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
  });

  // Session
  var session = entityFactory().create(Session, BASE_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"), {
    startedAtTime: moment.utc("2016-11-15T10:00:00.000Z")
  });

  // Assert that key attributes are the same
  var event = eventFactory().create(ViewEvent, {
    "@context": context,
    actor: actor,
    action: action,
    object: obj,
    eventTime: eventTime,
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
  var envelope = requestor.createEnvelope(sensor, sendTime, event);

  // Assert that JSON produced is the same
  jsonCompare('caliperEnvelopeEventViewViewedCoerced', envelope, t);
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