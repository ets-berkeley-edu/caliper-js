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
var Event = require('../../src/events/Event');
var Actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var Document = require('../../src/entities/resource/document');
var Person = require('../../src/entities/agent/person');

var jsonCompare = require('../testUtils');
var requestor = require('../../src/request/httpRequestor');

test('Create an Envelope containing single ViewEvent (viewed) and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";

  // The Actor
  var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));

  // The Action
  var action = Actions.CREATED;

  // The Object of the interaction
  var obj = entityFactory().create(Document, BASE_IRI.concat("/etexts/201.epub"));

  // Event time
  var eventTime = moment.utc("2016-11-15T10:15:00.000Z");

  // Assert that key attributes are the same
  var event = eventFactory().create(Event, {
    actor: actor,
    action: action,
    object: obj,
    eventTime: eventTime
  });

  // Initialize faux sensor and default options
  var sensor = createFauxSensor(BASE_IRI.concat("/sensors/1"));
  var options = {};

  // Initialize requestor, create envelope and reset sendTime with fixture value (or test will fail).
  requestor.initialize(options);

  var sendTime = moment.utc("2016-11-15T11:05:01.000Z");
  var envelope = requestor.createEnvelope(sensor, sendTime, event);

  // Assert that JSON produced is the same
  jsonCompare('caliperEnvelopeEventViewViewedMinimal', envelope, t);
});

/**
 * Create a fake sensor object in order to avoid generating a "window is not defined"
 * reference error since we are not running tests in the browser but on the server.
 * @param id
 * @returns {{id: *}}
 */
function createFauxSensor(id) {
  return {id: id};
}








/**
 {
  "sensor": "https://example.edu/sensors/1",
  "sendTime": "2016-11-15T11:05:01.000Z",
  "data": [
    {
      "@context": "http://purl.imsglobal.org/ctx/caliper/v1/Context",
      "@type": "http://purl.imsglobal.org/caliper/v1/Event",
      "actor": {
        "@id": "https://example.edu/users/554433",
        "@type": "http://purl.imsglobal.org/caliper/v1/Person"
      },
      "action": "http://purl.imsglobal.org/vocab/caliper/v1/action#Viewed",
      "object": {
        "@id": "https://example.edu/etexts/201.epub",
        "@type": "http://purl.imsglobal.org/caliper/v1/Document"
      },
      "eventTime": "2016-11-15T10:15:00.000Z"
    }
  ]
}
 */