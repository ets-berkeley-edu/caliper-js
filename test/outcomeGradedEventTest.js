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

var test = require('tape');
var _ = require('lodash');
var util = require('util');
var jsonCompare = require('./testUtils');

// Event
var outcomeEvent = require('../src/events/outcomeEvent');

// Entity
var entityFactory = require('../src/entities/entityFactory');
var Assessment = require('../src/entities/assessment/assessment');
var Attempt = require('../src/entities/assignable/attempt');
var CourseOffering = require('../src/entities/lis/courseOffering');
var CourseSection = require('../src/entities/lis/courseSection');
var Group = require('../src/entities/lis/group');
var Person = require('../src/entities/agent/person');
var Result = require('../src/entities/outcome/result');
var SoftwareApplication = require('../src/entities/agent/SoftwareApplication');

// Action
var OutcomeActions = require('../src/actions/outcomeActions');

test('Create Outcome Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event (as well as the edApp)
  var actorId = "https://example.com/super-assessment-tool";
  var actor = entityFactory().create(SoftwareApplication, actorId, {
    name: "Super Assessment Tool",
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    version: "v2"
  });

  // The learner
  var learner = entityFactory().create(Person, "https://example.edu/user/554433");

  // The Action for the Caliper Event
  var action = OutcomeActions.GRADED;

  // The Object being interacted with by the Actor (Assessment)
  var assignableId = "https://example.edu/politicalScience/2015/american-revolution-101/assessment/001";
  var assignable = entityFactory().create(Assessment, assignableId, {
    name: "American Revolution - Key Figures Assessment",
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString(),
    datePublished: new Date("2015-08-15T09:30:00.000Z").toISOString(),
    version: "1.0",
    dateToActivate: new Date("2015-08-16T05:00:00.000Z").toISOString(),
    dateToShow: new Date("2015-08-16T05:00:00.000Z").toISOString(),
    dateToStartOn: new Date("2015-08-16T05:00:00.000Z").toISOString(),
    dateToSubmit: new Date("2015-09-28T11:59:59.000Z").toISOString(),
    maxAttempts: 2,
    maxSubmits: 2,
    maxScore: 3.0
  });

  // The generated object (Attempt) within the Event Object
  var objId = assignable['@id'] + "/attempt/5678";
  var obj = entityFactory().create(Attempt, objId, {
    actor: learner['@id'],
    assignable: assignable['@id'],
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    startedAtTime: new Date("2015-09-15T10:15:00Z").toISOString(),
    count: 1
  });

  // Generated result
  var generatedId = obj['@id'] + "/result";
  var generated = entityFactory().create(Result, generatedId, {
    actor: learner['@id'],
    assignable: assignable['@id'],
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
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
  var courseId = "https://example.edu/politicalScience/2015/american-revolution-101";
  var course = entityFactory().create(CourseOffering, courseId, {
    name: "Political Science 101: The American Revolution",
    courseNumber: "POL101",
    academicSession: "Fall-2015",
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString()
  });

  // LIS Course Section
  var sectionId = course['@id'] + "/section/001";
  var section = entityFactory().create(CourseSection, sectionId, {
    name: "American Revolution 101",
    courseNumber: "POL101",
    academicSession: "Fall-2015",
    subOrganizationOf: course,
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString()
  });

  // LIS Group
  var groupId = section['@id'] + "/group/001";
  var group = entityFactory().create(Group, groupId, {
    name: "Discussion Group 001",
    subOrganizationOf: section,
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString()
  });

  // Assert that key attributes are the same

  // Assert that key attributes are the same
  var event = outcomeEvent().create({
    actor: actor,
    action: action,
    object: obj,
    eventTime: new Date("2015-09-15T10:15:00Z").toISOString(),
    generated: generated,
    group: group
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventOutcomeGraded', event, t);
});