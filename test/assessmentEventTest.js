/**
 *  @author Prashant Nayak
 *  @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');
var Event = require('../src/events/assessmentEvent');
var Person = require('../src/entities/lis/person');
var CourseSection = require('../src/entities/lis/courseSection');
var EPubVolume = require('../src/entities/reading/ePubVolume');
var Assessment = require('../src/entities/assessment/assessment');
var AssessmentItem = require('../src/entities/assessment/assessmentItem');
var Attempt = require('../src/entities/assignable/attempt');
var SoftwareApplication = require('../src/entities/softwareApplication');
var AssessmentActions = require('../src/actions/assessmentActions');
var moment = require('moment');

test('Create Assessment Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actor = new Person("https://some-university.edu/user/554433");
  actor.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  actor.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());

  // The Action for the Caliper Event
  var action = AssessmentActions.STARTED;

  // The Object being interacted with by the Actor (Assessment)
  var eventObj = new Assessment("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1");
  eventObj.setName("American Revolution - Key Figures Assessment");
  eventObj.setIsPartOf("https://some-university.edu/politicalScience/2014/american-revolution-101");
  eventObj.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());
  eventObj.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  eventObj.setDatePublished((new Date("2015-01-15T09:30:00Z")).toISOString());
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
  var assessmentItem2 = new AssessmentItem("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1/item2");  
  assessmentItem2.setName("Assessment Item 2"); 
  assessmentItem2.setIsPartOf("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1");
  assessmentItem2.setMaxAttempts(2);
  assessmentItem2.setMaxSubmits(2);
  assessmentItem2.setMaxScore(1.0);
  assessmentItem2.setDateCreated(null);
  assessmentItem2.setDateModified(null);
  var assessmentItem3 = new AssessmentItem("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1/item3");  
  assessmentItem3.setName("Assessment Item 3"); 
  assessmentItem3.setIsPartOf("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1");
  assessmentItem3.setMaxAttempts(2);
  assessmentItem3.setMaxSubmits(2);
  assessmentItem3.setMaxScore(1.0);
  assessmentItem3.setDateCreated(null);
  assessmentItem3.setDateModified(null);

  eventObj.setAssessmentItems([assessmentItem1, assessmentItem2, assessmentItem3]);

  // The target object (frame) within the Event Object
  var targetObj = null;

  // The generated object (Attempt) within the Event Object
  var generatedObj = new Attempt("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1/attempt1");
  generatedObj.setName(null);
  generatedObj.setDescription(null);
  generatedObj.setActor("https://some-university.edu/user/554433");
  generatedObj.setAssignable("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1");
  generatedObj.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  generatedObj.setDateModified(null);
  generatedObj.setCount(1);
  generatedObj.setStartedAtTime((new Date("2015-02-15T10:15:00Z")).toISOString());
  generatedObj.setEndedAtTime(null);
  generatedObj.setDuration(null);

  // The edApp that is part of the Learning Context
  var edApp = new SoftwareApplication("https://com.sat/super-assessment-tool");
  edApp.setName("Super Assessment Tool");
  edApp.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  edApp.setDateModified(null);

  // The LIS Course Section for the Caliper Event
  var org = new CourseSection("https://some-university.edu/politicalScience/2014/american-revolution-101");
  org.setName("American Revolution 101");
  org.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  org.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());
  org.setCourseNumber("AmRev-101");
  org.setLabel("Am Rev 101");
  org.setSemester("Spring-2014");

  // Assert that key attributes are the same
  var assessmentEvent = new Event();
  assessmentEvent.setActor(actor);
  assessmentEvent.setAction(action);
  assessmentEvent.setObject(eventObj);
  assessmentEvent.setTarget(targetObj);
  assessmentEvent.setGenerated(generatedObj);
  assessmentEvent.setEdApp(edApp);
  assessmentEvent.setLisOrganization(org);
  assessmentEvent.setStartedAtTime((new Date("2015-02-15T10:15:00Z")).toISOString());

  console.log("Assessment Event = " + util.inspect(assessmentEvent));

  // Assert that JSON produced is the same
  jsonCompare('caliperAssessmentEvent', assessmentEvent, t);
})
