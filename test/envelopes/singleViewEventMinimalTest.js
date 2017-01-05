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
var Event = require('../../src/events/event');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var Document = require('../../src/entities/resource/document');
var Person = require('../../src/entities/agent/person');
var requestUtils = require('../../src/request/requestUtils');
var testUtils = require('../testUtils');
var requestor = require('../../src/request/httpRequestor');

const path = config.testFixturesBaseDir + "caliperEnvelopeEventViewViewedMinimal.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('Create an Envelope containing single ViewEvent (viewed) and validate properties', function (t) {

    // Plan for N assertions
    t.plan(2);

    const BASE_IRI = "https://example.edu";

    // Id
    var uuid = eventUtils.generateUUID(config.version);

    // Check Id
    t.equal(true, eventValidator.isUUID(uuid), "Generated UUID " + uuid + " failed validation check.");

    // Override ID with canned value
    uuid = "7025d2f8-c76c-44b8-9d98-593d7969177f";

    // The Actor
    var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));

    // The Action
    var action = actions.created.term;

    // The Object of the interaction
    var obj = entityFactory().create(Document, BASE_IRI.concat("/etexts/201.epub"));

    // Event time
    var eventTime = moment.utc("2016-11-15T10:15:00.000Z");

    // Assert that key attributes are the same
    var event = eventFactory().create(Event, {
      uuid: uuid,
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

    var envelope = requestor.createEnvelope(sensor.id, moment.utc("2016-11-15T11:05:01.000Z"), config.dataVersion, event);

    // Compare
    var diff = testUtils.compare(fixture, requestUtils.parse(envelope));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
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