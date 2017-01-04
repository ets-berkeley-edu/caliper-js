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
var Event = require('../../src/events/Event');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var Document = require('../../src/entities/resource/document');
var Person = require('../../src/entities/agent/person');

var testUtils = require('../testUtils');

test('Create a Basic event (modified) with extensions and validate properties', function (t) {

  // Plan for N assertions
  t.plan(2);

  const BASE_IRI = "https://example.edu";
  const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

  // Id
  var uuid = eventUtils.generateUUID(config.version);

  // Check Id
  t.equal(true, eventValidator.isUUID(uuid), "Validate generated UUID.");

  // Override ID with canned value
  uuid = "5973dcd9-3126-4dcc-8fd8-8153a155361c";

  // The Actor
  var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));

  // The Action
  var action = actions.modified.term;

  // The Object of the interaction
  var obj = entityFactory().create(Document, BASE_SECTION_IRI.concat("/resources/123"), {
    name: "Course Syllabus",
    dateCreated: moment.utc("2016-11-12T07:15:00.000Z"),
    dateModified: moment.utc("2016-11-15T10:15:00.000Z"),
    version: "2"
  });

  // Event time
  var eventTime = moment.utc("2016-11-15T10:15:00.000Z");

  // Custom Extension
  var history = {
    "@context": {
      id: "@id",
      type: "@type",
      previousVersion: "http://example.edu/ctx/edu/previousVersion"
    },
    "previousVersion": {
      id: "https://example.edu/terms/201601/courses/7/sections/1/resources/123?version=1",
      type: "Document"
    }
  };

  var extensions = [];
  extensions.push(history);

  // Assert that key attributes are the same
  var event = eventFactory().create(Event, {
    uuid: uuid,
    actor: actor,
    action: action,
    object: obj,
    eventTime: eventTime,
    extensions: extensions
  });

  // Compare JSON
  var diff = testUtils.jsonCompare('caliperEventBasicModifiedExtended', event);
  t.equal(true, _.isUndefined(diff), "Validate JSON");

  t.end();
});