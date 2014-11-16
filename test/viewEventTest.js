/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');
var Event = require('../src/events/viewEvent');
var Person = require('../src/entities/lis/person');
var CourseSection = require('../src/entities/lis/courseSection');
var EPubVolume = require('../src/entities/reading/ePubVolume');
var WebPage = require('../src/entities/WebPage');
var Frame = require('../src/entities/reading/frame');
var SoftwareApplication = require('../src/entities/softwareApplication');
var ReadingActions = require('../src/actions/readingActions');

test('Create View Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actor = new Person("https://some-university.edu/user/554433");
  actor.setLastModifiedTime(1402965614516);

  // The Action for the Caliper Event
  var action = ReadingActions.VIEWED;

  // The Object being interacted with by the Actor
  var eventObj = new EPubVolume("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)");
  eventObj.setResourceType("EPUB_VOLUME");
  eventObj.setName("The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)");
  eventObj.setLastModifiedTime(1402965614516);

  // The target object (frame) within the Event Object
  var targetObj = new Frame("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3/1)");
  targetObj.setResourceType("FRAME");
  targetObj.setName("Key Figures: George Washington");
  targetObj.setLastModifiedTime(1402965614516);
  targetObj.setIndex(1);
  targetObj.setPartOf(eventObj);

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

  // Asser that key attributes are the same
  var viewEvent = new Event();
  viewEvent.setActor(actor);
  viewEvent.setAction(action);
  viewEvent.setObject(eventObj);
  viewEvent.setTarget(targetObj);
  viewEvent.setEdApp(edApp);
  viewEvent.setLisOrganization(org);
  viewEvent.setStartedAtTime(1402965614516);

  console.log("View Event = " + util.inspect(viewEvent));

  // Assert that JSON produced is the same
  jsonCompare('caliperViewEvent', viewEvent, t);
})
