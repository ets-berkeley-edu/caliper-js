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
var requestorUtils = require('../../src/requestors/requestorUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEntityAssessmentItemExtended.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('assessmentItemExtendedTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_ASSESS_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1";

    var parent = entityFactory().create(Assessment, {id: BASE_ASSESS_IRI});

    // Custom extension
    var question = {
      "@context": {
        id: "@id",
        type: "@type",
        example: "http://example.edu/ctx/edu",
        xsd: "http://www.w3.org/2001/XMLSchema#",
        itemType: { id: "example:itemType", type: "xsd:string" },
        itemText: { id: "example:itemText", type: "xsd:string" },
        itemCorrectResponse: { id: "example:itemCorrectResponse", type: "xsd:boolean" }
      },
      itemType: "true/false",
      itemText: "In Caliper event actors are limited to people only.",
      itemCorrectResponse: false
    };

    var extensions = [];
    extensions.push(question);

    var entity = entityFactory().create(AssessmentItem, {
      id: BASE_ASSESS_IRI.concat("/items/3"),
      isPartOf: parent,
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
      datePublished: moment.utc("2016-08-15T09:30:00.000Z"),
      maxAttempts: 2,
      maxSubmits: 2,
      maxScore: 5,
      isTimeDependent: false,
      extensions: extensions
    });

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestorUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});