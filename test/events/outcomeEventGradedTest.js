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
var _ = require('lodash');
var util = require('util');
var jsonCompare = require('../testUtils');

// Event
var eventFactory = require('../../src/events/eventFactory');
var OutcomeEvent = require('../../src/events/outcomeEvent');

// Entity
var entityFactory = require('../../src/entities/entityFactory');
var Assessment = require('../../src/entities/resource/assessment');
var Attempt = require('../../src/entities/assign/attempt');
var CourseOffering = require('../../src/entities/lis/courseOffering');
var CourseSection = require('../../src/entities/lis/courseSection');
var Group = require('../../src/entities/lis/group');
var Person = require('../../src/entities/agent/person');
var Result = require('../../src/entities/assign/result');
var SoftwareApplication = require('../../src/entities/agent/SoftwareApplication');

// Action
var OutcomeActions = require('../../src/actions/outcomeActions');

test('Create an OutcomeEvent (graded) and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_COURSE_IRI = "https://example.edu/politicalScience/2015/american-revolution-101";

  // The Actor for the Caliper Event (as well as the edApp)
  var actorId = "https://example.com/super-assessment-tool";
  var actor = entityFactory().create(SoftwareApplication, actorId, {
    name: "Super Assessment Tool",
    dateCreated: moment.utc("2015-08-01T06:00:00Z"),
    version: "v2"
  });

  // The learner
  var learner = entityFactory().create(Person, "https://example.edu/user/554433");

  // The Action for the Caliper Event
  var action = OutcomeActions.GRADED;

  // The Object being interacted with by the Actor (Assessment)
  var assignableId = BASE_COURSE_IRI.concat("/assessment/001");
  var assignable = entityFactory().create(Assessment, assignableId, {
    name: "American Revolution - Key Figures Assessment",
    dateCreated: moment.utc("2015-08-01T06:00:00Z"),
    dateModified: moment.utc("2015-09-02T11:30:00Z"),
    datePublished: moment.utc("2015-08-15T09:30:00.000Z"),
    version: "1.0",
    dateToActivate: moment.utc("2015-08-16T05:00:00.000Z"),
    dateToShow: moment.utc("2015-08-16T05:00:00.000Z"),
    dateToStartOn: moment.utc("2015-08-16T05:00:00.000Z"),
    dateToSubmit: moment.utc("2015-09-28T11:59:59.000Z"),
    maxAttempts: 2,
    maxSubmits: 2,
    maxScore: 3.0
  });

  // The generated object (Attempt) within the Event Object
  var obj = entityFactory().create(Attempt, assignableId.concat("/attempt/5678"), {
    actor: learner['@id'],
    assignable: assignable['@id'],
    dateCreated: moment.utc("2015-08-01T06:00:00Z"),
    startedAtTime: moment.utc("2015-09-15T10:15:00Z"),
    count: 1
  });

  // Generated result
  var generated = entityFactory().create(Result, assignableId.concat("/attempt/5678/result"), {
    actor: learner['@id'],
    assignable: assignable['@id'],
    dateCreated: moment.utc("2015-08-01T06:00:00Z"),
    normalScore: 3.0,
    penaltyScore: 0.0,
    extraCreditScore: 0.0,
    totalScore: 3.0,
    curvedTotalScore: 3.0,
    curveFactor: 0.0,
    comment: "Well done.",
    scoredBy: actor
  });

  // LIS Course Offering
  var course = entityFactory().create(CourseOffering, BASE_COURSE_IRI, {
    name: "Political Science 101: The American Revolution",
    courseNumber: "POL101",
    academicSession: "Fall-2015",
    dateCreated: moment.utc("2015-08-01T06:00:00Z"),
    dateModified: moment.utc("2015-09-02T11:30:00Z")
  });

  // LIS Course Section
  var sectionId = BASE_COURSE_IRI.concat("/section/001");
  var section = entityFactory().create(CourseSection, sectionId, {
    name: "American Revolution 101",
    courseNumber: "POL101",
    academicSession: "Fall-2015",
    subOrganizationOf: course,
    dateCreated: moment.utc("2015-08-01T06:00:00Z"),
    dateModified: moment.utc("2015-09-02T11:30:00Z")
  });

  // LIS Group
  var groupId = sectionId.concat("/group/001");
  var group = entityFactory().create(Group, groupId, {
    name: "Discussion Group 001",
    subOrganizationOf: section,
    dateCreated: moment.utc("2015-08-01T06:00:00Z")
  });

  // Assert that key attributes are the same
  var event = eventFactory().create(OutcomeEvent, {
    actor: actor,
    action: action,
    object: obj,
    eventTime: moment.utc("2015-09-15T10:15:00Z"),
    generated: generated,
    group: group
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventOutcomeGraded', event, t);
});