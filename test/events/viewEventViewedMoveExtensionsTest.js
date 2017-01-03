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
var ViewEvent = require('../../src/events/viewEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var CourseSection = require('../../src/entities/lis/courseSection');
var Document = require('../../src/entities/resource/document');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/lis/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');

var Status = require('../../src/entities/lis/status');

var jsonCompare = require('../testUtils');

/**
test('Create a ViewEvent (viewed) moving top-level custom properties to extensions and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";
  const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

  // The Actor
  var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));

  // The Action
  var action = actions.viewed.term;

  // The Object of the interaction
  var obj = entityFactory().create(Document, BASE_IRI.concat("/etexts/200.epub"), {
    name: "IMS Caliper Specification",
    version: "1.1"
  });

  // Event time
  var eventTime = moment.utc("2016-11-15T10:15:00.000Z");

  // The edApp
  var edApp = entityFactory().create(SoftwareApplication, BASE_IRI);

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

  // Custom extension appended to the event as a top-level property (move to extensions)
  var chron = {
    "@context": {
      "@vocab": "http://example.edu/ctx/edu.jsonld"
    },
    job: {
      id: "https://example.edu/data/jobs/08c1233d-9ba3-40ac-952f-004c47a50ff7",
      type: "ChronJob",
      jobTag: "caliper",
      jobDate: moment.utc("2016-11-16T01:01:00.000Z")
    }
  };

  // Assert that key attributes are the same
  var event = eventFactory().create(ViewEvent, {
    actor: actor,
    action: action,
    object: obj,
    eventTime: eventTime,
    edApp: edApp,
    group: group,
    membership: membership,
    session: session,
    job: chron
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventViewViewedExtended', event, t);
});
 */