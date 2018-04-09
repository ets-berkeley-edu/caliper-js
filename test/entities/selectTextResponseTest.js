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
var AssessmentItem = require('../../src/entities/resource/assessmentItem');
var Attempt = require('../../src/entities/resource/attempt');
var Person = require('../../src/entities/agent/person');
var SelectTextResponse = require('../../src/entities/response/selectTextResponse');
var clientUtils = require('../../src/clients/clientUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir.v1p1 + "caliperEntitySelectTextResponse.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('selectTextResponseTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_IRI = "https://example.edu";
    const BASE_ASSESS_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1";
    const BASE_ITEM_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/4";

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
      startedAtTime: moment.utc("2016-11-15T10:15:32.000Z"),
      endedAtTime: moment.utc("2016-11-15T10:15:38.000Z")
    });

    var values = [];
    values.push("Information Model");
    values.push("Sensor API");
    values.push("Profiles");

    var entity = entityFactory().create(SelectTextResponse, {
      id: BASE_ITEM_IRI.concat("/users/554433/responses/1"),
      attempt: attempt,
      values: values,
      dateCreated: moment.utc("2016-11-15T10:15:32.000Z"),
      startedAtTime: moment.utc("2016-11-15T10:15:32.000Z"),
      endedAtTime: moment.utc("2016-11-15T10:15:38.000Z")
    });

    // Compare
    var diff = testUtils.compare(fixture, clientUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + clientUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});