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
var Course = require('../../src/entities/lis/courseOffering');
var CourseSection = require('../../src/entities/lis/courseSection');
var DigitalResource = require('../../src/entities/resource/digitalResource');
var DigitalResourceCollection = require('../../src/entities/resource/digitalResourceCollection');
var Person = require('../../src/entities/agent/person');

var testUtils = require('../testUtils');
var requestor = require('../../src/request/httpRequestor');

test('Create an Envelope containing a single Entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";
  const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";
  const BASE_COLLECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1/resources/1";

  var creators = [];
  creators.push(entityFactory().create(Person, BASE_IRI.concat("/users/223344")));

  var section = entityFactory().create(CourseSection, BASE_SECTION_IRI);
  var collection = entityFactory().create(DigitalResourceCollection, BASE_COLLECTION_IRI, {
    name: "Course Assets",
    isPartOf: section
  });

  var resource = entityFactory().create(DigitalResource, BASE_COLLECTION_IRI.concat("/syllabus.pdf"), {
    name: "Course Syllabus",
    mediaType: "application/pdf",
    creators: creators,
    isPartOf: collection,
    dateCreated: moment.utc("2016-08-02T11:32:00.000Z")
  });

  // Initialize faux sensor and default options
  var sensor = createFauxSensor(BASE_IRI.concat("/sensors/1"));
  var options = {};

  // Initialize requestor, create envelope and reset sendTime with fixture value (or test will fail).
  requestor.initialize(options);

  var sendTime = moment.utc("2016-11-15T11:05:01.000Z");
  var data = [];
  data.push(resource);
  var envelope = requestor.createEnvelope(sensor, sendTime, data);

  // Compare JSON
  var diff = testUtils.jsonCompare('caliperEnvelopeEntitySingle', envelope);
  t.equal(true, _.isUndefined(diff), "Validate JSON");

  t.end();
});

/**
 * Create a fake sensor object in order to avoid generating a "window is not defined"
 * reference error since we are not running tests in the browser but on the server.
 * @param id
 * @returns {{id: *}}
 */
function createFauxSensor(id) {
  return {id: id};
}