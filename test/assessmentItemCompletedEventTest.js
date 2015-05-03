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
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');

var Event = require('../src/events/assessmentItemEvent');

// Actor
var Person = require('../src/entities/agent/person');

// Action
var AssessmentItemActions = require('../src/actions/assessmentItemActions');

// Activity Context
var AssessmentItem = require('../src/entities/assessment/assessmentItem');
var Attempt = require('../src/entities/assignable/attempt');
var FillinBlankResponse = require('../src/entities/response/fillinBlankResponse');

// Learning Context
var CourseOffering = require('../src/entities/lis/courseOffering');
var CourseSection = require('../src/entities/lis/courseSection');
var Group = require('../src/entities/lis/group');
var Membership = require('../src/entities/lis/membership');
var Role = require('../src/entities/lis/role');
var SoftwareApplication = require('../src/entities/agent/softwareApplication');
var Status = require('../src/entities/lis/status');

test('Create Assessment Item COMPLETED Event and validate attributes', function (t) {

    // Plan for N assertions
    t.plan(1);

    // The Actor for the Caliper Event
    var actor = new Person("https://some-university.edu/user/554433");
    var membership1 = new Membership("https://some-university.edu/membership/001");
    membership1.setMember("https://some-university.edu/user/554433");
    membership1.setOrganization("https://some-university.edu/politicalScience/2015/american-revolution-101");
    membership1.setRoles([Role.LEARNER]);
    membership1.setStatus(Status.ACTIVE);
    membership1.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    membership1.setDateModified(null);
    var membership2 = new Membership("https://some-university.edu/membership/002");
    membership2.setMember("https://some-university.edu/user/554433");
    membership2.setOrganization("https://some-university.edu/politicalScience/2015/american-revolution-101/section/001");
    membership2.setRoles([Role.LEARNER]);
    membership2.setStatus(Status.ACTIVE);
    membership2.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    membership2.setDateModified(null);
    var membership3 = new Membership("https://some-university.edu/membership/003");
    membership3.setMember("https://some-university.edu/user/554433");
    membership3.setOrganization("https://some-university.edu/politicalScience/2015/american-revolution-101/section/001/group/001");
    membership3.setRoles([Role.LEARNER]);
    membership3.setStatus(Status.ACTIVE);
    membership3.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    membership3.setDateModified(null);
    actor.setHasMembership([membership1, membership2, membership3]);
    actor.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    actor.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // The Action for the Caliper Event
    var action = AssessmentItemActions.COMPLETED;

    // The Object being interacted with by the Actor (AssessmentItem)
    var eventObj = new AssessmentItem("https://some-university.edu/politicalScience/2015/american-revolution-101/assessment1/item1");
    eventObj.setName("Assessment Item 1");
    eventObj.setIsPartOf("https://some-university.edu/politicalScience/2015/american-revolution-101/assessment1");
    eventObj.setMaxAttempts(2);
    eventObj.setMaxSubmits(2);
    eventObj.setMaxScore(1.0);
    eventObj.setDateModified(null);
    eventObj.setVersion("1.0");
    eventObj.isTimeDependent(false);

    // The target object (frame) within the Event Object
    var target = null;

    // The attempt (property of the generated response)
    var attempt = new Attempt("https://some-university.edu/politicalScience/2015/american-revolution-101/assessment1/item1/attempt1");
    attempt.setActor("https://some-university.edu/user/554433");
    attempt.setAssignable("https://some-university.edu/politicalScience/2015/american-revolution-101/assessment1");
    attempt.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    attempt.setCount(1);
    attempt.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());

    // The generated response
    var generated = new FillinBlankResponse("https://some-university.edu/politicalScience/2015/american-revolution-101/assessment1/item1/response1");
    generated.setAssignable("https://some-university.edu/politicalScience/2015/american-revolution-101/assessment1");
    generated.setActor("https://some-university.edu/user/554433");
    generated.setAttempt(attempt);
    generated.setValues(["2 July 1776"]);
    generated.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    generated.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());

    // The edApp that is part of the Learning Context
    var edApp = new SoftwareApplication("https://com.sat/super-assessment-tool");
    edApp.setName("Super Assessment Tool");
    edApp.setHasMembership([]);
    edApp.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    edApp.setDateModified(null);

    // LIS Course Offering
    var courseOffering = new CourseOffering("https://some-university.edu/politicalScience/2015/american-revolution-101");
    courseOffering.setName("Political Science 101: The American Revolution");
    courseOffering.setCourseNumber("POL101");
    courseOffering.setAcademicSession("Fall-2015");
    courseOffering.setMembership([]);
    courseOffering.setSubOrganizationOf(null);
    courseOffering.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    courseOffering.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Course Section
    var courseSection = new CourseSection("https://some-university.edu/politicalScience/2015/american-revolution-101/section/001");
    courseSection.setName("American Revolution 101");
    courseSection.setCourseNumber("POL101");
    courseSection.setAcademicSession("Fall-2015");
    courseSection.setMembership([membership2]);
    courseSection.setSubOrganizationOf(courseOffering);
    courseSection.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    courseSection.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Group
    var group = new Group("https://some-university.edu/politicalScience/2015/american-revolution-101/section/001/group/001");
    group.setName("Discussion Group 001");
    group.setMembership([membership3]);
    group.setSubOrganizationOf(courseSection);
    group.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());

    // Assert that key attributes are the same
    var assessmentItemEvent = new Event();
    assessmentItemEvent.setActor(actor);
    assessmentItemEvent.setAction(action);
    assessmentItemEvent.setObject(eventObj);
    assessmentItemEvent.setTarget(target);
    assessmentItemEvent.setGenerated(generated);
    assessmentItemEvent.setEdApp(edApp);
    assessmentItemEvent.setGroup(group);
    assessmentItemEvent.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());

    console.log("Assessment Item Event = " + util.inspect(assessmentItemEvent));

    // Assert that JSON produced is the same
    jsonCompare('caliperAssessmentItemCompletedEvent', assessmentItemEvent, t);
});