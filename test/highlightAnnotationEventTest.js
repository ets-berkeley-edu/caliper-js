/**
 *  @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');

var Event = require('../src/events/annotationEvent');

// Actor
var Person = require('../src/entities/agent/person');

// Action
var AnnotationActions = require('../src/actions/annotationActions');

// Activity Context
var CourseSection = require('../src/entities/lis/courseSection');
var Frame = require('../src/entities/reading/frame');
var HighlightAnnotation = require('../src/entities/annotation/highlightAnnotation');
var EPubVolume = require('../src/entities/reading/ePubVolume');

// Learning Context
var CourseOffering = require('../src/entities/lis/courseOffering');
var CourseSection = require('../src/entities/lis/courseSection');
var Group = require('../src/entities/lis/group');
var Membership = require('../src/entities/lis/membership');
var Role = require('../src/entities/lis/role');
var SoftwareApplication = require('../src/entities/agent/softwareApplication');
var Status = require('../src/entities/lis/status');
var WebPage = require('../src/entities/reading/webPage');

test('Create HighlightAnnotation Event and validate attributes', function (t) {

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
    var action = AnnotationActions.HIGHLIGHTED;

    // The DigitalResource parent
    var ePub = new EPubVolume("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)");
    ePub.setName("The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)");
    ePub.setVersion("2nd ed.");
    ePub.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    ePub.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // The Object being interacted with by the Actor
    var eventObj = new Frame("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3/1)");
    eventObj.setName("Key Figures: George Washington");
    eventObj.setVersion("2nd ed.");
    eventObj.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    eventObj.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());
    eventObj.setIndex(1);
    eventObj.setIsPartOf(ePub);

    // The generated annotation
    var generated = new HighlightAnnotation("https://someEduApp.edu/highlights/12345");
    generated.setAnnotatedId(eventObj['@id']);
    generated.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    generated.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());
    generated.setSelection({ "start": "455", "end": "489" });
    generated.setSelectionText("Life, Liberty and the pursuit of Happiness");

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

    // Asser that key attributes are the same
    var hilightAnnotationEvent = new Event();
    hilightAnnotationEvent.setActor(actor);
    hilightAnnotationEvent.setAction(action);
    hilightAnnotationEvent.setObject(eventObj);
    hilightAnnotationEvent.setGenerated(generated);
    hilightAnnotationEvent.setEdApp(edApp);
    hilightAnnotationEvent.setGroup(group);
    hilightAnnotationEvent.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());

    console.log("Highlight Annotation Event = " + util.inspect(hilightAnnotationEvent));

    // Assert that JSON produced is the same
    jsonCompare('caliperHighlightAnnotationEvent', hilightAnnotationEvent, t);
})