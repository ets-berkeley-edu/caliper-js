/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

var _ = require('lodash');
var entityType = require('./entityType');
var annotationType = require('./annotation/annotationType');
var assignableType = require('./assignable/assignableDigitalResourceType');
var digitalResourceType = require('./digitalResourceType');
var mediaObjectType = require('./media/mediaObjectType');
var responseType = require('./response/responseType');

var Entity = require('./entity');
var DigitalResource = require('./digitalResource');
var LearningObjective = require('./learningObjective');

var Agent = require('./agent/agent');
var Organization = require('./agent/organization');
var Person = require('./agent/person');
var SoftwareApplication = require('./agent/softwareApplication');

var Annotation = require('./annotation/annotation');
var BookmarkAnnotation = require('./annotation/bookmarkAnnotation');
var HighlightAnnotation = require('./annotation/highlightAnnotation');
var SharedAnnotation = require('./annotation/sharedAnnotation');
var TagAnnotation = require('./annotation/tagAnnotation');

var Assessment = require('./assessment/assessment');
var AssessmentItem = require('./assessment/assessmentItem');

var AssignableDigitalResource = require('./assignable/assignableDigitalResourceType');
var Attempt = require('./assignable/attempt');

var CourseOffering = require('./lis/courseOffering');
var CourseSection = require('./lis/courseSection');
var Group = require('./lis/group');
var Membership = require ('./lis/membership');

var EpubChapter = require('./reading/ePubChapter');
var EpubPart = require('./reading/ePubPart');
var EpubSubChapter = require('./reading/ePubSubChapter');
var EpubVolume = require('./reading/ePubVolume');
var Frame = require('./reading/frame');
var Reading = require('./reading/reading');
var WebPage = require('./reading/webPage');

var MediaLocation = require('./media/mediaLocation');
var MediaObject = require('./media/mediaObject');
var AudioObject = require('./media/audioObject');
var ImageObject = require('./media/imageObject');
var VideoObject = require('./media/videoObject');

var Response = require('./response/response');
var FillinBlankResponse = require('./response/fillinBlankResponse');
var multipleChoiceResponse = require('./response/multipleChoiceResponse');
var multipleResponseResponse = require('./response/multipleResponseResponse');
var selectTextResponse = require('./response/selectTextResponse');
var trueFalseResponse = require('./response/trueFalseresponse');

var Result = require('./outcome/result');
var Session = require('./session/session');


/*
 Factory function designed to mint new Caliper Entity objects.  This is a regular function that does NOT require
 use of the "new" keyword in order to instantiate.  As we want no instanceOf link established between the
 factory function and the objects it creates the prototype property is not utilized.

 To create a Caliper Entity, simply select the appropriate entityType constant and provide a properties object to
 assign to the Entity object, e.g., var entity = entityFactory.create(entityType.ENTITY, properties);
 */
function entityFactory() {
  var factory = _.create(entityFactory.proto);
  return factory;
}

entityFactory.proto = {
  create: function(type, id, props) {
    props = props || {};

    switch(type) {
      case entityType.AGENT:
        return new Agent(id, props);
      case entityType.ANNOTATION:
        return new Annotation(id, props);
      case entityType.ATTEMPT:
        return new Attempt(id, props);
      case entityType.COURSE_OFFERING:
        return new CourseOffering(id, props);
      case entityType.COURSE_SECTION:
        return new CourseSection(id, props);
      case entityType.DIGITAL_RESOURCE:
        return new DigitalResource(id, props);
      case entityType.GROUP:
        return new Group(id, props);
      case entityType.LEARNING_OBJECTIVE:
        return new LearningObjective(id, props);
      case entityType.MEMBERSHIP:
        return new Membership(id, props);
      case entityType.ORGANIZATION:
        return new Organization(id, props);
      case entityType.PERSON:
        return new Person(id, props);
      case entityType.RESPONSE:
        return new Response(id, props);
      case entityType.RESULT:
        return new Result(id, props);
      case entityType.SESSION:
        return new Session(id, props);
      case entityType.SOFTWARE_APPLICATION:
        return new SoftwareApplication(id, props);

      case annotationType.BOOKMARK_ANNOTATION:
        return new BookmarkAnnotation(id, props);
      case annotationType.HIGHLIGHT_ANNOTATION:
        return new HighlightAnnotation(id, props);
      case annotationType.SHARED_ANNOTATION:
        return new SharedAnnotation(id, props);
      case annotationType.TAG_ANNOTATION:
        return new TagAnnotation(id, props);

      case assignableType.ASSESSMENT:
        return new Assessment(id, props);
      case assignableType.ASSESSMENT_ITEM:
        return new AssessmentItem(id, props);

      case digitalResourceType.ASSIGNABLE_DIGITAL_RESOURCE:
        return new AssignableDigitalResource(id, props);
      case digitalResourceType.EPUB_CHAPTER:
        return new EpubChapter(id, props);
      case digitalResourceType.EPUB_PART:
        return new EpubPart(id, props);
      case digitalResourceType.EPUB_SUB_CHAPTER:
        return new EpubSubChapter(id, props);
      case digitalResourceType.EPUB_VOLUME:
        return new EpubVolume(id, props);
      case digitalResourceType.FRAME:
        return new Frame(id, props);
      case digitalResourceType.MEDIA_LOCATION:
        return new MediaLocation(id, props);
      case digitalResourceType.MEDIA_OBJECT:
        return new MediaObject(id, props);
      case digitalResourceType.READING:
        return new Reading(id, props);
      case digitalResourceType.WEB_PAGE:
        return new WebPage(id, props);

      case mediaObjectType.AUDIO_OBJECT:
        return new AudioObject(id, props);
      case mediaObjectType.IMAGE_OBJECT:
        return new ImageObject(id, props);
      case mediaObjectType.VIDEO_OBJECT:
        return new VideoObject(id, props);

      case responseType.FILLINBLANK:
        return new FillinBlankResponse(id, props);
      case responseType.MULTIPLECHOICE:
        return new multipleChoiceResponse(id, props);
      case responseType.MULTIPLERESPONSE:
        return new multipleResponseResponse(id, props);
      case responseType.SELECTTEXT:
        return new selectTextResponse(id, props);
      case responseType.TRUEFALSE:
        return new trueFalseResponse(id, props);

      default:
        return new Entity(id, props);
    }
  }
};

module.exports = entityFactory;