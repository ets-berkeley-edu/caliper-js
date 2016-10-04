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

var entityFactory = require('../../src/entities/entityFactory');
var Collection = require('../../src/entities/collection');
var Group = require('../../src/entities/agent/group');

var jsonCompare = require('../testUtils');

test('Create a Collection entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

  // Items
  var items = [];
  items.push(entityFactory().create(Group, BASE_SECTION_IRI.concat("/groups/1")));
  items.push(entityFactory().create(Group, BASE_SECTION_IRI.concat("/groups/3")));
  items.push(entityFactory().create(Group, BASE_SECTION_IRI.concat("/groups/5")));

  // Collection
  var collection = entityFactory().create(Collection, BASE_SECTION_IRI.concat("/groups"), {
    name: "Groups",
    items: items,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEntityCollection', collection, t);
});