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
var eventFactory = require('../../src/events/eventFactory');
var validator = require('../../src/validators/validator');
var OutcomeEvent = require('../../src/events/outcomeEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var Assessment = require('../../src/entities/resource/assessment');
var Attempt = require('../../src/entities/resource/attempt');
var CourseSection = require('../../src/entities/agent/courseSection');
var Person = require('../../src/entities/agent/person');
var Result = require('../../src/entities/outcome/result');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var clientUtils = require('../../src/clients/clientUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEventOutcomeEarned.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('outcomeEventEarnedTest', function (t) {

    // Plan for N assertions
    t.plan(2);

    const BASE_IRI = "https://example.edu";
    const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

    // Id
    var uuid = validator.generateUUID(config.uuidVersion);

    // Check Id
    t.equal(true, validator.isUuid(uuid), "Validate generated UUID.");

    // Override ID with canned value
    uuid = "urn:uuid:a50ca17f-5971-47bb-8fca-4e6e6879001d";

    // EdApp / Scorer (coerced)
    var edApp = entityFactory().create(SoftwareApplication, {id: BASE_IRI});
    var scorer = edApp.id.concat("/autograder");

    // The Actor
    var actor = entityFactory().create(Person, {id: BASE_IRI.concat("/users/554433")});

    // The Assignable
    var assignable = entityFactory().create(Assessment, {id: BASE_SECTION_IRI.concat("/assess/1")});

    // The Attempt
    var attempt = entityFactory().create(Attempt, {
      id: BASE_SECTION_IRI.concat("/assess/1/users/554433/attempts/1"),
      assignee: actor.id,
      assignable: assignable.id,
      count: 1,
      dateCreated: moment.utc("2016-11-15T10:05:00.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:05:00.000Z"),
      endedAtTime: moment.utc("2016-11-15T10:55:30.000Z"),
      duration: "PT50M30S"
    });

    // The Action
    var action = actions.earned.term;

    // The Object
    var obj = entityFactory().create(Result, {
      id: BASE_SECTION_IRI.concat("/assess/1/users/554433/attempts/1/results/1"),
      attempt: attempt,
      maxResultScore: 15.0,
      resultScore: 10.0,
      scoredBy: scorer,
      comment: "Consider retaking the assessment.",
      dateCreated: moment.utc("2016-11-15T10:56:00.000Z")
    });

    // Event time
    var eventTime = moment.utc("2016-11-15T10:57:06.000Z");

    // Group context
    var group = entityFactory().create(CourseSection, {
      id: BASE_SECTION_IRI,
      courseNumber: "CPS 435-01",
      academicSession: "Fall 2016"
    });

    // Session
    var session = entityFactory().create(Session, {
      id: BASE_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"),
      startedAtTime: moment.utc("2016-11-15T10:00:00.000Z")
    });

    // Assert that key attributes are the same
    var event = eventFactory().create(OutcomeEvent, {
      id: uuid,
      actor: actor,
      action: action,
      object: obj,
      eventTime: eventTime,
      edApp: edApp,
      group: group,
      session: session
    });

    // Compare
    var diff = testUtils.compare(fixture, clientUtils.parse(event));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + clientUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});


/**

{
  "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
  "id": "urn:uuid:a50ca17f-5971-47bb-8fca-4e6e6879001d",
  "type": "OutcomeEvent",
  "actor": {
  "id": "https://example.edu/users/554433",
    "type": "Person"
},
  "action": "Earned",
  "object": {
  "id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/users/554433/attempts/1/results/1",
    "type": "Result",
    "attempt": {
    "id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/users/554433/attempts/1",
      "type": "Attempt",
      "assignee": "https://example.edu/users/554433",
      "assignable": "https://example.edu/terms/201601/courses/7/sections/1/assess/1",
      "count": 1,
      "dateCreated": "2016-11-15T10:05:00.000Z",
      "startedAtTime": "2016-11-15T10:05:00.000Z",
      "endedAtTime": "2016-11-15T10:55:30.000Z",
      "duration": "PT50M30S"
  },
  "maxResultScore": 15.0,
    "resultScore": 10.0,
    "scoredBy": {
    "id": "https://example.edu/autograder",
      "type": "SoftwareApplication",
      "dateCreated": "2016-11-15T10:55:58.000Z"
  },
  "comment": "Consider retaking the assessment.",
    "dateCreated": "2016-11-15T10:56:00.000Z"
},
  "eventTime": "2016-11-15T10:57:06.000Z",
  "edApp": "https://example.edu",
  "group": {
  "id": "https://example.edu/terms/201601/courses/7/sections/1",
    "type": "CourseSection",
    "courseNumber": "CPS 435-01",
    "academicSession": "Fall 2016"
},
  "session": {
  "id": "https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259",
    "type": "Session",
    "startedAtTime": "2016-11-15T10:00:00.000Z"
}
}

 */