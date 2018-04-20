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

var config = require('../../src/config/config');
var eventFactory = require('../../src/events/eventFactory');
var validator = require('../../src/validators/validator');
var ViewEvent = require('../../src/events/viewEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var CourseSection = require('../../src/entities/agent/courseSection');
var Document = require('../../src/entities/resource/document');
var LtiSession = require('../../src/entities/session/ltiSession');
var Membership = require('../../src/entities/agent/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/agent/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Status = require('../../src/entities/agent/status');
var clientUtils = require('../../src/clients/clientUtils');
var testUtils = require('../testUtils');

var path = config.testFixturesBaseDir.v1p1 + "caliperEventViewViewedFedSession.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('viewEventViewedFedSessionTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    var BASE_IRI = "https://example.edu";
    var BASE_COM_IRI = "https://example.com";
    var BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

    // LTI-related message parameters
    var messageParameters = {
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-1p0",
      context_id: "4f1a161f-59c3-43e5-be37-445ad09e3f76",
      context_type: "urn:lti:context-type:ims/lis/CourseSection",
      context_label: "SI182",
      context_title: "Design of Personal Environments",
      resource_link_id: "6b37a950-42c9-4117-8f4f-03e6e5c88d24",
      roles: [ "urn:lti:role:ims/lis/Learner" ],
      tool_consumer_instance_guid: "SomeLMS.example.edu",
      tool_consumer_instance_description: "Sample University (SomeLMS)",
      user_id: "0ae836b9-7fc9-4060-006f-27b2066ac545",
      custom_xstart: "2016-08-21T01:00:00Z",
      ext_com_somelms_example_course_section_instructor: "https://example.edu/faculty/1234"
    };

    // Id with canned value
    uuid = "urn:uuid:4be6d29d-5728-44cd-8a8f-3d3f07e46b61";

    // The Actor
    var actor = entityFactory().create(Person, {id: BASE_IRI.concat("/users/554433")});

    // The Action
    var action = actions.viewed.term;

    // The Object of the interaction
    var obj = entityFactory().create(Document, {
      id: BASE_COM_IRI.concat("/lti/reader/202.epub"),
      name: "Caliper Case Studies",
      mediaType: "application/epub+zip",
      dateCreated: moment.utc("2016-08-01T09:00:00.000Z")
    });

    // Event time
    var eventTime = moment.utc("2016-11-15T10:20:00.000Z");

    // The edApp
    var edApp = entityFactory().coerce(SoftwareApplication, {id: BASE_COM_IRI});

    // Group
    var group = entityFactory().create(CourseSection, {
      id: BASE_SECTION_IRI,
      extensions: {
        edu_example_course_section_instructor: messageParameters.ext_com_somelms_example_course_section_instructor
      }
    });

    // The Actor's Membership
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
      id: BASE_COM_IRI.concat("/sessions/c25fd3da-87fa-45f5-8875-b682113fa5ee"),
      dateCreated: moment.utc("2016-11-15T10:20:00.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:20:00.000Z")
    });

    var ltiSession = entityFactory().create(LtiSession, {
      id: "urn:uuid:1c519ff7-3dfa-4764-be48-d2fb35a2925a",
      user: actor.id,
      messageParameters: messageParameters,
      dateCreated: moment.utc("2016-11-15T10:15:00.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:15:00.000Z")
    });

    // Assert that key attributes are the same
    var event = eventFactory().create(ViewEvent, {
      id: uuid,
      actor: actor,
      action: action,
      object: obj,
      eventTime: eventTime,
      edApp: edApp,
      group: group,
      membership: membership,
      session: session,
      federatedSession: ltiSession
    });

    // Compare
    var diff = testUtils.compare(fixture, clientUtils.parse(event));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + clientUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});