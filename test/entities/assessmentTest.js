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
var requestorUtils = require('../../src/request/requestorUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDirectory + "caliperEntityAssessment.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('Create an Assessment entity and validate properties', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_ASSESS_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1";

    var items = [];
    items.push(entityFactory().create(AssessmentItem, {id: BASE_ASSESS_IRI.concat("/items/1")}));
    items.push(entityFactory().create(AssessmentItem, {id: BASE_ASSESS_IRI.concat("/items/2")}));
    items.push(entityFactory().create(AssessmentItem, {id: BASE_ASSESS_IRI.concat("/items/3")}));

    var entity = entityFactory().create(Assessment, {
      id: BASE_ASSESS_IRI,
      name: "Quiz One",
      items: items,
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
      dateModified: moment.utc("2016-09-02T11:30:00.000Z"),
      datePublished: moment.utc("2016-08-15T09:30:00.000Z"),
      dateToActivate: moment.utc("2016-08-16T05:00:00.000Z"),
      dateToShow: moment.utc("2016-08-16T05:00:00.000Z"),
      dateToStartOn: moment.utc("2016-08-16T05:00:00.000Z"),
      dateToSubmit: moment.utc("2016-09-28T11:59:59.000Z"),
      maxAttempts: 2,
      maxSubmits: 2,
      maxScore: 15,
      version: "1.0"
    });

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestorUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    ////t.end();
  });
});