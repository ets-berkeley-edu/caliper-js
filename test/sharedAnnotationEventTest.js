/**
 *  @author Prashant Nayak
 *  @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');
var Event = require('../src/events/annotationEvent');
var Person = require('../src/entities/lis/person');
var CourseSection = require('../src/entities/lis/courseSection');
var SharedAnnotation = require('../src/entities/annotation/sharedAnnotation');
var EPubVolume = require('../src/entities/reading/ePubVolume');
var WebPage = require('../src/entities/reading/webPage');
var Frame = require('../src/entities/reading/frame');
var SoftwareApplication = require('../src/entities/softwareApplication');
var AnnotationActions = require('../src/actions/annotationActions');

test('Create SharedAnnotation Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actor = new Person("https://some-university.edu/user/554433");
  actor.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  actor.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());

  // The Action for the Caliper Event
  var action = AnnotationActions.SHARED;

  // The Object being interacted with by the Actor
  var eventObj = new SharedAnnotation("https://someEduApp.edu/shared/9999");
  eventObj.setAnnotationType("SHARED_ANNOTATION");
  eventObj.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  eventObj.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());
  var sharee1 = new Person("https://some-university.edu/students/657585");
  sharee1.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  sharee1.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());
  var sharee2 = new Person("https://some-university.edu/students/667788");
  sharee2.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  sharee2.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());
  eventObj.setWithAgents([sharee1, sharee2]);

  // The Digital Resource that the targetObj (below) belongs to
  var ePub = new EPubVolume("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)");
  ePub.setResourceType("EPUB_VOLUME");
  ePub.setName("The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)");
  ePub.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  ePub.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());

  // The target object (frame) within the Event Object
  var targetObj = new Frame("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3/3)");
  targetObj.setResourceType("FRAME");
  targetObj.setName("Key Figures: John Adams");
  targetObj.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  targetObj.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());
  targetObj.setIndex(3);
  targetObj.setIsPartOf(ePub);

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

  // Asser that key attributes are the same
  var sharedAnnotationEvent = new Event();
  sharedAnnotationEvent.setActor(actor);
  sharedAnnotationEvent.setAction(action);
  sharedAnnotationEvent.setObject(eventObj);
  sharedAnnotationEvent.setTarget(targetObj);
  sharedAnnotationEvent.setEdApp(edApp);
  sharedAnnotationEvent.setLisOrganization(org);
  sharedAnnotationEvent.setStartedAtTime((new Date("2015-02-15T10:15:00Z")).toISOString());

  console.log("Shared Annotation Event = " + util.inspect(sharedAnnotationEvent));

  // Assert that JSON produced is the same
  jsonCompare('caliperSharedAnnotationEvent', sharedAnnotationEvent, t);
})
