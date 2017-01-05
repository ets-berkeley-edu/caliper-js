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

var config = require('../../src/config');
var eventFactory = require('../../src/events/eventFactory');
var eventValidator = require('../../src/events/eventValidator');
var eventUtils = require('../../src/events/eventUtils');
var AnnotationEvent = require('../../src/events/annotationEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var SharedAnnotation = require('../../src/entities/annotation/sharedAnnotation');
var CourseSection = require('../../src/entities/lis/courseSection');
var Document = require('../../src/entities/resource/document');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/lis/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Status = require('../../src/entities/lis/status');
var requestUtils = require('../../src/request/requestUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEventAnnotationShared.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('Create an AnnotationEvent (shared) and validate properties', function (t) {

    // Plan for N assertions
    t.plan(2);

    const BASE_IRI = "https://example.edu";
    const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

    // Id
    var uuid = eventUtils.generateUUID(config.version);

    // Check Id
    t.equal(true, eventValidator.isUUID(uuid), "Validate generated UUID.");

    // Override ID with canned value
    uuid = "3bdab9e6-11cd-4a0f-9d09-8e363994176b";

    // The Actor
    var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));

    // The Action
    var action = actions.shared.term;

    // The Object of the interaction
    var obj = entityFactory().create(Document, BASE_IRI.concat("/etexts/201.epub"), {
      name: "IMS Caliper Implementation Guide",
      version: "1.1"
    });

    // Shares
    var sharedWith = [];
    sharedWith.push(entityFactory().create(Person, BASE_IRI.concat("/users/657585")));
    sharedWith.push(entityFactory().create(Person, BASE_IRI.concat("/users/667788")));

    // The Generated annotation
    var generated = entityFactory().create(SharedAnnotation, BASE_IRI.concat("/users/554433/etexts/201/shares/1"), {
      actor: actor,
      annotated: _.omit(obj, [ "name", "dateCreated", "version" ]),
      dateCreated: moment.utc("2016-11-15T10:15:00.000Z"),
      withAgents: sharedWith
    });

    // Event time
    var eventTime = moment.utc("2016-11-15T10:15:00.000Z");

    // The edApp
    var edApp = entityFactory().create(SoftwareApplication, BASE_IRI, { version: "1.2.3" });

    // The Group
    var group = entityFactory().create(CourseSection, BASE_SECTION_IRI, {
      courseNumber: "CPS 435-01",
      academicSession: "Fall 2016"
    });

    // The Actor's Membership
    var membership = entityFactory().create(Membership, BASE_SECTION_IRI.concat("/rosters/1"), {
      member: actor,
      organization: _.omit(group, ["courseNumber", "academicSession"]),
      roles: [Role.learner.term],
      status: Status.active.term,
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
    });

    // Session
    var session = entityFactory().create(Session, BASE_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"), {
      startedAtTime: moment.utc("2016-11-15T10:00:00.000Z")
    });

    // Assert that key attributes are the same
    var event = eventFactory().create(AnnotationEvent, {
      uuid: uuid,
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

    // Compare
    var diff = testUtils.compare(fixture, requestUtils.parse(event));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    ////t.end();
  });
});