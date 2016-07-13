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
var Event = require('../../src/events/event');

var entityFactory = require('../../src/entities/entityFactory');
var Person = require('../../src/entities/agent/person');
var SoftwareApplication = require('../../src/entities/agent/SoftwareApplication');
var VideoObject = require('../../src/entities/resource/videoObject');

var jsonCompare = require('../testUtils');

test('Create a generic Event (videoObject created) using the eventFactory and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actorId = "https://example.edu/user/554433";
  var actor = entityFactory().create(Person, actorId);

  // The Action for the Caliper Event
  var action = "http://purl.imsglobal.org/vocab/caliper/v1/action#Created";

  // The Object being interacted with by the Actor
  var objId = "https://example.com/super-media-tool/video/6779";
  var obj = entityFactory().create(VideoObject, objId);

  // Assert that key attributes are the same
  var event = eventFactory().create(Event, {
    actor: actor,
    action: action,
    object: obj,
    eventTime: moment.utc("2015-09-15T10:15:00.000Z")
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventMinimalCreated', event, t);
});