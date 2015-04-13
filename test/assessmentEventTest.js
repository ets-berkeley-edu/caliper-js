/**
 *  @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');

var Event = require('../src/events/assessmentEvent');

// Actor
var Person = require('../src/entities/agent/person');

// Action
var AssessmentActions = require('../src/actions/assessmentActions');

// Activity Context
var Assessment = require('../src/entities/assessment/assessment');
var AssessmentItem = require('../src/entities/assessment/assessmentItem');
var Attempt = require('../src/entities/assignable/attempt');
// var EPubVolume = require('../src/entities/reading/ePubVolume');

// Learning Context
var CourseOffering = require('../src/entities/lis/courseOffering');
var CourseSection = require('../src/entities/lis/courseSection');
var Group = require('../src/entities/lis/group');
var Membership = require('../src/entities/lis/membership');
var Role = require('../src/entities/lis/role');
var SoftwareApplication = require('../src/entities/agent/softwareApplication');
var Status = require('../src/entities/lis/status');

test('Create Assessment Event and validate attributes', function (t) {

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
    var action = AssessmentActions.STARTED;

    // The Object being interacted with by the Actor (Assessment)
    var eventObj = new Assessment("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1");
    eventObj.setName("American Revolution - Key Figures Assessment");
    eventObj.setIsPartOf("https://some-university.edu/politicalScience/2014/american-revolution-101");
    eventObj.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());
    eventObj.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    eventObj.setDatePublished((new Date("2015-01-15T09:30:00Z")).toISOString());
    eventObj.setVersion("1.0");
    eventObj.setDateToActivate((new Date("2015-01-16T05:00:00Z")).toISOString());
    eventObj.setDateToShow((new Date("2015-01-16T05:00:00Z")).toISOString());
    eventObj.setDateToStartOn((new Date("2015-01-16T05:00:00Z")).toISOString());
    eventObj.setDateToSubmit((new Date("2015-02-28T11:59:59Z")).toISOString());
    eventObj.setMaxAttempts(2);
    eventObj.setMaxSubmits(2);
    eventObj.setMaxScore(3.0);

    // The Assessment has three items
    var assessmentItem1 = new AssessmentItem("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1/item1");
    assessmentItem1.setName("Assessment Item 1");
    assessmentItem1.setIsPartOf("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1");
    assessmentItem1.setMaxAttempts(2);
    assessmentItem1.setMaxSubmits(2);
    assessmentItem1.setMaxScore(1.0);
    assessmentItem1.setDateCreated(null);
    assessmentItem1.setDateModified(null);
    assessmentItem1.setVersion("1.0");
    var assessmentItem2 = new AssessmentItem("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1/item2");
    assessmentItem2.setName("Assessment Item 2");
    assessmentItem2.setIsPartOf("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1");
    assessmentItem2.setMaxAttempts(2);
    assessmentItem2.setMaxSubmits(2);
    assessmentItem2.setMaxScore(1.0);
    assessmentItem2.setDateCreated(null);
    assessmentItem2.setDateModified(null);
    assessmentItem2.setVersion("1.0");
    var assessmentItem3 = new AssessmentItem("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1/item3");
    assessmentItem3.setName("Assessment Item 3");
    assessmentItem3.setIsPartOf("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1");
    assessmentItem3.setMaxAttempts(2);
    assessmentItem3.setMaxSubmits(2);
    assessmentItem3.setMaxScore(1.0);
    assessmentItem3.setDateCreated(null);
    assessmentItem3.setDateModified(null);
    assessmentItem3.setVersion("1.0");

    eventObj.setAssessmentItems([assessmentItem1, assessmentItem2, assessmentItem3]);

    // The target object (frame) within the Event Object
    var targetObj = null;

    // The generated object (Attempt) within the Event Object
    var generatedObj = new Attempt("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1/attempt1");
    generatedObj.setName(null);
    generatedObj.setDescription(null);
    generatedObj.setActor("https://some-university.edu/user/554433");
    generatedObj.setAssignable("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1");
    generatedObj.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    generatedObj.setDateModified(null);
    generatedObj.setCount(1);
    generatedObj.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());
    generatedObj.setEndedAtTime(null);
    generatedObj.setDuration(null);

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
    courseOffering.setMembership(null);
    courseOffering.setSubOrganizationOf(null);
    courseOffering.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    courseOffering.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Course Section
    var courseSection = new CourseSection("https://some-university.edu/politicalScience/2014/american-revolution-101");
    courseSection.setName("American Revolution 101");
    courseSection.setCourseNumber("POL101");
    courseSection.setCategory(null);
    courseSection.setAcademicSession("Fall-2015");
    courseSection.setMembership([membership2]);
    courseSection.setSubOrganizationOf(courseOffering);
    courseSection.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    courseSection.setDateModified(null);

    // LIS Group
    var group = new Group("https://some-university.edu/politicalScience/2015/american-revolution-101/section/001/group/001");
    group.setName("Discussion Group 001");
    group.setMembership([membership3]);
    group.setSubOrganizationOf(courseSection);
    group.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    group.setDateModified(null);

    // Assert that key attributes are the same
    var assessmentEvent = new Event();
    assessmentEvent.setActor(actor);
    assessmentEvent.setAction(action);
    assessmentEvent.setObject(eventObj);
    assessmentEvent.setTarget(targetObj);
    assessmentEvent.setGenerated(generatedObj);
    assessmentEvent.setEdApp(edApp);
    assessmentEvent.setGroup(group);
    assessmentEvent.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());

    console.log("Assessment Event = " + util.inspect(assessmentEvent));

    // Assert that JSON produced is the same
    jsonCompare('caliperAssessmentEvent', assessmentEvent, t);
})
