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

// Event
var config = require('../../src/config');
var eventFactory = require('../../src/events/eventFactory');
var eventValidator = require('../../src/events/eventValidator');
var eventUtils = require('../../src/events/eventUtils');
var AssessmentItemEvent = require('../../src/events/assessmentItemEvent');
var actions = require('../../src/actions/actions');

// Entity
var entityFactory = require('../../src/entities/entityFactory');
var Assessment = require('../../src/entities/resource/assessment');
var AssessmentItem = require('../../src/entities/resource/assessmentItem');
var Attempt = require('../../src/entities/assign/attempt');
var CourseSection = require('../../src/entities/lis/courseSection');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/lis/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Status = require('../../src/entities/lis/status');
var requestUtils = require('../../src/request/requestUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEventAssessmentItemStarted.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('Create an AssessmentItemEvent (started) and validate properties', function (t) {

    // Plan for N assertions
    t.plan(2);

    const BASE_IRI = "https://example.edu";
    const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";
    const BASE_ASSESS_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1";
    const BASE_ITEM_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3";

    // Id
    var uuid = eventUtils.generateUUID(config.version);

    // Check Id
    t.equal(true, eventValidator.isUUID(uuid), "Validate generated UUID.");

    // Override ID with canned value
    uuid = "1b557176-ba67-4624-b060-6bee670a3d8e";

    // Actor
    var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));

    // Action
    var action = actions.started.term;

    // Parent assessment
    var parent = entityFactory().create(Assessment, BASE_ASSESS_IRI);
    var parentAttempt = entityFactory().create(Attempt, BASE_ASSESS_IRI.concat("/users/554433/attempts/1"));

    // Object of the interaction
    var obj = entityFactory().create(AssessmentItem, BASE_ASSESS_IRI.concat("/items/3"), {
      name: "Assessment Item 3",
      isPartOf: parent,
      dateToStartOn: moment.utc("2016-11-14T05:00:00.000Z"),
      dateToSubmit: moment.utc("2016-11-18T11:59:59.000Z"),
      maxAttempts: 2,
      maxSubmits: 2,
      maxScore: 1,
      isTimeDependent: false,
      version: "1.0"
    });

    // Event time
    var eventTime = moment.utc("2016-11-15T10:15:00.000Z");

    // Generated Attempt
    var generated = entityFactory().create(Attempt, BASE_ITEM_IRI.concat("/users/554433/attempts/1"), {
      actor: actor,
      assignable: _.omit(obj, [ "name", "isPartOf", "dateToStartOn", "dateToSubmit", "maxAttempts",
        "maxSubmits", "maxScore", "isTimeDependent", "version" ]),
      isPartOf: parentAttempt,
      dateCreated: moment.utc("2016-11-15T10:15:00.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:15:00.000Z"),
      count: 1
    });

    // The edApp
    var edApp = entityFactory().create(SoftwareApplication, BASE_IRI, { version: "v2" });

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

    // Assert that key attributes are the same
    var event = eventFactory().create(AssessmentItemEvent, {
      uuid: uuid,
      actor: actor,
      action: action,
      object: obj,
      eventTime: eventTime,
      generated: generated,
      edApp: edApp,
      group: group,
      membership: membership,
      session: session
    });

    // Compare
    var diff = testUtils.compare(fixture, requestUtils.parse(event));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});