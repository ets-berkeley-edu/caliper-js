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
var Assessment = require('../../src/entities/resource/assessment');
var Attempt = require('../../src/entities/resource/attempt');
var Person = require('../../src/entities/agent/person');
var Score = require('../../src/entities/outcome/score');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var clientUtils = require('../../src/clients/clientUtils');
var testUtils = require('../testUtils');

var path = config.testFixturesBaseDir.v1p1 + "caliperEntityScore.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('resultTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    var BASE_IRI = "https://example.edu";
    var BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";
    var BASE_ATTEMPT_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1/users/554433/attempts/1";

    var assignee = entityFactory().create(Person, {id: BASE_IRI.concat("/users/554433")});
    var assignable = entityFactory().create(Assessment, {id: BASE_SECTION_IRI.concat("/assess/1")});
    var attempt = entityFactory().create(Attempt, {
      id: BASE_ATTEMPT_IRI,
      assignee: assignee.id,
      assignable: assignable.id,
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

    var entity = entityFactory().create(Score, {
      id: BASE_SECTION_IRI.concat("/assess/1/users/554433/attempts/1/scores/1"),
      attempt: attempt,
      maxScore: 15.0,
      scoreGiven: 10.0,
      scoredBy: scorer,
      comment: "auto-graded exam",
      dateCreated: moment.utc("2016-11-15T10:56:00.000Z")
    });

    // Compare
    var diff = testUtils.compare(fixture, clientUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + clientUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});