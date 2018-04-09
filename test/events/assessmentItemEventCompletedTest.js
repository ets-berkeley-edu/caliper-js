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
var AssessmentItemEvent = require('../../src/events/assessmentItemEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var Assessment = require('../../src/entities/resource/assessment');
var AssessmentItem = require('../../src/entities/resource/assessmentItem');
var Attempt = require('../../src/entities/resource/attempt');
var CourseSection = require('../../src/entities/agent/courseSection');
var FillinBlankResponse = require('../../src/entities/response/fillinBlankResponse');
var Membership = require('../../src/entities/agent/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/agent/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Status = require('../../src/entities/agent/status');
var clientUtils = require('../../src/clients/clientUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir.v1p1 + "caliperEventAssessmentItemCompleted.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('assessmentItemEventCompletedTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_IRI = "https://example.edu";
    const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";
    const BASE_ASSESS_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1";
    const BASE_ITEM_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3";

    // Id with canned value
    uuid = "urn:uuid:e5891791-3d27-4df1-a272-091806a43dfb";

    // Actor
    var actor = entityFactory().create(Person, {id: BASE_IRI.concat("/users/554433")});

    // The Action for the Caliper Event
    var action = actions.completed.term;

    // Parent assessment
    var parent = entityFactory().create(Assessment, {id: BASE_ASSESS_IRI});
    var parentAttemptId = entityFactory().coerce(Attempt, {id: BASE_ASSESS_IRI.concat("/users/554433/attempts/1")});

    // Object of the interaction
    var obj = entityFactory().create(AssessmentItem, {
      id: BASE_ASSESS_IRI.concat("/items/3"),
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

    // Item
    var item = entityFactory().create(AssessmentItem, {
      id: BASE_ASSESS_IRI.concat("/items/3"),
      name: "Assessment Item 3",
      isPartOf: parent
    });

    // Event time
    var eventTime = moment.utc("2016-11-15T10:15:12.000Z");

    // The Attempt
    var attempt = entityFactory().create(Attempt, {
      id: BASE_ITEM_IRI.concat("/users/554433/attempts/1"),
      assignee: actor.id,
      assignable: item,
      isPartOf: parentAttemptId,
      dateCreated: moment.utc("2016-11-15T10:15:02.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:15:02.000Z"),
      endedAtTime: moment.utc("2016-11-15T10:15:12.000Z"),
      count: 1
    });

    // The generated response
    var generated = entityFactory().create(FillinBlankResponse, {
      id: BASE_ITEM_IRI.concat("/users/554433/responses/1"),
      attempt: attempt,
      values: [ "subject", "object", "predicate" ],
      dateCreated: moment.utc("2016-11-15T10:15:12.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:15:02.000Z"),
      endedAtTime: moment.utc("2016-11-15T10:15:12.000Z")
    });

    // The edApp
    var edApp = entityFactory().create(SoftwareApplication, {id: BASE_IRI, version: "v2"});

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
      id: BASE_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"),
      startedAtTime: moment.utc("2016-11-15T10:00:00.000Z")
    });

    // Assert that key attributes are the same
    var event = eventFactory().create(AssessmentItemEvent, {
      id: uuid,
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
    var diff = testUtils.compare(fixture, clientUtils.parse(event));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + clientUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});