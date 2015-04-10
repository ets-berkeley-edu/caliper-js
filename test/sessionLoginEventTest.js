/**
 *  @author Prashant Nayak
 *  @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');
var Event = require('../src/events/sessionEvent');
var Person = require('../src/entities/agent/person');
var Session = require('../src/entities/session/session');
var EPubVolume = require('../src/entities/reading/ePubVolume');
var SoftwareApplication = require('../src/entities/agent/softwareApplication');
var Frame = require('../src/entities/reading/frame');
var SessionActions = require('../src/actions/sessionActions');
var CourseSection = require('../src/entities/lis/courseSection');

test('Create Session LOGIN Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actor = new Person("https://some-university.edu/user/554433");
  actor.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  actor.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  actor.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());

  // The Action for the Caliper Event
  var action = SessionActions.LOGGED_IN;

  // The Object being interacted with by the Actor
  var eventObj = new SoftwareApplication("https://github.com/readium/readium-js-viewer");
  eventObj.setName("Readium");
  eventObj.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  eventObj.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());

  var ePubVolume = new EPubVolume("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)");
  ePubVolume.setResourceType("EPUB_VOLUME");
  ePubVolume.setName("The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)");
  ePubVolume.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  ePubVolume.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());

  // The target object (frame) within the Event Object
  var targetObj = new Frame("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3/1)");
  targetObj.setResourceType("FRAME");
  targetObj.setName("Key Figures: George Washington");
  targetObj.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  targetObj.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());
  targetObj.setIndex(1);
  targetObj.setIsPartOf(ePubVolume);

  var generatedObj = new Session("https://github.com/readium/session-123456789");
  generatedObj.setName("session-123456789");
  generatedObj.setDescription(null);
  generatedObj.setActor(actor);
  generatedObj.setStartedAtTime((new Date("2015-02-15T10:15:00Z")).toISOString());
  generatedObj.setEndedAtTime(null);
  generatedObj.setDuration(null);
  generatedObj.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  generatedObj.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());

  // The edApp that is part of the Learning Context
  var edApp = new SoftwareApplication("https://github.com/readium/readium-js-viewer");
  edApp.setName("Readium");
  edApp.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  edApp.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());

  // The LIS Course Section for the Caliper Event
  var org = new CourseSection("https://some-university.edu/politicalScience/2014/american-revolution-101");
  org.setName("American Revolution 101");
  org.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  org.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());
  org.setCourseNumber("AmRev-101");
  org.setLabel("Am Rev 101");
  org.setSemester("Spring-2014");

  // Assert that key attributes are the same
  var sessionEvent = new Event();
  sessionEvent.setActor(actor);
  sessionEvent.setAction(action);
  sessionEvent.setObject(eventObj);
  sessionEvent.setTarget(targetObj);
  sessionEvent.setGenerated(generatedObj);
  sessionEvent.setEdApp(edApp);
  sessionEvent.setLisOrganization(org);
  sessionEvent.setStartedAtTime((new Date("2015-02-15T10:15:00Z")).toISOString());

  console.log("Session Event = " + util.inspect(sessionEvent));

  // Assert that JSON produced is the same
  jsonCompare('caliperSessionLoginEvent', sessionEvent, t);
})
