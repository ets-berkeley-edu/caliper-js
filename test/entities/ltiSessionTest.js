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
var entityFactory = require('../../src/entities/entityFactory');
var Person = require('../../src/entities/agent/person');
var LtiSession = require('../../src/entities/session/ltiSession');
var clientUtils = require('../../src/clients/clientUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir.v1p1 + "caliperEntityLtiSession.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('ltiSessionTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_COM_IRI = "https://example.com";
    const BASE_EDU_IRI = "https://example.edu";
    
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

    var actor = entityFactory().create(Person, {id: BASE_EDU_IRI.concat("/users/554433")});

    var entity = entityFactory().create(LtiSession, {
      id: BASE_EDU_IRI.concat("/lti/sessions/b533eb02823f31024e6b7f53436c42fb99b31241"),
      user: actor,
      messageParameters: messageParameters,
      dateCreated: moment.utc("2018-11-15T10:15:00.000Z"),
      startedAtTime: moment.utc("2018-11-15T10:15:00.000Z")
    });

    // Compare
    var diff = testUtils.compare(fixture, clientUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + clientUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});