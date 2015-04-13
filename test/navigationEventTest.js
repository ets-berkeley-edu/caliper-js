/**
 *  @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');

var Event = require('../src/events/navigationEvent');

// Actor
var Person = require('../src/entities/agent/person');

// Actions
var ReadingActions = require('../src/actions/readingActions');

// Activity Context
var EPubVolume = require('../src/entities/reading/ePubVolume');
var Frame = require('../src/entities/reading/frame');
var WebPage = require('../src/entities/reading/webPage');

// Learning Context
var CourseOffering = require('../src/entities/lis/courseOffering');
var CourseSection = require('../src/entities/lis/courseSection');
var Group = require('../src/entities/lis/group');
var Membership = require('../src/entities/lis/membership');
var Role = require('../src/entities/lis/role');
var SoftwareApplication = require('../src/entities/agent/softwareApplication');
var Status = require('../src/entities/lis/status');

test('Create Navigation Event and validate attributes', function (t) {

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
    var membership2 = new Membership("https://some-university.edu/membership/002");
    membership2.setMember("https://some-university.edu/user/554433");
    membership2.setOrganization("https://some-university.edu/politicalScience/2015/american-revolution-101/section/001");
    membership2.setRoles([Role.LEARNER]);
    membership2.setStatus(Status.ACTIVE);
    membership2.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    var membership3 = new Membership("https://some-university.edu/membership/003");
    membership3.setMember("https://some-university.edu/user/554433");
    membership3.setOrganization("https://some-university.edu/politicalScience/2015/american-revolution-101/section/001/group/001");
    membership3.setRoles([Role.LEARNER]);
    membership3.setStatus(Status.ACTIVE);
    membership3.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    actor.setHasMembership([membership1, membership2, membership3]);
    actor.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    actor.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // The Action for the Caliper Event
    var action = ReadingActions.NAVIGATED_TO;

    // The Object being interacted with by the Actor
    var eventObj = new EPubVolume("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)");
    eventObj.setName("The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)");
    eventObj.setVersion("2nd ed.");
    eventObj.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    eventObj.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // The target object (frame) within the Event Object
    var targetObj = new Frame("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3/1)");
    targetObj.setName("Key Figures: George Washington");
    targetObj.setVersion("2nd ed.");
    targetObj.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    targetObj.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());
    targetObj.setIndex(1);
    targetObj.setIsPartOf(eventObj);

    // The edApp that is part of the Learning Context
    var edApp = new SoftwareApplication("https://github.com/readium/readium-js-viewer");
    edApp.setName("Readium");
    edApp.setHasMembership([]);
    edApp.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    edApp.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Course Offering
    var courseOffering = new CourseOffering("https://some-university.edu/politicalScience/2015/american-revolution-101");
    courseOffering.setName("Political Science 101: The American Revolution");
    courseOffering.setCourseNumber("POL101");
    courseOffering.setAcademicSession("Fall-2015");
    courseOffering.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    courseOffering.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Course Section
    var courseSection = new CourseSection("https://some-university.edu/politicalScience/2015/american-revolution-101/section/001");
    courseSection.setName("American Revolution 101");
    courseSection.setCourseNumber("POL101");
    courseSection.setCategory(null);
    courseSection.setAcademicSession("Fall-2015");
    courseSection.setMembership([membership2]);
    courseSection.setSubOrganizationOf(courseOffering);
    courseSection.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());

    // LIS Group
    var group = new Group("https://some-university.edu/politicalScience/2015/american-revolution-101/section/001/group/001");
    group.setName("Discussion Group 001");
    group.setMembership([membership3]);
    group.setSubOrganizationOf(courseSection);
    group.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    group.setDateModified(null);

    // Specific to the Navigation Event - the location where the user navigated from
    var navigatedFromObj = new WebPage("https://some-university.edu/politicalScience/2014/american-revolution-101/index.html");
    navigatedFromObj.setName("American Revolution 101 Landing Page");
    navigatedFromObj.setIsPartOf(courseSection);
    navigatedFromObj.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    navigatedFromObj.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // Assert that key attributes are the same
    var navigationEvent = new Event();
    navigationEvent.setActor(actor);
    navigationEvent.setAction(action);
    navigationEvent.setObject(eventObj);
    navigationEvent.setTarget(targetObj);
    navigationEvent.setEdApp(edApp);
    navigationEvent.setGroup(group);
    navigationEvent.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());
    navigationEvent.setNavigatedFrom(navigatedFromObj);

    console.log("Navigation Event = " + util.inspect(navigationEvent));

    // Assert that JSON produced is the same
    jsonCompare('caliperNavigationEvent', navigationEvent, t);
})
