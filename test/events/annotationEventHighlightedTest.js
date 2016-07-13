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

var moment = require('moment');
var test = require('tape');
var _ = require('lodash');
var util = require('util');
var jsonCompare = require('../testUtils');

// Event
var AnnotationEvent = require('../../src/events/annotationEvent');
var eventFactory = require('../../src/events/eventFactory');

// Entity
var entityFactory = require('../../src/entities/entityFactory');
var HighlightAnnotation = require('../../src/entities/annotation/highlightAnnotation');
var CourseOffering = require('../../src/entities/lis/courseOffering');
var CourseSection = require('../../src/entities/lis/courseSection');
var EpubVolume = require('../../src/entities/resource/ePubVolume');
var Frame = require('../../src/entities/resource/frame');
var Group = require('../../src/entities/lis/group');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var SoftwareApplication = require('../../src/entities/agent/SoftwareApplication');

// Action
var AnnotationActions = require('../../src/actions/annotationActions');

var Role = require('../../src/entities/lis/role');
var Status = require('../../src/entities/lis/status');

test('Create an AnnotationEvent (highlighted) event and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_COURSE_IRI = "https://example.edu/politicalScience/2015/american-revolution-101";
  const BASE_EPUB_IRI = "https://example.com/viewer/book/34843";

  // The Actor for the Caliper Event
  var actorId = "https://example.edu/user/554433";
  var actor = entityFactory().create(Person, actorId, {
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2015-09-02T11:30:00.000Z")
  });

  // The Action for the Caliper Event
  var action = AnnotationActions.HIGHLIGHTED;

  var ePub = entityFactory().create(EpubVolume, BASE_EPUB_IRI.concat("#epubcfi(/4/3)"), {
    name: "The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)",
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2015-09-02T11:30:00.000Z"),
    version: "2nd ed."
  });

  // The Object of the interaction
  var obj = entityFactory().create(Frame, BASE_EPUB_IRI.concat("#epubcfi(/4/3/1)"), {
    name: "Key Figures: George Washington",
    isPartOf: ePub,
    index: 1,
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2015-09-02T11:30:00.000Z"),
    version: ePub.version
  });

  // The Generated annotation
  var generatedId = "https://example.edu/highlights/12345";
  var generated = entityFactory().create(HighlightAnnotation, generatedId, {
    actor: actor['@id'],
    annotated: obj['@id'],
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2015-09-02T11:30:00.000Z"),
    selection: { "start": "455", "end": "489" },
    selectionText: "Life, Liberty and the pursuit of Happiness"
  });

  // The edApp
  var edAppId = "https://example.com/viewer";
  var edApp = entityFactory().create(SoftwareApplication, edAppId, {
    name: "ePub",
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2015-09-02T11:30:00.000Z"),
    version: "1.2.3"
  });

  // LIS Course Offering
  var course = entityFactory().create(CourseOffering, BASE_COURSE_IRI, {
    name: "Political Science 101: The American Revolution",
    courseNumber: "POL101",
    academicSession: "Fall-2015",
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2015-09-02T11:30:00.000Z")
  });

  // LIS Course Section
  var sectionId = BASE_COURSE_IRI.concat("/section/001");
  var section = entityFactory().create(CourseSection, sectionId, {
    name: "American Revolution 101",
    courseNumber: "POL101",
    academicSession: "Fall-2015",
    subOrganizationOf: course,
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2015-09-02T11:30:00.000Z")
  });

  // LIS Group
  var groupId = sectionId.concat("/group/001");
  var group = entityFactory().create(Group, groupId, {
    name: "Discussion Group 001",
    subOrganizationOf: section,
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z")
  });

  // The Actor's Membership
  var membershipId = BASE_COURSE_IRI.concat("/roster/554433");
  var membership = entityFactory().create(Membership, membershipId, {
    name: "American Revolution 101",
    description: "Roster entry",
    member: actor['@id'],
    organization: section['@id'],
    roles: [Role.LEARNER],
    status: Status.ACTIVE,
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z")
  });

  // Assert that key attributes are the same
  var event = eventFactory().create(AnnotationEvent, {
    actor: actor,
    action: action,
    object: obj,
    eventTime: moment.utc("2015-09-15T10:15:00.000Z"),
    generated: generated,
    edApp: edApp,
    group: group,
    membership: membership
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventAnnotationHighlighted', event, t);
});