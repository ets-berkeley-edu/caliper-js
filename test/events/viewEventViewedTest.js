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
var SoftwareApplication = require('../../src/entities/agent/SoftwareApplication');
var Status = require('../../src/entities/lis/status');

var jsonCompare = require('../testUtils');

test('Create a ViewEvent (viewed) and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";

  // The Actor for the Caliper Event (as well as the edApp)
  var actorId = BASE_IRI.concat("/users/554433");
  var actor = entityFactory().create(Person, actorId);

  // The Action for the Caliper Event
  var action = ViewActions.VIEWED;

  // The Object being interacted with by the Actor
  var objId = BASE_IRI.concat("/etexts/201.epub");
  var obj = entityFactory().create(Document, objId, {
    name: "IMS Caliper Implementation Guide",
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
    datePublished: moment.utc("2016-10-01T06:00:00.000Z"),
    version: "1.1"
  });

  // Event time
  var eventTime = moment.utc("2016-11-15T10:15:00.000Z");

  // The edApp
  var edApp = entityFactory().create(SoftwareApplication, BASE_IRI);

  // Group
  var groupId = BASE_IRI.concat("/terms/201601/courses/7/sections/1");
  var group = entityFactory().create(CourseSection, groupId, {
    courseNumber: "CPS 435-01",
    academicSession: "Fall 2016"
  });

  // The Actor's Membership
  var membershipId = groupId.concat("/rosters/1");
  var membership = entityFactory().create(Membership, membershipId, {
    member: actor,
    organization: {
      "@id": group["@id"],
      "@type": group["@type"]
    },
    roles: [Role.LEARNER],
    status: Status.ACTIVE,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
  });

  // Session
  var sessionId = BASE_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259");
  var session = entityFactory().create(Session, sessionId, {
    startedAtTime: moment.utc("2016-11-15T10:00:00.000Z") });

  // Assert that key attributes are the same
  var event = eventFactory().create(ViewEvent, {
    actor: actor,
    action: action,
    object: obj,
    eventTime: eventTime,
    edApp: edApp,
    group: group,
    membership: membership,
    session: session
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventViewViewed', event, t);
});