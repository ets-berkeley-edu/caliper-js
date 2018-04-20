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
var ToolLaunchEvent = require('../../src/events/toolLaunchEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var CourseSection = require('../../src/entities/agent/courseSection');
var LtiSession = require('../../src/entities/session/ltiSession');
var Membership = require('../../src/entities/agent/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/agent/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var WebPage = require('../../src/entities/resource/webPage');

var Status = require('../../src/entities/agent/status');
var clientUtils = require('../../src/clients/clientUtils');
var testUtils = require('../testUtils');

var path = config.testFixturesBaseDir.v1p1 + "caliperEventToolLaunchLaunched.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;
  
  test('toolLaunchEventLaunchedTest', function (t) {
    
    // Plan for N assertions
    t.plan(1);
    
    var BASE_EDU_IRI = "https://example.edu";
    var BASE_COM_IRI = "https://example.com";
    var BASE_SECTION_IRI = "https://example.edu/terms/201801/courses/7/sections/1";
    
    // Id with canned value
    uuid = "urn:uuid:a2e8b214-4d4a-4456-bb4c-099945749117";
    
    // The Actor
    var actor = entityFactory().create(Person, {id: BASE_EDU_IRI.concat("/users/554433")});
    
    // The Action
    var action = actions.launched.term;
    
    // The Object of the interaction
    var obj = entityFactory().create(SoftwareApplication, {id: BASE_COM_IRI.concat("/lti/tool")});
    
    // Event time
    var eventTime = moment.utc("2018-11-15T10:15:00.000Z");
    
    // edApp
    var edApp = entityFactory().create(SoftwareApplication, {id: BASE_EDU_IRI});
    
    // Referrer
    var referrer = entityFactory().create(WebPage, {id: BASE_SECTION_IRI.concat("/pages/1")});
    
    // Group
    var group = entityFactory().create(CourseSection, {
      id: BASE_SECTION_IRI,
      courseNumber: "CPS 435-01",
      academicSession: "Fall 2018"
    });
    
    // The Actor's Membership
    var membership = entityFactory().create(Membership, {
      id: BASE_SECTION_IRI.concat("/rosters/1"),
      member: actor.id,
      organization: group.id,
      roles: [Role.learner.term],
      status: Status.active.term,
      dateCreated: moment.utc("2018-08-01T06:00:00.000Z")
    });
    
    // Session
    var session = entityFactory().create(Session, {
      id: BASE_EDU_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"),
      startedAtTime: moment.utc("2018-11-15T10:00:00.000Z")
    });
    
    // LTI-related message parameters
    var messageParameters = {
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-1p0",
      context_id: "https://example.edu/terms/201801/courses/7/sections/1",
      context_type: "urn:lti:context-type:ims/lis/CourseSection",
      context_label: "CPS 435-01",
      context_title: "CPS 435 Learning Analytics, Section 01",
      resource_link_id: "6b37a950-42c9-4117-8f4f-03e6e5c88d24",
      roles: [ "urn:lti:role:ims/lis/Learner" ],
      tool_consumer_instance_guid: "SomeLMS.example.edu",
      tool_consumer_instance_description: "Sample University (SomeLMS)",
      user_id: "0ae836b9-7fc9-4060-006f-27b2066ac545",
      custom_xstart: "2016-08-21T01:00:00Z",
      custom_caliper_profile_url: "https://example.edu/lti/tc/cps",
      custom_caliper_session_id: "1c519ff7-3dfa-4764-be48-d2fb35a2925a",
      ext_com_somelms_example_course_section_instructor: "https://example.edu/faculty/1234"
    };
    
    // Federated Session
    var federatedSession = entityFactory().create(LtiSession, {
      id: "https://example.edu/lti/sessions/b533eb02823f31024e6b7f53436c42fb99b31241",
      user: actor,
      messageParameters: messageParameters,
      dateCreated: moment.utc("2018-11-15T10:15:00.000Z"),
      startedAtTime: moment.utc("2018-11-15T10:15:00.000Z")
    });
    
    // Assert that key attributes are the same
    var event = eventFactory().create(ToolLaunchEvent, {
      id: uuid,
      actor: actor,
      action: action,
      object: obj,
      eventTime: eventTime,
      edApp: edApp,
      referrer: referrer,
      group: group,
      membership: membership,
      session: session,
      federatedSession: federatedSession
    });
    
    // Compare
    var diff = testUtils.compare(fixture, clientUtils.parse(event));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + clientUtils.stringify(diff) : "");
    
    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});