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
var SessionEvent = require('../../src/events/sessionEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var Person = require('../../src/entities/agent/person');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var clientUtils = require('../../src/clients/clientUtils');
var testUtils = require('../testUtils');

var path = config.testFixturesBaseDir.v1p1 + "caliperEventSessionTimedOut.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('sessionEventTimedOutTest', function(t) {

    // Plan for N assertions
    t.plan(1);

    var BASE_IRI = "https://example.edu";

    // Id with canned value
    uuid = "urn:uuid:4e61cf6c-ffbe-45bc-893f-afe7ad4079dc";

    // The Actor
    var actor = entityFactory().create(SoftwareApplication, {id: BASE_IRI});

    // The Action
    var action = actions.timedOut.term;

    // The Object of the interaction
    var obj = entityFactory().create(Session, {
      id: BASE_IRI.concat("/sessions/7d6b88adf746f0692e2e873308b78c60fb13a864"),
      user: entityFactory().create(Person, {id: BASE_IRI.concat("/users/112233")}),
      dateCreated: moment.utc("2016-11-15T10:15:00.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:15:00.000Z"),
      endedAtTime: moment.utc("2016-11-15T11:15:00.000Z"),
      duration: "PT3600S"
    });

    // Event time
    var eventTime = moment.utc("2016-11-15T11:15:00.000Z");

    // edApp
    var edApp = actor.id;

    // Assert that key attributes are the same
    var event = eventFactory().create(SessionEvent, {
      id: uuid,
      actor: actor,
      action: action,
      object: obj,
      eventTime: eventTime,
      edApp: edApp
    });

    // Compare
    var diff = testUtils.compare(fixture, clientUtils.parse(event));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + clientUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});