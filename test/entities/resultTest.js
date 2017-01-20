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
var Assessment = require('../../src/entities/resource/assessment');
var Attempt = require('../../src/entities/assign/attempt');
var Person = require('../../src/entities/agent/person');
var Result = require('../../src/entities/assign/result');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var requestorUtils = require('../../src/request/requestorUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDirectory + "caliperEntityResult.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('Create a Result entity and validate properties', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_IRI = "https://example.edu";
    const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";
    const BASE_ATTEMPT_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1/users/554433/attempts/1";

    var actor = entityFactory().create(Person, {id: BASE_IRI.concat("/users/554433")});
    var assignable = entityFactory().create(Assessment, {id: BASE_SECTION_IRI.concat("/assess/1")});
    var attempt = entityFactory().create(Attempt, {
      id: BASE_ATTEMPT_IRI,
      actor: actor,
      assignable: assignable,
      count: 1,
      dateCreated: "2016-11-15T10:05:00.000Z",
      startedAtTime: "2016-11-15T10:05:00.000Z",
      endedAtTime: "2016-11-15T10:55:30.000Z",
      duration: "PT50M30S"
    });
    var scorer = entityFactory().create(SoftwareApplication, {
      id: BASE_IRI.concat("/autograder"),
      dateCreated: moment.utc("2016-11-15T10:55:58.000Z")
    });

    var entity = entityFactory().create(Result, {
      id: BASE_ATTEMPT_IRI.concat("/results/1"),
      attempt: attempt,
      comment: "Well done.",
      normalScore: 15.0,
      penaltyScore: 0.0,
      totalScore: 15.0,
      scoredBy: scorer,
      dateCreated: moment.utc("2016-11-15T10:56:00.000Z")
    });

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestorUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});