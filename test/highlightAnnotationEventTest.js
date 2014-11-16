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
var HighlightAnnotation = require('../src/entities/annotation/highlightAnnotation');
var EPubVolume = require('../src/entities/reading/ePubVolume');
var WebPage = require('../src/entities/WebPage');
var Frame = require('../src/entities/reading/frame');
var SoftwareApplication = require('../src/entities/softwareApplication');
var AnnotationActions = require('../src/actions/annotationActions');

test('Create HighlightAnnotation Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actor = new Person("https://some-university.edu/user/554433");
  actor.setLastModifiedTime(1402965614516);

  // The Action for the Caliper Event
  var action = AnnotationActions.HIGHLIGHTED;

  // The Object being interacted with by the Actor
  var eventObj = new HighlightAnnotation("https://someEduApp.edu/highlights/12345");
  eventObj.setAnnotationType("HIGHLIGHT_ANNOTATION");
  eventObj.setLastModifiedTime(1402965614516);
  eventObj.setSelection({
    "start": "455",
    "end": "489"
  });
  eventObj.setSelectionText("Life, Liberty and the pursuit of Happiness");

  // The Digital Resource that the targetObj (below) belongs to
  var ePub = new EPubVolume("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3)");
  ePub.setResourceType("EPUB_VOLUME");
  ePub.setName("The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)");
  ePub.setLastModifiedTime(1402965614516);

  // The target object (frame) within the Event Object
  var targetObj = new Frame("https://github.com/readium/readium-js-viewer/book/34843#epubcfi(/4/3/1)");
  targetObj.setResourceType("FRAME");
  targetObj.setName("Key Figures: George Washington");
  targetObj.setLastModifiedTime(1402965614516);
  targetObj.setIndex(1);
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
  var hilightAnnotationEvent = new Event();
  hilightAnnotationEvent.setActor(actor);
  hilightAnnotationEvent.setAction(action);
  hilightAnnotationEvent.setObject(eventObj);
  hilightAnnotationEvent.setTarget(targetObj);
  hilightAnnotationEvent.setEdApp(edApp);
  hilightAnnotationEvent.setLisOrganization(org);
  hilightAnnotationEvent.setStartedAtTime(1402965614516);

  console.log("Highlight Annotation Event = " + util.inspect(hilightAnnotationEvent));

  // Assert that JSON produced is the same
  jsonCompare('caliperHighlightAnnotationEvent', hilightAnnotationEvent, t);
})
