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
var assessmentEvent = require('../src/events/assessmentEvent');

// Entity
var entityFactory = require('../src/entities/entityFactory');
var Assessment = require('../src/entities/assessment/assessment');
var Attempt = require('../src/entities/assignable/attempt');
var CourseOffering = require('../src/entities/lis/courseOffering');
var CourseSection = require('../src/entities/lis/courseSection');
var Group = require('../src/entities/lis/group');
var Membership = require('../src/entities/lis/membership');
var Person = require('../src/entities/agent/person');
var SoftwareApplication = require('../src/entities/agent/SoftwareApplication');

// Action
var AssessmentActions = require('../src/actions/assessmentActions');

var Role = require('../src/entities/lis/role');
var Status = require('../src/entities/lis/status');

test('Create Assessment Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actorId = "https://example.edu/user/554433";
  var actor = entityFactory().create(Person, actorId, {
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString()
  });

  // The Action for the Caliper Event
  var action = AssessmentActions.STARTED;

  // The Object being interacted with by the Actor (Assessment)
  var objId = "https://example.edu/politicalScience/2015/american-revolution-101/assessment/001";
  var obj = entityFactory().create(Assessment, objId, {
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
  var generatedId = obj['@id'] + "/attempt/5678";
  var generated = entityFactory().create(Attempt, generatedId, {
    actor: actor['@id'],
    assignable: obj['@id'],
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    startedAtTime: new Date("2015-09-15T10:15:00Z").toISOString(),
    count: 1
  });

  // The edApp
  var edAppId = "https://example.com/super-assessment-tool";
  var edApp = entityFactory().create(SoftwareApplication, edAppId, {
    name: "Super Assessment Tool",
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    version: "v2"
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

  // The Actor's Membership
  var membershipId = course['@id'] + "/roster/554433";
  var membership = entityFactory().create(Membership, membershipId, {
    name: "American Revolution 101",
    description: "Roster entry",
    member: actor['@id'],
    organization: section['@id'],
    roles: [Role.LEARNER],
    status: Status.ACTIVE,
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString()
  });

  // Assert that key attributes are the same
  var event = assessmentEvent().create({
    actor: actor,
    action: action,
    object: obj,
    eventTime: new Date("2015-09-15T10:15:00Z").toISOString(),
    generated: generated,
    edApp: edApp,
    group: group,
    membership: membership
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventAssessmentStarted', event, t);
});