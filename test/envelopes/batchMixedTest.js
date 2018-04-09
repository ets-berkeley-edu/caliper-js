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
var clientUtils = require('../../src/clients/clientUtils');

var eventFactory = require('../../src/events/eventFactory');
var AssessmentEvent = require('../../src/events/assessmentEvent');
var GradeEvent = require('../../src/events/gradeEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var Assessment = require('../../src/entities/resource/assessment');
var AssessmentItem = require('../../src/entities/resource/assessmentItem');
var Attempt = require('../../src/entities/resource/attempt');
var CourseOffering = require('../../src/entities/agent/courseOffering');
var CourseSection = require('../../src/entities/agent/courseSection');
var Membership = require('../../src/entities/agent/membership');
var Person = require('../../src/entities/agent/person');
var Score = require('../../src/entities/outcome/score');
var Role = require('../../src/entities/agent/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Status = require('../../src/entities/agent/status');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir.v1p1 + "caliperEnvelopeMixedBatch.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('batchMixedTest', function (t) {

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
    var generated = entityFactory().create(Attempt, {
      id: BASE_ASSESS_IRI.concat("/users/554433/attempts/1"),
      assignee: actor.id,
      assignable: assessment.id,
      count: 1,
      dateCreated: moment.utc("2016-11-15T10:15:00.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:15:00.000Z"),
      endedAtTime: moment.utc("2016-11-15T10:55:12.000Z"),
      duration: "PT40M12S"
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
      object: assessment.id,
      eventTime: eventTime,
      generated: generated,
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
      dateCreated: moment.utc("2016-11-15T10:15:00.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:15:00.000Z"),
      endedAtTime: moment.utc("2016-11-15T10:55:12.000Z"),
      duration: "PT40M12S"
    });

    // Event time
    eventTime = moment.utc("2016-11-15T10:57:06.000Z");

    // Generated score
    var result = entityFactory().create(Score, {
      id: BASE_SECTION_IRI.concat("/assess/1/users/554433/attempts/1/scores/1"),
      attempt: attempt.id,
      maxScore: 15,
      scoreGiven: 10,
      scoredBy: grader.id,
      comment: "auto-graded exam",
      dateCreated: moment.utc("2016-11-15T10:56:00.000Z")
    });

    // Assert that key attributes are the same
    var eventGraded = eventFactory().create(GradeEvent, {
      id: uuid,
      actor: grader,
      action: action,
      object: attempt,
      eventTime: eventTime,
      edApp: app.id,
      generated: result,
      group: section.id
    });

    // Create data payload
    var data = [];
    data.push(actor);
    data.push(assessment);
    data.push(app);
    data.push(section);
    data.push(eventStarted);
    data.push(eventSubmitted);
    data.push(eventGraded);

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