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
var sessionEvent = require('../src/events/sessionEvent');

// Entity
var entityFactory = require('../src/entities/entityFactory');
var EntityType = require('../src/entities/entityType');

// Action
var SessionActions = require('../src/actions/sessionActions');

test('Create Session TIMEOUT Event and validate attributes', function(t) {

  // Plan for N assertions
  t.plan(1);

  // The actor
  var actorId = "https://example.com/viewer";
  var actor = entityFactory().create(EntityType.SOFTWARE_APPLICATION, actorId, {
    name: "ePub",
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString(),
    version: "1.2.3"
  });

  // The Action for the Caliper Event
  var action = SessionActions.TIMED_OUT;

  // The session actor
  var sessionActorId = "https://example.edu/user/554433";
  var sessionActor = entityFactory().create(EntityType.PERSON, sessionActorId, {
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString()
  });

  // The session object
  var objId = "https://example.com/viewer/session-123456789";
  var obj = entityFactory().create(EntityType.SESSION, objId, {
    name: "session-123456789",
    actor: sessionActor,
    dateCreated: new Date("2015-08-01T06:00:00Z").toISOString(),
    dateModified: new Date("2015-09-02T11:30:00Z").toISOString(),
    startedAtTime: new Date("2015-09-15T10:15:00Z").toISOString(),
    endedAtTime: new Date("2015-09-15T11:05:00Z").toISOString(),
    duration: "PT3000S"
  });

  // For this event the edApp is the actor
  var edApp = actor;

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

  // Assert that key attributes are the same
  var event = sessionEvent().create({
    sourcedId: "15128c13-ca75-4952-8cce-72a513ec337d",
    actor: actor,
    action: action,
    object: obj,
    eventTime: new Date("2015-09-15T10:15:00Z").toISOString(),
    edApp: edApp,
    group: group
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventSessionTimedOut', event, t);
});