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

// Entity
var entityFactory = require('../../src/entities/entityFactory');
var Assessment = require('../../src/entities/resource/assessment');
var AssessmentItem = require('../../src/entities/resource/assessmentItem');

var testUtils = require('../testUtils');

test('Create an AssessmentItem entity with extensions and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_ASSESS_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1";

  var parent = entityFactory().create(Assessment, BASE_ASSESS_IRI);

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

  var item = entityFactory().create(AssessmentItem, BASE_ASSESS_IRI.concat("/items/3"), {
    isPartOf: parent,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
    datePublished: moment.utc("2016-08-15T09:30:00.000Z"),
    maxAttempts: 2,
    maxSubmits: 2,
    maxScore: 5,
    isTimeDependent: false,
    extensions: extensions
  });

  // Compare JSON
  var diff = testUtils.jsonCompare('caliperEntityAssessmentItemExtended', item);
  t.equal(true, _.isUndefined(diff), "Validate JSON");

  t.end();
});