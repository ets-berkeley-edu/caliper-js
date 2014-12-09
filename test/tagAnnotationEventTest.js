/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');
var Event = require('../src/events/annotationEvent');
var Person = require('../src/entities/lis/person');
var CourseSection = require('../src/entities/lis/courseSection');
var TagAnnotation = require('../src/entities/annotation/tagAnnotation');
var EPubVolume = require('../src/entities/reading/ePubVolume');
var WebPage = require('../src/entities/WebPage');
var Frame = require('../src/entities/reading/frame');
var SoftwareApplication = require('../src/entities/softwareApplication');
var AnnotationActions = require('../src/actions/annotationActions');

test('Create TagAnnotation Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actor = new Person("https://some-university.edu/user/554433");
  actor.setLastModifiedTime(1402965614516);

  // The Action for the Caliper Event
  var action = AnnotationActions.TAGGED;

  // The Object being interacted with by the Actor
  var eventObj = new TagAnnotation("https://someEduApp.edu/tags/7654");
  eventObj.setAnnotationType("TAG_ANNOTATION");
  eventObj.setLastModifiedTime(1402965614516);
  eventObj.setTags(["to-read", "1765", "shared-with-project-team"]);

  // The Digital Resource that the targetObj (below) belongs to
  var ePub = new EPubVolume("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)");
  ePub.setResourceType("EPUB_VOLUME");
  ePub.setName("The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)");
  ePub.setLastModifiedTime(1402965614516);

  // The target object (frame) within the Event Object
  var targetObj = new Frame("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3/4)");
  targetObj.setResourceType("FRAME");
  targetObj.setName("The Stamp Act Crisis");
  targetObj.setLastModifiedTime(1402965614516);
  targetObj.setIndex(4);
  targetObj.setPartOf(ePub);

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
  var tagAnnotationEvent = new Event();
  tagAnnotationEvent.setActor(actor);
  tagAnnotationEvent.setAction(action);
  tagAnnotationEvent.setObject(eventObj);
  tagAnnotationEvent.setTarget(targetObj);
  tagAnnotationEvent.setEdApp(edApp);
  tagAnnotationEvent.setLisOrganization(org);
  tagAnnotationEvent.setStartedAtTime(1402965614516);

  console.log("TAGGED_ANNOTATION Annotation Event = " + util.inspect(tagAnnotationEvent));

  // Assert that JSON produced is the same
  jsonCompare('caliperTagAnnotationEvent', tagAnnotationEvent, t);
})
