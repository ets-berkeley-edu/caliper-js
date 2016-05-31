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
var EventFactory = require('../src/events/eventFactory');
var EventType = require('../src/events/eventType');

// Entity
var EntityFactory = require('../src/entities/entityFactory');
var EntityType = require('../src/entities/entityType');
var AssignableType = require('../src/entities/assignable/assignableDigitalResourceType');

// Action
var AssessmentItemActions = require('../src/actions/assessmentItemActions');

var Role = require('../src/entities/lis/role');
var Status = require('../src/entities/lis/status');

test('Create Assessment Item STARTED Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  var entityFactory = new EntityFactory();

  // The Actor for the Caliper Event
  var actorId = "https://example.edu/user/554433";
  var actor = entityFactory.create(EntityType.PERSON, actorId);
  actor.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
  actor.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

  // The Action for the Caliper Event
  var action = AssessmentItemActions.STARTED;

  // Parent assessment
  var parentId = "https://example.edu/politicalScience/2015/american-revolution-101/assessment/001";
  var parent = entityFactory.create(AssignableType.ASSESSMENT, parentId);
  parent.setName("American Revolution - Key Figures Assessment");
  parent.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());
  parent.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
  parent.setDatePublished((new Date("2015-08-15T09:30:00.000Z")).toISOString());
  parent.setVersion("1.0");
  parent.setDateToActivate((new Date("2015-08-16T05:00:00.000Z")).toISOString());
  parent.setDateToShow((new Date("2015-08-16T05:00:00.000Z")).toISOString());
  parent.setDateToStartOn((new Date("2015-08-16T05:00:00.000Z")).toISOString());
  parent.setDateToSubmit((new Date("2015-09-28T11:59:59.000Z")).toISOString());
  parent.setMaxAttempts(2);
  parent.setMaxSubmits(2);
  parent.setMaxScore(3.0);

  // The Object being interacted with by the Actor (AssessmentItem)
  var objId = parent['@id'] + "/item/001";
  var obj = entityFactory.create(AssignableType.ASSESSMENT_ITEM, objId);
  obj.setName("Assessment Item 1");
  obj.setIsPartOf(parent);
  obj.setMaxAttempts(2);
  obj.setMaxSubmits(2);
  obj.setMaxScore(1.0);
  obj.setDateModified(null);
  obj.setVersion("1.0");
  obj.setIsTimeDependent(false);

  // The generated object (Attempt) within the Event Object
  var generatedId = "https://example.edu/politicalScience/2015/american-revolution-101/assessment/001/item/001/attempt/789";
  var generated = entityFactory.create(EntityType.ATTEMPT, generatedId);
  generated.setActor(actor['@id']);
  generated.setAssignable(parent['@id']);
  generated.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
  generated.setCount(1);
  generated.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());

  // The edApp that is part of the Learning Context
  var edAppId = "https://example.com/super-assessment-tool";
  var edApp = entityFactory.create(EntityType.SOFTWARE_APPLICATION, edAppId);
  edApp.setName("Super Assessment Tool");
  edApp.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
  edApp.setDateModified(null);
  edApp.setVersion("v2");

  // LIS Course Offering
  var courseId = "https://example.edu/politicalScience/2015/american-revolution-101";
  var courseOffering = entityFactory.create(EntityType.COURSE_OFFERING, courseId);
  courseOffering.setName("Political Science 101: The American Revolution");
  courseOffering.setCourseNumber("POL101");
  courseOffering.setAcademicSession("Fall-2015");
  courseOffering.setSubOrganizationOf(null);
  courseOffering.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
  courseOffering.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

  // LIS Course Section
  var courseSectionId = courseOffering['@id'] + "/section/001";
  var courseSection = entityFactory.create(EntityType.COURSE_SECTION, courseSectionId);
  courseSection.setName("American Revolution 101");
  courseSection.setCourseNumber("POL101");
  courseSection.setAcademicSession("Fall-2015");
  courseSection.setSubOrganizationOf(courseOffering);
  courseSection.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
  courseSection.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

  // LIS Group
  var groupId = courseSection['@id'] + "/group/001";
  var group = entityFactory.create(EntityType.GROUP, groupId);
  group.setName("Discussion Group 001");
  group.setSubOrganizationOf(courseSection);
  group.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());

  // The Actor's Membership
  var membershipId = courseOffering['@id'] + "/roster/554433";
  var membership = entityFactory.create(EntityType.MEMBERSHIP, membershipId);
  membership.setName("American Revolution 101");
  membership.setDescription("Roster entry");
  membership.setMember(actor['@id']);
  membership.setOrganization(courseSection['@id']);
  membership.setRoles([Role.LEARNER]);
  membership.setStatus(Status.ACTIVE);
  membership.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());

  // Assert that key attributes are the same
  var event = new EventFactory().create(EventType.ASSESSMENT_ITEM);
  event.setActor(actor);
  event.setAction(action);
  event.setObject(obj);
  event.setGenerated(generated);
  event.setEventTime((new Date("2015-09-15T10:15:00Z")).toISOString());
  event.setEdApp(edApp);
  event.setGroup(group);
  event.setMembership(membership);

  console.log("Assessment Item Event = " + util.inspect(event));

  // Assert that JSON produced is the same
  jsonCompare('caliperEventAssessmentItemStarted', event, t);
});