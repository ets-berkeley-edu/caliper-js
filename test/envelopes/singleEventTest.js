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

var config =  require('../../src/config/config');
var client = require('../../src/httpClient');
var httpOptions = require('../../src/config/httpOptions');
var requestorUtils = require('../../src/request/requestorUtils');

var eventFactory = require('../../src/events/eventFactory');
var validator = require('../../src/validator');
var AssessmentEvent = require('../../src/events/assessmentEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var Attempt = require('../../src/entities/assign/attempt');
var Assessment = require('../../src/entities/resource/assessment');
var CourseSection = require('../../src/entities/lis/courseSection');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/lis/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Status = require('../../src/entities/lis/status');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEnvelopeEventSingle.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('singleEventTest', function (t) {

    // Plan for N assertions
    t.plan(2);

    const BASE_IRI = "https://example.edu";
    const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";
    const BASE_ASSESS_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1";

    // Id
    var uuid = validator.generateUUID(config.uuidVersion);

    // Check Id
    t.equal(true, validator.isUuid(uuid), "Generated UUID " + uuid + " failed validation check.");

    // Override ID with canned value
    id = "urn:uuid:" + "c51570e4-f8ed-4c18-bb3a-dfe51b2cc594";

    // The Actor
    var actor = entityFactory().create(Person, {id: BASE_IRI.concat("/users/554433")});

    // The Action
    var action = actions.started.term;

    // The Object of the interaction
    var obj = entityFactory().create(Assessment, {
      id: BASE_ASSESS_IRI,
      name: "Quiz One",
      dateToStartOn: moment.utc("2016-11-14T05:00:00.000Z"),
      dateToSubmit: moment.utc("2016-11-18T11:59:59.000Z"),
      maxAttempts: 2,
      maxSubmits: 2,
      maxScore: 25,
      version: "1.0"
    });

    // Event time
    var eventTime = moment.utc("2016-11-15T10:15:00.000Z");

    // Generated Attempt
    var generated = entityFactory().create(Attempt, {
      id: BASE_ASSESS_IRI.concat("/users/554433/attempts/1"),
      assignee: actor.id,
      assignable: obj.id,
      dateCreated: moment.utc("2016-11-15T10:15:00.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:15:00.000Z"),
      count: 1
    });

    // The edApp
    var edApp = entityFactory().create(SoftwareApplication, {id: BASE_IRI, version: "v2"});

    // Group
    var group = entityFactory().create(CourseSection, {
      id: BASE_SECTION_IRI,
      courseNumber: "CPS 435-01",
      academicSession: "Fall 2016"
    });

    // Membership
    var membership = entityFactory().create(Membership, {
      id: BASE_SECTION_IRI.concat("/rosters/1"),
      member: actor.id,
      organization: group.id,
      roles: [Role.learner.term],
      status: Status.active.term,
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
    });

    // Session
    var session = entityFactory().create(Session, {
      id: BASE_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"),
      startedAtTime: moment.utc("2016-11-15T10:00:00.000Z")
    });

    // Assert that key attributes are the same
    var event = eventFactory().create(AssessmentEvent, {
      id: id,
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

    // Initialize client
    var sensorClient = _.create(client);
    sensorClient.init(BASE_IRI.concat("/sensors/1"));
    var envelope = sensorClient.createEnvelope({sendTime: moment.utc("2016-11-15T11:05:01.000Z"), data: event});

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(envelope));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestorUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});