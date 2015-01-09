/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');
var Event = require('../src/events/sessionEvent');
var Person = require('../src/entities/lis/person');
var Session = require('../src/entities/session/session');
var EPubVolume = require('../src/entities/reading/ePubVolume');
var SoftwareApplication = require('../src/entities/softwareApplication');
var Frame = require('../src/entities/reading/frame');
var SessionActions = require('../src/actions/sessionActions');

test('Create Session Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actor = new Person("https://some-university.edu/user/554433");
  actor.setLastModifiedTime(1402965614516);

  // The Action for the Caliper Event
  var action = SessionActions.LOGGED_IN;

  // The Object being interacted with by the Actor
  var eventObj = new SoftwareApplication("https://github.com/readium/readium-js-viewer");
  eventObj.setName("Readium");
  eventObj.setLastModifiedTime(1402965614516);

  var ePubVolume = new EPubVolume("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)");
  ePubVolume.setResourceType("EPUB_VOLUME");
  ePubVolume.setName("The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)");
  ePubVolume.setLastModifiedTime(1402965614516);

  // The target object (frame) within the Event Object
  var targetObj = new Frame("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3/1)");
  targetObj.setResourceType("FRAME");
  targetObj.setName("Key Figures: George Washington");
  targetObj.setLastModifiedTime(1402965614516);
  targetObj.setIndex(1);
  targetObj.setPartOf(ePubVolume);

  var generatedObj = new Session("https://github.com/readium/session-123456789");
  generatedObj.setName("session-123456789");
  generatedObj.setStartedAtTime(1402965614516);
  generatedObj.setEndedAtTime(0);
  generatedObj.setDuration(null);
  generatedObj.setLastModifiedTime(1402965614516);

  // The edApp that is part of the Learning Context
  var edApp = null;

  // The LIS Course Section for the Caliper Event
  var org = null;

  // Assert that key attributes are the same
  var sessionEvent = new Event();
  sessionEvent.setActor(actor);
  sessionEvent.setAction(action);
  sessionEvent.setObject(eventObj);
  sessionEvent.setTarget(targetObj);
  sessionEvent.setGenerated(generatedObj);
  sessionEvent.setEdApp(edApp);
  sessionEvent.setLisOrganization(org);
  sessionEvent.setStartedAtTime(1402965614516);

  console.log("Session Event = " + util.inspect(sessionEvent));

  // Assert that JSON produced is the same
  jsonCompare('caliperSessionEvent', sessionEvent, t);
})
