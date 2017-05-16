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

var config =  require('../../src/config/config');
var entityFactory = require('../../src/entities/entityFactory');
var CourseOffering = require('../../src/entities/agent/courseOffering');
var CourseSection = require('../../src/entities/agent/courseSection');
var Membership = require('../../src/entities/agent/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/agent/role');
var Status = require('../../src/entities/agent/status');
var requestorUtils = require('../../src/requestors/requestorUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEntityMembership.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('membershipTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_IRI = "https://example.edu";
    const BASE_COURSE_IRI = "https://example.edu/terms/201601/courses/7";
    const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1"

    var member = entityFactory().create(Person, {id: BASE_IRI.concat("/users/554433")});
    var course = entityFactory().create(CourseOffering, {id: BASE_COURSE_IRI});
    var section = entityFactory().create(CourseSection, {id: BASE_SECTION_IRI, subOrganizationOf: course});

    var entity = entityFactory().create(Membership, {
      id: BASE_SECTION_IRI.concat("/rosters/1/members/554433"),
      member: member,
      organization: section,
      roles: [Role.learner.term],
      status: Status.active.term,
      dateCreated: moment.utc("2016-11-01T06:00:00.000Z")
    });

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestorUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});