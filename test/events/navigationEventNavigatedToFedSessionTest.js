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
var NavigationEvent = require('../../src/events/navigationEvent');
var NavigationActions = require('../../src/actions/navigationActions');

var entityFactory = require('../../src/entities/entityFactory');
var CourseSection = require('../../src/entities/lis/courseSection');
var Document = require('../../src/entities/resource/document');
var LtiSession = require('../../src/entities/session/ltiSession');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/lis/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var WebPage = require('../../src/entities/resource/webPage');
var Status = require('../../src/entities/lis/status');

var jsonCompare = require('../testUtils');

test('Create a NavigationEvent (navigatedTo) with a Federated Session and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";
  const BASE_COM_IRI = "https://example.com";
  const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

  // The Actor
  var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));

  // The Action
  var action = NavigationActions.NAVIGATED_TO;

  // The Object of the interaction
  var obj = entityFactory().create(Document, BASE_COM_IRI.concat("/lti/reader/202.epub"), {
    name: "Caliper Case Studies",
    mediaType: "application/epub+zip",
    dateCreated: moment.utc("2016-08-01T09:00:00.000Z")
  });

  // Event time
  var eventTime = moment.utc("2016-11-15T10:15:00.000Z");

  // Referring resource
  var referrer = entityFactory().create(WebPage, BASE_SECTION_IRI.concat("/pages/4"));

  // The edApp
  var edApp = entityFactory().create(SoftwareApplication, BASE_COM_IRI);

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
  var session = entityFactory().create(Session, BASE_COM_IRI.concat("/sessions/b533eb02823f31024e6b7f53436c42fb99b31241"), {
    startedAtTime: moment.utc("2016-11-15T10:00:00.000Z")
  });

  var ltiRequired = {
    lti_message_type: "basic-lti-launch-request",
    lti_version: "LTI-2p0",
    resource_link_id: "88391-e1919-bb3456"
  };

  var ltiRecommended = {
    context_id: "8213060-006f-27b2066ac545",
    launch_presentation_document_target: "iframe",
    launch_presentation_height: 240,
    launch_presentation_return_url: "https://example.edu/terms/201601/courses/7/sections/1/pages/5",
    launch_presentation_width: 320,
    roles: "Learner,Student",
    tool_consumer_instance_guid: "example.edu",
    user_id: "0ae836b9-7fc9-4060-006f-27b2066ac545"
  };

  var ltiOptional = {
    context_type: "CourseSection",
    launch_presentation_locale: "en-US",
    launch_presentation_css_url: "https://example.edu/css/tool.css",
    role_scope_mentor: "f5b2cc6c-8c5c-24e8-75cc-fac5,dc19e42c-b0fe-68b8-167e-4b1a"
  };

  // includes LTI 2.0 deprecated properties (e.g., context_title) with recommended custom_ prefix
  var ltiCustom = {
    custom_caliper_session_id: "https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259",
    custom_context_title: "CPS 435 Learning Analytics",
    custom_context_label: "CPS 435",
    custom_resource_link_title: "LTI tool",
    custom_user_image: "https://example.edu/users/554433/profile/avatar.jpg"
  };

  var ltiExtensions = {
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
  var launchParameters = _.assign({}, ltiRequired, ltiRecommended, ltiOptional, ltiCustom, ltiExtensions);

  var ltiSession = entityFactory().create(LtiSession, BASE_COM_IRI.concat("/sessions/b533eb02823f31024e6b7f53436c42fb99b31241"), {
    actor: actor,
    launchParameters: launchParameters,
    dateCreated: moment.utc("2016-11-15T10:15:00.000Z"),
    startedAtTime: moment.utc("2016-11-15T10:15:00.000Z")
  });

  // Assert that key attributes are the same
  var event = eventFactory().create(NavigationEvent, {
    actor: actor,
    action: action,
    object: obj,
    eventTime: eventTime,
    referrer: referrer,
    edApp: edApp,
    group: group,
    membership: membership,
    session: session,
    federatedSession: ltiSession
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventNavigationNavigatedToFedSession', event, t);
});