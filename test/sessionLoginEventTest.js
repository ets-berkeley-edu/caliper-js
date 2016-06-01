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
var EventFactory = require('../src/events/eventFactory');
var EventType = require('../src/events/eventType');

// Entity
var EntityFactory = require('../src/entities/entityFactory');
var EntityType = require('../src/entities/entityType');
var DigitalResourceType = require('../src/entities/digitalResourceType');

// Action
var SessionActions = require('../src/actions/sessionActions');

var Role = require('../src/entities/lis/role');
var Status = require('../src/entities/lis/status');

test('Create Session LOGIN Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  var entityFactory = new EntityFactory();

  // The Actor for the Caliper Event (as well as the edApp)
  var actorId = "https://example.edu/user/554433";
  var actor = entityFactory.create(EntityType.PERSON, actorId, {
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString()
  });

  // The Action for the Caliper Event
  var action = SessionActions.LOGGED_IN;

  // The Object being interacted with by the Actor
  var objId = "https://example.com/viewer";
  var obj = entityFactory.create(EntityType.SOFTWARE_APPLICATION, objId, {
    name: "ePub",
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString(),
    version: "1.2.3"
  });

  // Generated session
  var generatedId = "https://example.com/viewer/session-123456789";
  var generated = entityFactory.create(EntityType.SESSION, generatedId, {
    name: "session-123456789",
    actor: actor,
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString(),
    startedAtTime: new Date("2015-09-15T10:15:00Z").toISOString()
  });

  // ePub parent
  var ePubId = "https://example.com/viewer/book/34843#epubcfi(/4/3)";
  var ePub = entityFactory.create(DigitalResourceType.EPUB_VOLUME, ePubId, {
    name: "The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)",
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString(),
    version: "2nd ed."
  });

  // The target object (frame) within the Event Object
  var targetId = "https://example.com/viewer/book/34843#epubcfi(/4/3/1)";
  var target = entityFactory.create(DigitalResourceType.FRAME, targetId, {
    name: "Key Figures: George Washington",
    isPartOf: ePub,
    index: 1,
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString(),
    version: ePub.version
  });

  // The edApp
  var edAppId = "https://example.com/viewer";
  var edApp = entityFactory.create(EntityType.SOFTWARE_APPLICATION, edAppId, {
    name: "ePub",
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString(),
    version: "1.2.3"
  });

  // LIS Course Offering
  var courseId = "https://example.edu/politicalScience/2015/american-revolution-101";
  var courseOffering = entityFactory.create(EntityType.COURSE_OFFERING, courseId, {
    name: "Political Science 101: The American Revolution",
    courseNumber: "POL101",
    academicSession: "Fall-2015",
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString()
  });

  // LIS Course Section
  var courseSectionId = courseOffering['@id'] + "/section/001";
  var courseSection = entityFactory.create(EntityType.COURSE_SECTION, courseSectionId, {
    name: "American Revolution 101",
    courseNumber: "POL101",
    academicSession: "Fall-2015",
    subOrganizationOf: courseOffering,
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString()
  });

  // LIS Group
  var groupId = courseSection['@id'] + "/group/001";
  var group = entityFactory.create(EntityType.GROUP, groupId, {
    name: "Discussion Group 001",
    subOrganizationOf: courseSection,
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString()
  });

  // The Actor's Membership
  var membershipId = courseOffering['@id'] + "/roster/554433";
  var membership = entityFactory.create(EntityType.MEMBERSHIP, membershipId, {
    name: "American Revolution 101",
    description: "Roster entry",
    member: actor['@id'],
    organization: courseSection['@id'],
    roles: [Role.LEARNER],
    status: Status.ACTIVE,
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString()
  });

  // Assert that key attributes are the same
  var event = new EventFactory().create(EventType.SESSION, {
    sourcedId: "15128c13-ca75-4952-8cce-72a513ec337d",
    actor: actor,
    action: action,
    obj: obj,
    eventTime: new Date("2015-09-15T10:15:00Z").toISOString(),
    generated: generated,
    target: target,
    edApp: edApp,
    group: group,
    membership: membership
  });

  console.log("Session Event = " + util.inspect(event));

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventSessionLoggedIn', event, t);
});