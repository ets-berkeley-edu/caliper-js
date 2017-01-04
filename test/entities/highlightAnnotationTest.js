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

var entityFactory = require('../../src/entities/entityFactory');
var Document = require('../../src/entities/resource/document');
var HighlightAnnotation = require('../../src/entities/annotation/highlightAnnotation');
var Person = require('../../src/entities/agent/person');

var testUtils = require('../testUtils');

test('Create a HighlightAnnotation entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";

  var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));
  var annotated = entityFactory().create(Document, BASE_IRI.concat("/etexts/201"));

  var annotation = entityFactory().create(HighlightAnnotation, BASE_IRI.concat("/users/554433/etexts/201/highlights/20"), {
    actor: actor,
    annotated: annotated,
    selection: {
      start: 2300,
      end: 2370
    },
    selectionText: "ISO 8601 formatted date and time expressed with millisecond precision.",
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
  });

  // Compare JSON
  var diff = testUtils.jsonCompare('caliperEntityHighlightAnnotation', annotation);
  t.equal(true, _.isUndefined(diff), "Validate JSON");

  t.end();
});