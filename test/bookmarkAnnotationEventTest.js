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
var BookmarkAnnotation = require('../src/entities/annotation/bookmarkAnnotation');
var EPubVolume = require('../src/entities/reading/ePubVolume');
var WebPage = require('../src/entities/WebPage');
var Frame = require('../src/entities/reading/frame');
var SoftwareApplication = require('../src/entities/softwareApplication');
var AnnotationActions = require('../src/actions/annotationActions');

test('Create BookmarkAnnotation Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actor = new Person("https://some-university.edu/user/554433");
  actor.setDateCreated(1402965614516);
  actor.setDateModified(1402965614516);

  // The Action for the Caliper Event
  var action = AnnotationActions.BOOKMARKED;

  // The Object being interacted with by the Actor
  var eventObj = new BookmarkAnnotation("https://someEduApp.edu/bookmarks/00001");
  eventObj.setAnnotationType("BOOKMARK_ANNOTATION");
  eventObj.setDateCreated(1402965614516);
  eventObj.setDateModified(1402965614516);
  eventObj.setBookmarkNotes("The Intolerable Acts (1774)--bad idea Lord North");

  // The Digital Resource that the targetObj (below) belongs to
  var ePub = new EPubVolume("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)");
  ePub.setResourceType("EPUB_VOLUME");
  ePub.setName("The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)");
  ePub.setDateCreated(1402965614516);
  ePub.setDateModified(1402965614516);

  // The target object (frame) within the Event Object
  var targetObj = new Frame("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3/2)");
  targetObj.setResourceType("FRAME");
  targetObj.setName("Key Figures: Lord North");
  targetObj.setDateCreated(1402965614516);
  targetObj.setDateModified(1402965614516);
  targetObj.setIndex(2);
  targetObj.setIsPartOf(ePub);

  // The edApp that is part of the Learning Context
  var edApp = new SoftwareApplication("https://github.com/readium/readium-js-viewer");
  edApp.setName("Readium");
  edApp.setDateCreated(1402965614516);
  edApp.setDateModified(1402965614516);

  // The LIS Course Section for the Caliper Event
  var org = new CourseSection("https://some-university.edu/politicalScience/2014/american-revolution-101");
  org.setName("American Revolution 101");
  org.setDateCreated(1402965614516);
  org.setDateModified(1402965614516);
  org.setCourseNumber("AmRev-101");
  org.setLabel("Am Rev 101");
  org.setSemester("Spring-2014");

  // Asser that key attributes are the same
  var bookmarkAnnotationEvent = new Event();
  bookmarkAnnotationEvent.setActor(actor);
  bookmarkAnnotationEvent.setAction(action);
  bookmarkAnnotationEvent.setObject(eventObj);
  bookmarkAnnotationEvent.setTarget(targetObj);
  bookmarkAnnotationEvent.setEdApp(edApp);
  bookmarkAnnotationEvent.setLisOrganization(org);
  bookmarkAnnotationEvent.setStartedAtTime(1402965614516);

  console.log("Bookmark Annotation Event = " + util.inspect(bookmarkAnnotationEvent));

  // Assert that JSON produced is the same
  jsonCompare('caliperBookmarkAnnotationEvent', bookmarkAnnotationEvent, t);
})
