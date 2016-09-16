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
var AssessmentItemEvent = require('../../src/events/assessmentItemEvent');
var AssessmentItemActions = require('../../src/actions/assessmentItemActions');

var entityFactory = require('../../src/entities/entityFactory');
var Assessment = require('../../src/entities/resource/assessment');
var AssessmentItem = require('../../src/entities/resource/assessmentItem');
var Attempt = require('../../src/entities/assign/attempt');
var CourseSection = require('../../src/entities/lis/courseSection');
var FillinBlankResponse = require('../../src/entities/response/fillinBlankResponse');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/lis/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/SoftwareApplication');
var Status = require('../../src/entities/lis/status');

var jsonCompare = require('../testUtils');

test('Create an AssessmentItemEvent (completed) and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";
  const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";
  const BASE_ASSESS_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1";
  const BASE_ITEM_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3";

  // Actor
  var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));

  // The Action for the Caliper Event
  var action = AssessmentItemActions.COMPLETED;

  // Parent assessment
  var parent = entityFactory().create(Assessment, BASE_ASSESS_IRI);
  var parentAttempt = entityFactory().create(Attempt, BASE_ASSESS_IRI.concat("/users/554433/attempts/1"));

  // Item
  var item = entityFactory().create(AssessmentItem, BASE_ASSESS_IRI.concat("/items/3"), {
    name: "Assessment Item 3",
    isPartOf: parent
  });

  // The Object of the interaction
  var obj = entityFactory().create(Attempt, BASE_ITEM_IRI.concat("/users/554433/attempts/1"), {
    actor: actor,
    assignable: item,
    isPartOf: parentAttempt,
    dateCreated: moment.utc("2016-11-15T10:15:02.000Z"),
    startedAtTime: moment.utc("2016-11-15T10:15:02.000Z"),
    endedAtTime: moment.utc("2016-11-15T10:15:12.000Z"),
    count: 1
  });

  // Event time
  var eventTime = moment.utc("2016-11-15T10:15:12.000Z");

  // The generated response
  var generated = entityFactory().create(FillinBlankResponse, BASE_ITEM_IRI.concat("/users/554433/responses/1"), {
    attempt: _.omit(obj, [ "actor", "assignable", "isPartOf", "dateCreated", "startedAtTime", "endedAtTime", "count" ]),
    values: [ "subject", "object", "predicate" ],
    dateCreated: moment.utc("2016-11-15T10:15:12.000Z"),
    startedAtTime: moment.utc("2016-11-15T10:15:02.000Z"),
    endedAtTime: moment.utc("2016-11-15T10:15:12.000Z")
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
    roles: [Role.LEARNER],
    status: Status.ACTIVE,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
  });

  // Session
  var session = entityFactory().create(Session, BASE_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"), {
    startedAtTime: moment.utc("2016-11-15T10:00:00.000Z")
  });

  // Assert that key attributes are the same
  var event = eventFactory().create(AssessmentItemEvent, {
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

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventAssessmentItemCompleted', event, t);
});

/**
 {
  "@context": "http://purl.imsglobal.org/ctx/caliper/v1/Context",
  "@type": "http://purl.imsglobal.org/caliper/v1/AssessmentItemEvent",
  "actor": {
    "@id": "https://example.edu/users/554433",
    "@type": "http://purl.imsglobal.org/caliper/v1/Person"
  },
  "action": "http://purl.imsglobal.org/vocab/caliper/v1/action#Completed",
  "object": {
    "@id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3/users/554433/attempts/1",
    "@type": "http://purl.imsglobal.org/caliper/v1/Attempt",
    "actor": {
      "@id": "https://example.edu/users/554433",
      "@type": "http://purl.imsglobal.org/caliper/v1/Person"
    },
    "assignable": {
      "@id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3",
      "@type": "http: //purl.imsglobal.org/caliper/v1/AssessmentItem",
      "name": "Assessment Item 3",
      "isPartOf": {
        "@id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1",
        "@type": "http://purl.imsglobal.org/caliper/v1/Assessment"
      }
    },
    "isPartOf": {
      "@id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/users/554433/attempts/1",
      "@type": "http://purl.imsglobal.org/caliper/v1/Attempt"
    },
    "count": 1,
    "dateCreated": "2016-11-15T10:15:02.000Z",
    "startedAtTime": "2016-11-15T10:15:02.000Z",
    "endedAtTime": "2016-11-15T10:15:12.000Z"
  },
  "generated": {
    "@id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3/users/554433/responses/1",
    "@type": "http://purl.imsglobal.org/caliper/v1/FillinBlankResponse",
    "attempt": {
      "@id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3/users/554433/attempts/1",
      "@type": "http://purl.imsglobal.org/caliper/v1/Attempt"
    },
    "dateCreated": "2016-11-15T10:15:12.000Z",
    "startedAtTime": "2016-11-15T10:15:02.000Z",
    "endedAtTime": "2016-11-15T10:15:12.000Z",
    "values": [ "subject", "object", "predicate" ]
  },
  "eventTime": "2016-11-15T10:15:12.000Z",
  "edApp": {
    "@id": "https://example.edu/",
    "@type": "http://purl.imsglobal.org/caliper/v1/SoftwareApplication",
    "version": "v2"
  },
  "group": {
    "@id": "https://example.edu/terms/201601/courses/7/sections/1",
    "@type": "http://purl.imsglobal.org/caliper/v1/CourseSection",
    "courseNumber": "CPS 435-01",
    "academicSession": "Fall 2016"
  },
  "membership": {
    "@id": "https://example.edu/terms/201601/courses/7/sections/1/rosters/1",
    "@type": "http://purl.imsglobal.org/caliper/v1/Membership",
    "member": {
      "@id": "https://example.edu/users/554433",
      "@type": "http://purl.imsglobal.org/caliper/v1/Person"
    },
    "organization": {
      "@id": "https://example.edu/terms/201601/courses/7/sections/1",
      "@type": "http://purl.imsglobal.org/caliper/v1/CourseSection"
    },
    "roles": [ "http://purl.imsglobal.org/vocab/lis/v2/membership#Learner" ],
    "status": "http://purl.imsglobal.org/vocab/lis/v2/status#Active",
    "dateCreated": "2016-08-01T06:00:00.000Z"
  },
  "session": {
    "@id": "https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259",
    "@type": "http://purl.imsglobal.org/caliper/v1/Session",
    "startedAtTime": "2016-11-15T10:00:00.000Z"
  }
}

 */