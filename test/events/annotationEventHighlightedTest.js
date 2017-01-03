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
var moment = require('moment');
var test = require('tape');

var eventFactory = require('../../src/events/eventFactory');
var AnnotationEvent = require('../../src/events/annotationEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var HighlightAnnotation = require('../../src/entities/annotation/highlightAnnotation');
var CourseSection = require('../../src/entities/lis/courseSection');
var Document = require('../../src/entities/resource/document');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/lis/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Status = require('../../src/entities/lis/status');
var TextPositionSelector = require('../../src/entities/annotation/textPositionSelector');

var jsonCompare = require('../testUtils');

test('Create an AnnotationEvent (highlighted) event and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";
  const BASE_ETEXT_IRI = "https://example.edu/etexts/201";
  const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

  // The Actor
  var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));

  // The Action for the Caliper Event
  var action = actions.highlighted.term;

  // The Object of the interaction
  var obj = entityFactory().create(Document, BASE_ETEXT_IRI, {
    name: "IMS Caliper Implementation Guide",
    dateCreated: moment.utc("2016-10-01T06:00:00.000Z"),
    version: "1.1"
  });

  // Event time
  var eventTime = moment.utc("2016-11-15T10:15:00.000Z");

  // The Generated annotation
  var selector = _.assign(_.create(TextPositionSelector), { start: 2300, end: 2370 });
  var generated = entityFactory().create(HighlightAnnotation,
    BASE_IRI.concat("/users/554433/etexts/201/highlights?start=2300&end=2370"), {
    actor: actor,
    annotated: _.omit(obj, [ "name", "dateCreated", "version" ]),
    selection: selector,
    selectionText: "ISO 8601 formatted date and time expressed with millisecond precision.",
    dateCreated: moment.utc("2016-11-15T10:15:00.000Z")
  });

  // The edApp
  var edApp = entityFactory().create(SoftwareApplication, BASE_IRI, { version: "v3" });

  // Group
  var group = entityFactory().create(CourseSection, BASE_SECTION_IRI, {
    courseNumber: "CPS 435-01",
    academicSession: "Fall 2016"
  });

  // The Actor's Membership
  var membership = entityFactory().create(Membership, BASE_SECTION_IRI.concat("/rosters/1"), {
    member: actor,
    organization: _.omit(group, ["courseNumber", "academicSession"]),
    roles: [Role.LEARNER],
    status: Status.ACTIVE,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
  });

  // Session
  var session = entityFactory().create(Session, BASE_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"), {
    startedAtTime: moment.utc("2016-11-15T10:00:00.000Z")
  });

  // Assert that key attributes are the same
  var event = eventFactory().create(AnnotationEvent, {
    actor: actor,
    action: action,
    object: obj,
    eventTime: eventTime,
    generated: generated,
    edApp: edApp,
    group: group,
    membership: membership,
    session: session
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventAnnotationHighlighted', event, t);
});