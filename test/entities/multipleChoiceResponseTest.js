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
var AssessmentItem = require('../../src/entities/resource/assessmentItem');
var Attempt = require('../../src/entities/assign/attempt');
var MultipleChoiceResponse = require('../../src/entities/response/multipleChoiceResponse');
var Person = require('../../src/entities/agent/person');
var requestorUtils = require('../../src/request/requestorUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDirectory + "caliperEntityMultipleChoiceResponse.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('multipleChoiceResponseTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_IRI = "https://example.edu";
    const BASE_ASSESS_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1";
    const BASE_ITEM_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/2";

    var actor = entityFactory().create(Person, {id: BASE_IRI.concat("/users/554433")});
    var assessment = entityFactory().create(Assessment, {id: BASE_ASSESS_IRI});
    var assessmentItem = entityFactory().create(AssessmentItem, {
      id: BASE_ITEM_IRI,
      isPartOf: assessment
    });

    var attempt = entityFactory().create(Attempt, {
      id: BASE_ITEM_IRI.concat("/users/554433/attempts/1"),
      assignee: actor,
      assignable: assessmentItem,
      count: 1,
      startedAtTime: moment.utc("2016-11-15T10:15:14.000Z"),
      endedAtTime: moment.utc("2016-11-15T10:15:20.000Z")
    });

    var entity = entityFactory().create(MultipleChoiceResponse, {
      id: BASE_ITEM_IRI.concat("/users/554433/responses/1"),
      attempt: attempt,
      value: "C",
      dateCreated: moment.utc("2016-11-15T10:15:20.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:15:14.000Z"),
      endedAtTime: moment.utc("2016-11-15T10:15:20.000Z")
    });

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestorUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});