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

var config =  require('../../src/config');
var eventFactory = require('../../src/events/eventFactory');
var AssessmentEvent = require('../../src/events/assessmentEvent');
var OutcomeEvent = require('../../src/events/outcomeEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var Assessment = require('../../src/entities/resource/assessment');
var AssessmentItem = require('../../src/entities/resource/assessmentItem');
var Attempt = require('../../src/entities/assign/attempt');
var CourseOffering = require('../../src/entities/lis/courseOffering');
var CourseSection = require('../../src/entities/lis/courseSection');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var Result = require('../../src/entities/assign/result');
var Role = require('../../src/entities/lis/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Status = require('../../src/entities/lis/status');
var requestorUtils = require('../../src/request/requestorUtils');
var testUtils = require('../testUtils');
var requestor = require('../../src/request/httpRequestor');

const path = config.testFixturesBaseDirectory + "caliperEnvelopeMixedBatch.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('batchEventTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_IRI = "https://example.edu";
    const BASE_COURSE_IRI = "https://example.edu/terms/201601/courses/7";
    const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";
    const BASE_ASSESS_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1";


    /*
     * ENTITY DESCRIBES
     */

    // Actor
    var actor = entityFactory().create(Person, {
      id: BASE_IRI.concat("/users/554433"),
      dateCreated: "2016-08-01T06:00:00.000Z",
      dateModified: "2016-09-02T11:30:00.000Z"
    });

    // Assessment
    var assessmentItems = [];
    assessmentItems.push(entityFactory().create(AssessmentItem, {id: BASE_ASSESS_IRI.concat("/items/1")}));
    assessmentItems.push(entityFactory().create(AssessmentItem, {id: BASE_ASSESS_IRI.concat("/items/2")}));
    assessmentItems.push(entityFactory().create(AssessmentItem, {id: BASE_ASSESS_IRI.concat("/items/3")}));

    var assessment = entityFactory().create(Assessment, {
      id: BASE_ASSESS_IRI.concat("?ver=v1p0"),
      name: "Quiz One",
      items: assessmentItems,
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
      dateModified: moment.utc("2016-09-02T11:30:00.000Z"),
      datePublished: moment.utc("2016-08-15T09:30:00.000Z"),
      dateToActivate: moment.utc("2016-08-16T05:00:00.000Z"),
      dateToShow: moment.utc("2016-08-16T05:00:00.000Z"),
      dateToStartOn: moment.utc("2016-08-16T05:00:00.000Z"),
      dateToSubmit: moment.utc("2016-09-28T11:59:59.000Z"),
      maxAttempts: 2,
      maxSubmits: 2,
      maxScore: 15,
      version: "1.0"
    });

    // CourseSection
    var course = entityFactory().create(CourseOffering, {id: BASE_COURSE_IRI, courseNumber: "CPS 435"});
    var section = entityFactory().create(CourseSection, {
      id: BASE_SECTION_IRI,
      academicSession: "Fall 2016",
      courseNumber: "CPS 435-01",
      name: "CPS 435 Learning Analytics, Section 01",
      category: "seminar",
      subOrganizationOf: course,
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
    });

    // SoftwareApplication
    var app = entityFactory().create(SoftwareApplication, {id: BASE_IRI, version: "v2"});

    /*
     * ASSESSMENT START
     */

    // Override ID with canned value
    var uuid = "urn:uuid:c51570e4-f8ed-4c18-bb3a-dfe51b2cc594";

    // The Action
    var action = actions.started.term;

    // Event time
    var eventTime = moment.utc("2016-11-15T10:15:00.000Z");

    // Generated Attempt
    var attempt = entityFactory().create(Attempt, {
      id: BASE_ASSESS_IRI.concat("/users/554433/attempts/1"),
      assignee: actor.id,
      assignable: assessment.id,
      dateCreated: moment.utc("2016-11-15T10:15:00.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:15:00.000Z"),
      count: 1
    });

    // Membership
    var membership = entityFactory().create(Membership, {
      id: BASE_SECTION_IRI.concat("/rosters/1"),
      member: actor.id,
      organization: section.id,
      roles: [Role.learner.term],
      status: Status.active.term,
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
    });

    // Session
    var session = entityFactory().create(Session, {
      id: BASE_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"),
      startedAtTime: moment.utc("2016-11-15T10:00:00.000Z")
    });

    // Assert that key attributes are the same
    var eventStarted = eventFactory().create(AssessmentEvent, {
      id: uuid,
      actor: actor.id,
      action: action,
      object: assessment.id,
      eventTime: eventTime,
      generated: attempt,
      edApp: app.id,
      group: section.id,
      membership: membership,
      session: session
    });


    /*
     * ASSESSMENT SUBMITTED
     */

    // Override ID with canned value
    uuid = "urn:uuid:dad88464-0c20-4a19-a1ba-ddf2f9c3ff33";

    // The Action
    action = actions.submitted.term;

    // The object of the interaction
    var attempt = entityFactory().create(Attempt, {
      id: BASE_ASSESS_IRI.concat("/users/554433/attempts/1"),
      assignee: actor.id,
      assignable: assessment.id,
      count: 1,
      dateCreated: moment.utc("2016-11-15T10:15:00.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:15:00.000Z"),
      endedAtTime: moment.utc("2016-11-15T10:25:30.000Z"),
      duration: "PT10M30S"
    });

    // Event time
    eventTime = moment.utc("2016-11-15T10:25:30.000Z");

    // Membership
    membership = entityFactory().create(Membership, {
      id: BASE_SECTION_IRI.concat("/rosters/1"),
      member: actor.id,
      organization: section.id,
      roles: [Role.learner.term],
      status: Status.active.term,
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
    });

    // Session
    session = entityFactory().create(Session, {
      id: BASE_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"),
      startedAtTime: moment.utc("2016-11-15T10:00:00.000Z")
    });

    // Assert that key attributes are the same
    var eventSubmitted = eventFactory().create(AssessmentEvent, {
      id: uuid,
      actor: actor.id,
      action: action,
      object: attempt,
      eventTime: eventTime,
      edApp: app.id,
      group: section.id,
      membership: membership,
      session: session
    });


    /*
     * ASSESSMENT GRADED
     */

    // Override ID with canned value
    uuid = "urn:uuid:a50ca17f-5971-47bb-8fca-4e6e6879001d";

    // The Actor (grader)
    var grader = entityFactory().create(SoftwareApplication, {id: BASE_IRI.concat("/autograder"), version: "v2"});

    // The Action
    action = actions.graded.term;

    // The Object of the interaction
    attempt = entityFactory().create(Attempt, {
      id: BASE_SECTION_IRI.concat("/assess/1/users/554433/attempts/1"),
      assignee: actor.id,
      assignable: assessment.id,
      count: 1,
      dateCreated: moment.utc("2016-11-15T10:05:00.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:05:00.000Z"),
      endedAtTime: moment.utc("2016-11-15T10:55:12.000Z"),
      duration: "PT50M12S"
    });

    // Event time
    eventTime = moment.utc("2016-11-15T10:57:06.000Z");

    // Generated result
    var result = entityFactory().create(Result, {
      id: BASE_SECTION_IRI.concat("/assess/1/users/554433/results/1"),
      attempt: attempt.id,
      normalScore: 15,
      totalScore: 15,
      scoredBy: grader.id,
      dateCreated: moment.utc("2016-11-15T10:55:05.000Z")
    });

    // Assert that key attributes are the same
    var eventGraded = eventFactory().create(OutcomeEvent, {
      id: uuid,
      actor: grader,
      action: action,
      object: attempt,
      eventTime: eventTime,
      edApp: app.id,
      generated: result,
      group: section.id
    });

    // Initialize faux sensor and default options
    var sensor = createFauxSensor(BASE_IRI.concat("/sensors/1"));
    var options = {};

    // Initialize requestor, create envelope and reset sendTime with fixture value (or test will fail).
    requestor.initialize(options);

    var data = [];
    data.push(actor);
    data.push(assessment);
    data.push(app);
    data.push(section);
    data.push(eventStarted);
    data.push(eventSubmitted);
    data.push(eventGraded);

    var envelope = requestor.createEnvelope(sensor.id, moment.utc("2016-11-15T11:05:01.000Z"), config.dataVersion, data);

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(envelope));
    var diffMsg = (!_.isUndefined(diff) ? "diff = " + requestorUtils.stringify(diff) : "");
    //var diffMsg = "abc";

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
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

/**
{
  "sensor": "https://example.edu/sensors/1",
  "sendTime": "2016-11-15T11:05:01.000Z",
  "dataVersion":  "http://purl.imsglobal.org/ctx/caliper/v1p1",
  "data": [
  {
    "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
    "id": "https://example.edu/users/554433",
    "type": "Person",
    "dateCreated": "2016-08-01T06:00:00.000Z",
    "dateModified": "2016-09-02T11:30:00.000Z"
  },
  {
    "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
    "id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1?ver=v1p0",
    "type": "Assessment",
    "name": "Quiz One",
    "items": [
      {
        "id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/1",
        "type": "AssessmentItem"
      },
      {
        "id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/2",
        "type": "AssessmentItem"
      },
      {
        "id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3",
        "type": "AssessmentItem"
      }
    ],
    "dateCreated": "2016-08-01T06:00:00.000Z",
    "dateModified": "2016-09-02T11:30:00.000Z",
    "datePublished": "2016-08-15T09:30:00.000Z",
    "dateToActivate": "2016-08-16T05:00:00.000Z",
    "dateToShow": "2016-08-16T05:00:00.000Z",
    "dateToStartOn": "2016-08-16T05:00:00.000Z",
    "dateToSubmit": "2016-09-28T11:59:59.000Z",
    "maxAttempts": 2,
    "maxScore": 15.0,
    "maxSubmits": 2,
    "version": "1.0"
  },
  {
    "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
    "id": "https://example.edu",
    "type": "SoftwareApplication",
    "version": "v2"
  },
  {
    "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
    "id": "https://example.edu/terms/201601/courses/7/sections/1",
    "type": "CourseSection",
    "academicSession": "Fall 2016",
    "courseNumber": "CPS 435-01",
    "name": "CPS 435 Learning Analytics, Section 01",
    "category": "seminar",
    "subOrganizationOf": {
      "id": "https://example.edu/terms/201601/courses/7",
      "type": "CourseOffering",
      "courseNumber": "CPS 435"
    },
    "dateCreated": "2016-08-01T06:00:00.000Z"
  },
  {
    "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
    "id": "urn:uuid:c51570e4-f8ed-4c18-bb3a-dfe51b2cc594",
    "type": "AssessmentEvent",
    "actor": "https://example.edu/users/554433",
    "action": "Started",
    "object": "https://example.edu/terms/201601/courses/7/sections/1/assess/1?ver=v1p0",
    "generated": {
      "id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/users/554433/attempts/1",
      "type": "Attempt",
      "assignee": "https://example.edu/users/554433",
      "assignable": "https://example.edu/terms/201601/courses/7/sections/1/assess/1?ver=v1p0",
      "count": 1,
      "dateCreated": "2016-11-15T10:15:00.000Z",
      "startedAtTime": "2016-11-15T10:15:00.000Z"
    },
    "eventTime": "2016-11-15T10:15:00.000Z",
    "edApp": "https://example.edu",
    "group": "https://example.edu/terms/201601/courses/7/sections/1",
    "membership": {
      "id": "https://example.edu/terms/201601/courses/7/sections/1/rosters/1",
      "type": "Membership",
      "member": "https://example.edu/users/554433",
      "organization": "https://example.edu/terms/201601/courses/7/sections/1",
      "roles": [ "Learner" ],
      "status": "Active",
      "dateCreated": "2016-08-01T06:00:00.000Z"
    },
    "session": {
      "id": "https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259",
      "type": "Session",
      "startedAtTime": "2016-11-15T10:00:00.000Z"
    }
  },
  {
    "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
    "id": "urn:uuid:dad88464-0c20-4a19-a1ba-ddf2f9c3ff33",
    "type": "AssessmentEvent",
    "actor": "https://example.edu/users/554433",
    "action": "Submitted",
    "object": {
      "id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/users/554433/attempts/1",
      "type": "Attempt",
      "assignee": "https://example.edu/users/554433",
      "assignable": "https://example.edu/terms/201601/courses/7/sections/1/assess/1?ver=v1p0",
      "count": 1,
      "dateCreated": "2016-11-15T10:15:00.000Z",
      "startedAtTime": "2016-11-15T10:15:00.000Z",
      "endedAtTime": "2016-11-15T10:25:30.000Z",
      "duration": "PT10M30S"
    },
    "eventTime": "2016-11-15T10:25:30.000Z",
    "edApp": "https://example.edu",
    "group": "https://example.edu/terms/201601/courses/7/sections/1",
    "membership": {
      "id": "https://example.edu/terms/201601/courses/7/sections/1/rosters/1",
      "type": "Membership",
      "member": "https://example.edu/users/554433",
      "organization": "https://example.edu/terms/201601/courses/7/sections/1",
      "roles": [ "Learner" ],
      "status": "Active",
      "dateCreated": "2016-08-01T06:00:00.000Z"
    },
    "session": {
      "id": "https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259",
      "type": "Session",
      "startedAtTime": "2016-11-15T10:00:00.000Z"
    }
  },
  {
    "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
    "id": "urn:uuid:a50ca17f-5971-47bb-8fca-4e6e6879001d",
    "type": "OutcomeEvent",
    "actor": {
      "id": "https://example.edu/autograder",
      "type": "SoftwareApplication",
      "version": "v2"
    },
    "action": "Graded",
    "object": {
      "id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/users/554433/attempts/1",
      "type": "Attempt",
      "assignee": "https://example.edu/users/554433",
      "assignable": "https://example.edu/terms/201601/courses/7/sections/1/assess/1?ver=v1p0",
      "count": 1,
      "dateCreated": "2016-11-15T10:05:00.000Z",
      "startedAtTime": "2016-11-15T10:05:00.000Z",
      "endedAtTime": "2016-11-15T10:55:12.000Z",
      "duration": "PT50M12S"
    },
    "eventTime": "2016-11-15T10:57:06.000Z",
    "edApp": "https://example.edu",
    "generated": {
      "id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/users/554433/results/1",
      "type": "Result",
      "attempt": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/users/554433/attempts/1",
      "normalScore": 15.0,
      "totalScore": 15.0,
      "scoredBy": "https://example.edu/autograder",
      "dateCreated": "2016-11-15T10:55:05.000Z"
    },
    "group": "https://example.edu/terms/201601/courses/7/sections/1"
  }
]
}
 */