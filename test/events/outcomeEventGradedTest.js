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
var OutcomeEvent = require('../../src/events/outcomeEvent');
var OutcomeActions = require('../../src/actions/outcomeActions');

var entityFactory = require('../../src/entities/entityFactory');
var Assessment = require('../../src/entities/resource/assessment');
var Attempt = require('../../src/entities/assign/attempt');
var CourseSection = require('../../src/entities/lis/courseSection');
var Person = require('../../src/entities/agent/person');
var Result = require('../../src/entities/assign/result');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');

var jsonCompare = require('../testUtils');

test('Create an OutcomeEvent (graded) and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";
  const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

  // The Actor (grader)
  var actor = entityFactory().create(SoftwareApplication, BASE_IRI.concat("/autograder"), { version: "v2" });

  // The Action
  var action = OutcomeActions.GRADED;

  // The Learner and the Assignment
  var learner = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));
  var assignable = entityFactory().create(Assessment, BASE_SECTION_IRI.concat("/assess/1"));

  // The Object of the interaction
  var obj = entityFactory().create(Attempt, BASE_SECTION_IRI.concat("/assess/1/users/554433/attempts/1"), {
    actor: learner,
    assignable: assignable,
    count: 1,
    dateCreated: moment.utc("2016-11-15T10:05:00.000Z"),
    startedAtTime: moment.utc("2016-11-15T10:05:00.000Z"),
    endedAtTime: moment.utc("2016-11-15T10:55:12.000Z"),
    duration: "PT50M12S"
  });

  // Event time
  var eventTime = moment.utc("2016-11-15T10:57:06.000Z");

  // Generated result
  var attempt = _.omit(obj, ["actor", "assignable", "count", "dateCreated", "startedAtTime", "endedAtTime", "duration"]);
  var scoredBy = _.omit(actor, ["version"]);
  var generated = entityFactory().create(Result, BASE_SECTION_IRI.concat("/assess/1/users/554433/results/1"), {
    attempt: attempt,
    normalScore: 15,
    totalScore: 15,
    scoredBy: scoredBy,
    dateCreated: moment.utc("2016-11-15T10:55:05.000Z")
  });

  // Group context
  var group = entityFactory().create(CourseSection, BASE_SECTION_IRI, {
    courseNumber: "CPS 435-01",
    academicSession: "Fall 2016"
  });

  // Assert that key attributes are the same
  var event = eventFactory().create(OutcomeEvent, {
    actor: actor,
    action: action,
    object: obj,
    eventTime: eventTime,
    generated: generated,
    group: group
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventOutcomeGraded', event, t);
});