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

var eventFactory = require('../../src/events/eventFactory');
var SessionEvent = require('../../src/events/sessionEvent');
var SessionActions = require('../../src/actions/sessionActions');

var entityFactory = require('../../src/entities/entityFactory');
var Person = require('../../src/entities/agent/person');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');

var jsonCompare = require('../testUtils');

test('Create a SessionEvent (loggedIn) with extensions and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";

  // The Actor
  var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));

  // The Action
  var action = SessionActions.LOGGED_IN;

  // The Object of the interaction
  var obj = entityFactory().create(SoftwareApplication, BASE_IRI, { version: "v2" });

  // Event time
  var eventTime = moment.utc("2016-11-15T20:11:15.000Z");

  // Session
  var session = entityFactory().create(Session, BASE_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"), {
    actor: actor,
    dateCreated: eventTime,
    startedAtTime: eventTime
  });

  // Custom extension: request
  var request = {
    "requestId": "d71016dc-ed2f-46f9-ac2c-b93f15f38fdc",
    "hostname": "example.com",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36"
  };

  // Custom extension: GeoLocation
  var geo = {
    "@context": {
      id: "@id",
      type: "@type",
      sdo: "http://schema.org",
      xsd: "http://www.w3.org/2001/XMLSchema#",
      GeoCoordinates: "sdo:GeoCoordinates",
      latitude: { id: "sdo:latitude", type: "xsd:decimal" },
      longitude: { id: "sdo:longitude", type: "xsd:decimal" }
    },
    id: "https://example.com/maps/@42.27611,-83.73778,19z",
    type: "GeoCoordinates",
    latitude: 42.2761100,
    longitude: -83.7377800
  };

  var extensions = [];
  extensions.push(request);
  extensions.push(geo);

  // Event Id GUID
  var eventId = "965668d1-c051-4b86-97bb-eb3ff12f384f";

  // Assert that key attributes are the same
  var event = eventFactory().create(SessionEvent, {
    uuid: eventId,
    actor: actor,
    action: action,
    object: obj,
    eventTime: eventTime,
    session: session,
    extensions: extensions
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventSessionLoggedInExtended', event, t);
});