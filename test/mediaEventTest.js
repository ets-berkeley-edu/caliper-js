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

var test = require('tape');
var _ = require('lodash');
var util = require('util');
var jsonCompare = require('./testUtils');

// Event
var mediaEvent = require('../src/events/mediaEvent');
var EventType = require('../src/events/eventType');

// Entity
var entityFactory = require('../src/entities/entityFactory');
var EntityType = require('../src/entities/entityType');
var MediaObjectType = require('../src/entities/media/mediaObjectType');
var DigitalResourceType = require('../src/entities/digitalResourceType');

// Action
var MediaActions = require('../src/actions/mediaActions');

var Role = require('../src/entities/lis/role');
var Status = require('../src/entities/lis/status');

test('Create Media Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actorId = "https://example.edu/user/554433";
  var actor = entityFactory().create(EntityType.PERSON, actorId, {
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString()
  });

  // The Action for the Caliper Event
  var action = MediaActions.PAUSED;

  // Learning Objective
  var learningObjectiveId = "https://example.edu/american-revolution-101/personalities/learn";
  var learningObjective = entityFactory().create(EntityType.LEARNING_OBJECTIVE, learningObjectiveId, {
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString()
  });

  // The Object of the interaction
  var objId = "https://example.com/super-media-tool/video/1225";
  var obj = entityFactory().create(MediaObjectType.VIDEO_OBJECT, objId, {
    name: "American Revolution - Key Figures Video",
    mediaType: "video/ogg",
    duration: "PT1H12M27S",
    alignedLearningObjective: [learningObjective],
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString(),
    version: "1.0"
  });

  // The target location
  var targetId = "https://example.com/super-media-tool/video/1225";
  var target = entityFactory().create(DigitalResourceType.MEDIA_LOCATION, targetId, {
    currentTime: "PT30M54S",
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    version: "1.0"
  });

  // The edApp
  var edAppId = "https://example.com/super-media-tool";
  var edApp = entityFactory().create(EntityType.SOFTWARE_APPLICATION, edAppId, {
    name: "Super Media Tool",
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString(),
    version: "Version 2"
  });

  // LIS Course Offering
  var courseId = "https://example.edu/politicalScience/2015/american-revolution-101";
  var courseOffering = entityFactory().create(EntityType.COURSE_OFFERING, courseId, {
    name: "Political Science 101: The American Revolution",
    courseNumber: "POL101",
    academicSession: "Fall-2015",
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString()
  });

  // LIS Course Section
  var courseSectionId = courseOffering['@id'] + "/section/001";
  var courseSection = entityFactory().create(EntityType.COURSE_SECTION, courseSectionId, {
    name: "American Revolution 101",
    courseNumber: "POL101",
    academicSession: "Fall-2015",
    subOrganizationOf: courseOffering,
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString()
  });

  // LIS Group
  var groupId = courseSection['@id'] + "/group/001";
  var group = entityFactory().create(EntityType.GROUP, groupId, {
    name: "Discussion Group 001",
    subOrganizationOf: courseSection,
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString()
  });

  // The Actor's Membership
  var membershipId = courseOffering['@id'] + "/roster/554433";
  var membership = entityFactory().create(EntityType.MEMBERSHIP, membershipId, {
    name: "American Revolution 101",
    description: "Roster entry",
    member: actor['@id'],
    organization: courseSection['@id'],
    roles: [Role.LEARNER],
    status: Status.ACTIVE,
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString()
  });

  // Assert that key attributes are the same
  var event = mediaEvent().create({
    actor: actor,
    action: action,
    object: obj,
    eventTime: new Date("2015-09-15T10:15:00Z").toISOString(),
    target: target,
    edApp: edApp,
    group: group,
    membership: membership
  });

  console.log("Media Event = " + util.inspect(event));

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventMediaPausedVideo', event, t);
});