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
var CourseOffering = require('../../src/entities/lis/courseOffering');
var CourseSection = require('../../src/entities/lis/courseSection');
var Group = require('../../src/entities/agent/group');
var Person = require('../../src/entities/agent/person');

var testUtils = require('../testUtils');

test('Create a Group entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu/terms/201601/courses/7";
  const PERSON_IRI = "https://example.edu/users";

  var course = entityFactory().create(CourseOffering, BASE_IRI);
  var section = entityFactory().create(CourseSection, BASE_IRI.concat("/sections/1"), { subOrganizationOf: course });

  var members = [];
  members.push(entityFactory().create(Person, PERSON_IRI.concat("/554433")));
  members.push(entityFactory().create(Person, PERSON_IRI.concat("/778899")));
  members.push(entityFactory().create(Person, PERSON_IRI.concat("/445566")));
  members.push(entityFactory().create(Person, PERSON_IRI.concat("/667788")));
  members.push(entityFactory().create(Person, PERSON_IRI.concat("/889900")));
  
  var group = entityFactory().create(Group, BASE_IRI.concat("/sections/1/groups/2"), {
    name: "Discussion Group 2",
    subOrganizationOf: section,
    members: members,
    dateCreated: moment.utc("2016-11-01T06:00:00.000Z")
  });

  // Compare JSON
  var diff = testUtils.jsonCompare('caliperEntityGroup', group);
  t.equal(true, _.isUndefined(diff), "Validate JSON");

  t.end();
});