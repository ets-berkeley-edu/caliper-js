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
var Frame = require('../../src/entities/resource/frame');

var testUtils = require('../testUtils');

test('Create a Frame entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";

  var document = entityFactory().create(Document, BASE_IRI.concat("/etexts/201"), {
    name: "IMS Caliper Implementation Guide",
    version: "1.1"
  });

  var frame = entityFactory().create(Frame, BASE_IRI.concat("/etexts/201?index=2502"), {
    index: 2502,
    isPartOf: document,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
  });

  // Compare JSON
  var diff = testUtils.jsonCompare('caliperEntityFrame', frame);
  t.equal(true, _.isUndefined(diff), "Validate JSON");

  t.end();
});