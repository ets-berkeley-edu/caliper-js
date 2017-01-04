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

var config = require('../../src/config');
var eventFactory = require('../../src/events/eventFactory');
var eventValidator = require('../../src/events/eventValidator');
var eventUtils = require('../../src/events/eventUtils');
var AssignableEvent = require('../../src/events/assignableEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var Assessment = require('../../src/entities/resource/assessment');
var CourseSection = require('../../src/entities/lis/courseSection');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/lis/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Status = require('../../src/entities/lis/status');

var testUtils = require('../testUtils');

test('Create an AssignableEvent (activated) and validate properties', function (t) {

  // Plan for N assertions
  t.plan(2);

  const BASE_IRI = "https://example.edu";
  const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

  // Id
  var uuid = eventUtils.generateUUID(config.version);

  // Check Id
  t.equal(true, eventValidator.isUUID(uuid), "Validate generated UUID.");

  // Override ID with canned value
  uuid = "2635b9dd-0061-4059-ac61-2718ab366f75";

  // The Actor
  var actor = entityFactory().create(Person, BASE_IRI.concat("/users/112233"));

  // The Action
  var action = actions.activated.term;

  // The Object of the interaction
  var obj = entityFactory().create(Assessment, BASE_SECTION_IRI.concat("/assess/1"), {
    name: "Quiz One",
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2016-09-02T11:30:00.000Z"),
    datePublished: moment.utc("2016-11-12T10:10:00.000Z"),
    dateToActivate: moment.utc("2016-11-12T10:15:00.000Z"),
    dateToStartOn: moment.utc("2016-11-14T05:00:00.000Z"),
    dateToSubmit: moment.utc("2016-11-18T11:59:59.000Z"),
    maxAttempts: 2,
    maxSubmits: 2,
    maxScore: 25,
    version: "1.0"
  });

  // Event time
  var eventTime = moment.utc("2016-11-12T10:15:00.000Z");

  // The edApp
  var edApp = entityFactory().create(SoftwareApplication, BASE_IRI, { version: "v2" });

  // Group
  var group = entityFactory().create(CourseSection, BASE_SECTION_IRI, {
    courseNumber: "CPS 435-01",
    academicSession: "Fall 2016"
  });

  // The Actor's Membership
  var membership = entityFactory().create(Membership, BASE_SECTION_IRI.concat("/rosters/1"), {
    member: actor,
    organization: _.omit(group, ["courseNumber", "academicSession"]),
    roles: [Role.instructor.term],
    status: Status.active.term,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
  });

  // Session
  var session = entityFactory().create(Session, BASE_IRI.concat("/sessions/f095bbd391ea4a5dd639724a40b606e98a631823"), {
    startedAtTime: moment.utc("2016-11-12T10:00:00.000Z")
  });

  // Assert that key attributes are the same
  var event = eventFactory().create(AssignableEvent, {
    uuid: uuid,
    actor: actor,
    action: action,
    object: obj,
    eventTime: eventTime,
    edApp: edApp,
    group: group,
    membership: membership,
    session: session
  });

  // Compare JSON
  var diff = testUtils.jsonCompare('caliperEventAssignableActivated', event);
  t.equal(true, _.isUndefined(diff), "Validate JSON");

  t.end();
});