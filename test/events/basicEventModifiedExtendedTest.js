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
var Event = require('../../src/events/event');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var Document = require('../../src/entities/resource/document');
var Person = require('../../src/entities/agent/person');
var clientUtils = require('../../src/clients/clientUtils');
var testUtils = require('../testUtils');

var path = config.testFixturesBaseDir.v1p1 + "caliperEventBasicModifiedExtended.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('basicEventModifiedTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    var BASE_IRI = "https://example.edu";
    var BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

    // Id with canned value
    uuid = "urn:uuid:5973dcd9-3126-4dcc-8fd8-8153a155361c";

    // The Actor
    var actor = entityFactory().create(Person, {id: BASE_IRI.concat("/users/554433")});

    // The Action
    var action = actions.modified.term;

    // The Object of the interaction
    var obj = entityFactory().create(Document, {
      id: BASE_SECTION_IRI.concat("/resources/123?version=3"),
      name: "Course Syllabus",
      dateCreated: moment.utc("2016-11-12T07:15:00.000Z"),
      dateModified: moment.utc("2016-11-15T10:15:00.000Z"),
      version: "3"
    });

    // Event time
    var eventTime = moment.utc("2016-11-15T10:15:00.000Z");

    // Archived versions
    var doc1 = entityFactory().create(Document, {
      id: BASE_SECTION_IRI.concat("/resources/123?version=1"),
      dateCreated: moment.utc("2016-11-12T07:15:00.000Z"),
      version: "1"
    });

    var doc2 = entityFactory().create(Document, {
      id: BASE_SECTION_IRI.concat("/resources/123?version=2"),
      dateCreated: moment.utc("2016-11-12T07:15:00.000Z"),
      dateModified: moment.utc("2016-11-13T11:00:00.000Z"),
      version: "2"
    });

    var archive = [];
    archive.push(doc2);
    archive.push(doc1);

    // Extensions
    var extensions = {
      archive: archive
    };

    // Assert that key attributes are the same
    var event = eventFactory().create(Event, {
      id: uuid,
      actor: actor,
      action: action,
      object: obj,
      eventTime: eventTime,
      extensions: extensions
    });

    // Compare
    var diff = testUtils.compare(fixture, clientUtils.parse(event));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + clientUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});