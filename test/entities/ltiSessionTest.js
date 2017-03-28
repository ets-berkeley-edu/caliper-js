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
var requestorUtils = require('../../src/request/requestorUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEntityLtiSession.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('ltiSessionTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_COM_IRI = "https://example.com";
    const BASE_EDU_IRI = "https://example.edu";

    var actor = entityFactory().create(Person, {id: BASE_EDU_IRI.concat("/users/554433")});

    var required = {
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-2p0",
      resource_link_id: "88391-e1919-bb3456"
    };

    var recommended = {
      context_id: "8213060-006f-27b2066ac545",
      launch_presentation_document_target: "iframe",
      launch_presentation_height: 240,
      launch_presentation_return_url: "https://example.edu/terms/201601/courses/7/sections/1/pages/5",
      launch_presentation_width: 320,
      roles: "Learner,Student",
      tool_consumer_instance_guid: "example.edu",
      user_id: "0ae836b9-7fc9-4060-006f-27b2066ac545"
    };

    var optional = {
      context_type: "CourseSection",
      launch_presentation_locale: "en-US",
      launch_presentation_css_url: "https://example.edu/css/tool.css",
      role_scope_mentor: "f5b2cc6c-8c5c-24e8-75cc-fac5,dc19e42c-b0fe-68b8-167e-4b1a"
    };

    // includes LTI 2.0 deprecated properties (e.g., context_title) with recommended custom_ prefix
    var custom = {
      custom_caliper_session_id: "https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259",
      custom_context_title: "CPS 435 Learning Analytics",
      custom_context_label: "CPS 435",
      custom_resource_link_title: "LTI tool",
      custom_user_image: "https://example.edu/users/554433/profile/avatar.jpg"
    };

    var extensions = {
      "ext_vnd_instructor": {
        "@context": {
          sdo: "http://schema.org/",
          xsd: "http://www.w3.org/2001/XMLSchema#",
          jobTitle: {id: "sdo:jobTitle", type: "xsd:string"},
          givenName: {id: "sdo:givenName", type: "xsd:string"},
          familyName: {id: "sdo:familyName", type: "xsd:string"},
          email: {id: "sdo:email", type: "xsd:string"},
          url: {id: "sdo:url", type: "xsd:string"}
        },
        id: "https://example.edu/faculty/trighaversine",
        type: "Person",
        jobTitle: "Professor",
        givenName: "Trig",
        familyName: "Haversine",
        email: "trighaversine@example.edu",
        url: "https://example.edu/faculty/trighaversine"
      }
    };

    // Compose launchParameters from objects above
    var launchParameters = _.assign({}, required, recommended, optional, custom, extensions);

    var entity = entityFactory().create(LtiSession, {
      id: BASE_COM_IRI.concat("/sessions/b533eb02823f31024e6b7f53436c42fb99b31241"),
      user: actor,
      launchParameters: launchParameters,
      dateCreated: moment.utc("2016-11-15T10:15:00.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:15:00.000Z")
    });

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestorUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});