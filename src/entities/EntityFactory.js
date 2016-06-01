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

var EntityType = require('./entityType');
var AnnotationType = require('./annotation/annotationType');
var AssignableType = require('./assignable/assignableDigitalResourceType');
var DigitalResourceType = require('./digitalResourceType');
var MediaObjectType = require('./media/mediaObjectType');
var ResponseType = require('./response/responseType');

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

/**
 * Factory for creating entities.
 * @constructor
 */

// Constructor
function EntityFactory() {}

EntityFactory.prototype = {
  create: function(type, id, props) {
    switch(type) {
      case EntityType.AGENT:
        return new Agent(id, props);
      case EntityType.ANNOTATION:
        return new Annotation(id, props);
      case EntityType.ATTEMPT:
        return new Attempt(id, props);
      case EntityType.COURSE_OFFERING:
        return new CourseOffering(id, props);
      case EntityType.COURSE_SECTION:
        return new CourseSection(id, props);
      case EntityType.DIGITAL_RESOURCE:
        return new DigitalResource(id, props);
      case EntityType.GROUP:
        return new Group(id, props);
      case EntityType.LEARNING_OBJECTIVE:
        return new LearningObjective(id, props);
      case EntityType.MEMBERSHIP:
        return new Membership(id, props);
      case EntityType.ORGANIZATION:
        return new Organization(id, props);
      case EntityType.PERSON:
        return new Person(id, props);
      case EntityType.RESPONSE:
        return new Response(id, props);
      case EntityType.RESULT:
        return new Result(id, props);
      case EntityType.SESSION:
        return new Session(id, props);
      case EntityType.SOFTWARE_APPLICATION:
        return new SoftwareApplication(id, props);

      case AnnotationType.BOOKMARK_ANNOTATION:
        return new BookmarkAnnotation(id, props);
      case AnnotationType.HIGHLIGHT_ANNOTATION:
        return new HighlightAnnotation(id, props);
      case AnnotationType.SHARED_ANNOTATION:
        return new SharedAnnotation(id, props);
      case AnnotationType.TAG_ANNOTATION:
        return new TagAnnotation(id, props);

      case AssignableType.ASSESSMENT:
        return new Assessment(id, props);
      case AssignableType.ASSESSMENT_ITEM:
        return new AssessmentItem(id, props);

      case DigitalResourceType.ASSIGNABLE_DIGITAL_RESOURCE:
        return new AssignableDigitalResource(id, props);
      case DigitalResourceType.EPUB_CHAPTER:
        return new EpubChapter(id, props);
      case DigitalResourceType.EPUB_PART:
        return new EpubPart(id, props);
      case DigitalResourceType.EPUB_SUB_CHAPTER:
        return new EpubSubChapter(id, props);
      case DigitalResourceType.EPUB_VOLUME:
        return new EpubVolume(id, props);
      case DigitalResourceType.FRAME:
        return new Frame(id, props);
      case DigitalResourceType.MEDIA_LOCATION:
        return new MediaLocation(id, props);
      case DigitalResourceType.MEDIA_OBJECT:
        return new MediaObject(id, props);
      case DigitalResourceType.READING:
        return new Reading(id, props);
      case DigitalResourceType.WEB_PAGE:
        return new WebPage(id, props);

      case MediaObjectType.AUDIO_OBJECT:
        return new AudioObject(id, props);
      case MediaObjectType.IMAGE_OBJECT:
        return new ImageObject(id, props);
      case MediaObjectType.VIDEO_OBJECT:
        return new VideoObject(id, props);

      case ResponseType.FILLINBLANK:
        return new FillinBlankResponse(id, props);
      case ResponseType.MULTIPLECHOICE:
        return new multipleChoiceResponse(id, props);
      case ResponseType.MULTIPLERESPONSE:
        return new multipleResponseResponse(id, props);
      case ResponseType.SELECTTEXT:
        return new selectTextResponse(id, props);
      case ResponseType.TRUEFALSE:
        return new trueFalseResponse(id, props);

      default:
        return new Entity(id, props);
    }
  }
};

module.exports = EntityFactory;