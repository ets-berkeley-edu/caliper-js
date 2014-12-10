/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');
var Event = require('../src/events/mediaEvent');
var LearningObjective = require('../src/entities/learningObjective');
var Person = require('../src/entities/lis/person');
var VideoObject = require('../src/entities/media/videoObject');
var MediaLocation = require('../src/entities/media/mediaLocation');
var CourseSection = require('../src/entities/lis/courseSection');
var SoftwareApplication = require('../src/entities/softwareApplication');
var MediaActions = require('../src/actions/mediaActions');

test('Create Media Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actor = new Person("https://some-university.edu/user/554433");
  actor.setLastModifiedTime(1402965614516);

  // The Action for the Caliper Event
  var action = MediaActions.PAUSED;

  // The Object being interacted with by the Actor
  var eventObj = new VideoObject("https://com.sat/super-media-tool/video/video1");
  eventObj.setName("American Revolution - Key Figures Video");
  eventObj.setLastModifiedTime(1402965614516);
  eventObj.setDuration(1420);

  var lo = new LearningObjective("http://americanrevolution.com/personalities/learn");
  lo.setLastModifiedTime(0);
  eventObj.setAlignedLearningObjective([lo]);

  // The MediaLocation that is part of the MediaEvent
  var mediaLocation = new MediaLocation("https://com.sat/super-media-tool/video/video1");
  mediaLocation.setCurrentTime(710);
  mediaLocation.setLastModifiedTime(0);

  // The target object within the Event Object
  var targetObj = null;

  // The generated object within the Event Object
  var generatedObj = null;

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
  var mediaEvent = new Event();
  mediaEvent.setActor(actor);
  mediaEvent.setAction(action);
  mediaEvent.setObject(eventObj);
  mediaEvent.setMediaLocation(mediaLocation);
  mediaEvent.setTarget(targetObj);
  mediaEvent.setGenerated(generatedObj);
  mediaEvent.setEdApp(edApp);
  mediaEvent.setLisOrganization(org);
  mediaEvent.setStartedAtTime(1402965614516);

  console.log("Media Event = " + util.inspect(mediaEvent));

  // Assert that JSON produced is the same
  jsonCompare('caliperMediaEvent', mediaEvent, t);
})
