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
var GradeEvent = require('../../src/events/gradeEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var Assessment = require('../../src/entities/resource/assessment');
var Attempt = require('../../src/entities/resource/attempt');
var CourseSection = require('../../src/entities/agent/courseSection');
var Person = require('../../src/entities/agent/person');
var Score = require('../../src/entities/outcome/score');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var clientUtils = require('../../src/clients/clientUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEventGradeGraded.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('gradeEventGradedTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_IRI = "https://example.edu";
    const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

    // Id with canned value
    uuid = "urn:uuid:a50ca17f-5971-47bb-8fca-4e6e6879001d";

    // The Actor (grader)
    var actor = entityFactory().create(SoftwareApplication, {id: BASE_IRI.concat("/autograder"), version: "v2"});

    // The Action
    var action = actions.graded.term;

    // The Learner and the Assignment
    var assignee = entityFactory().create(Person, {id: BASE_IRI.concat("/users/554433")});
    var assignable = entityFactory().create(Assessment, {id: BASE_SECTION_IRI.concat("/assess/1")});

    // The Object of the interaction
    var obj = entityFactory().create(Attempt, {
      id: BASE_SECTION_IRI.concat("/assess/1/users/554433/attempts/1"),
      assignee: assignee,
      assignable: assignable,
      count: 1,
      dateCreated: moment.utc("2016-11-15T10:05:00.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:05:00.000Z"),
      endedAtTime: moment.utc("2016-11-15T10:55:12.000Z"),
      duration: "PT50M12S"
    });

    // Event time
    var eventTime = moment.utc("2016-11-15T10:57:06.000Z");

    // EdApp
    var edApp = entityFactory().coerce(SoftwareApplication, {id: BASE_IRI});

    // Generated result
    var generated = entityFactory().create(Score, {
      id: BASE_SECTION_IRI.concat("/assess/1/users/554433/attempts/1/scores/1"),
      attempt: obj.id,
      maxScore: 15.0,
      scoreGiven: 10.0,
      scoredBy: actor.id,
      comment: "auto-graded exam",
      dateCreated: moment.utc("2016-11-15T10:56:00.000Z")
    });

    // Group context
    var group = entityFactory().create(CourseSection, {
      id: BASE_SECTION_IRI,
      courseNumber: "CPS 435-01",
      academicSession: "Fall 2016"
    });

    // Assert that key attributes are the same
    var event = eventFactory().create(GradeEvent, {
      id: uuid,
      actor: actor,
      action: action,
      object: obj,
      eventTime: eventTime,
      edApp: edApp,
      generated: generated,
      group: group
    });

    // Compare
    var diff = testUtils.compare(fixture, clientUtils.parse(event));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + clientUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});