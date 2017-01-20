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

var config =  require('../../src/config');
var entityFactory = require('../../src/entities/entityFactory');
var Document = require('../../src/entities/resource/document');
var Person = require('../../src/entities/agent/person');
var SharedAnnotation = require('../../src/entities/annotation/sharedAnnotation');
var requestorUtils = require('../../src/request/requestorUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDirectory + "caliperEntitySharedAnnotation.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('Create a SharedAnnotation entity and validate properties', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_IRI = "https://example.edu";
    const BASE_EPUB_IRI = "https://example.edu/etexts/201.epub";

    var actor = entityFactory().create(Person, {id: BASE_IRI.concat("/users/554433")});
    var annotated = entityFactory().create(Document, {id: BASE_EPUB_IRI});

    // Shares
    var sharedWith = [];
    sharedWith.push(entityFactory().create(Person, {id: BASE_IRI.concat("/users/657585")}));
    sharedWith.push(entityFactory().create(Person, {id: BASE_IRI.concat("/users/667788")}));

    var entity = entityFactory().create(SharedAnnotation, {
      id: BASE_IRI.concat("/users/554433/etexts/201/shares/1"),
      actor: actor,
      annotated: annotated,
      withAgents: sharedWith,
      dateCreated: moment.utc("2016-08-01T09:00:00.000Z")
    });

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestorUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});