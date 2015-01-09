/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');
var Event = require('../src/events/assessmentItemEvent');
var Person = require('../src/entities/lis/person');
var CourseSection = require('../src/entities/lis/courseSection');
var EPubVolume = require('../src/entities/reading/ePubVolume');
var AssessmentItem = require('../src/entities/assessment/assessmentItem');
var Attempt = require('../src/entities/assignable/attempt');
var SoftwareApplication = require('../src/entities/softwareApplication');
var AssessmentActions = require('../src/actions/assessmentActions');

test('Create Assessment Item Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actor = new Person("https://some-university.edu/user/554433");
  actor.setLastModifiedTime(1402965614516);

  // The Action for the Caliper Event
  var action = AssessmentActions.STARTED;

  // The Object being interacted with by the Actor (AssessmentItem)
  var eventObj = new AssessmentItem("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1/item1");
  eventObj.setName("Assessment Item 1");
  eventObj.setPartOf("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1");
  eventObj.setMaxAttempts(2);
  eventObj.setMaxSubmits(2);
  eventObj.setMaxScore(1.0);
  eventObj.setLastModifiedTime(0);

  // The target object (frame) within the Event Object
  var targetObj = null;

  // The generated object (Response/Result?) within the Event Object
  var generatedObj = null; //TODO - fix

  // The edApp that is part of the Learning Context
  var edApp = new SoftwareApplication("https://github.com/readium/readium-js-viewer");
  edApp.setName("Readium");
  edApp.setLastModifiedTime(1402965614516);

  // The LIS Course Section for the Caliper Event
  var org = new CourseSection("https://some-university.edu/politicalScience/2014/american-revolution-101");
  org.setName("American Revolution 101");
  org.setLastModifiedTime(1402965614516);
  org.setCourseNumber("AmRev-101");
  org.setLabel("Am Rev 101");
  org.setSemester("Spring-2014");

  // Assert that key attributes are the same
  var assessmentItemEvent = new Event();
  assessmentItemEvent.setActor(actor);
  assessmentItemEvent.setAction(action);
  assessmentItemEvent.setObject(eventObj);
  assessmentItemEvent.setTarget(targetObj);
  assessmentItemEvent.setGenerated(generatedObj);
  assessmentItemEvent.setEdApp(edApp);
  assessmentItemEvent.setLisOrganization(org);
  assessmentItemEvent.setStartedAtTime(1402965614516);

  console.log("Assessment Item Event = " + util.inspect(assessmentItemEvent));

  // Assert that JSON produced is the same
  jsonCompare('caliperAssessmentItemEvent', assessmentItemEvent, t);
})
