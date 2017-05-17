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

//var Sensor = require('../../src/sensor');
var client = require('../../src/sensorclients/client');

var config = require('../../src/config/config');
var httpOptions = require('../../src/config/httpOptions');

var requestor = require('../../src/requestors/httpRequestor');
var requestorUtils = require('../../src/requestors/requestorUtils');

var entityFactory = require('../../src/entities/entityFactory');
var Course = require('../../src/entities/agent/courseOffering');
var CourseSection = require('../../src/entities/agent/courseSection');
var DigitalResource = require('../../src/entities/resource/digitalResource');
var DigitalResourceCollection = require('../../src/entities/resource/digitalResourceCollection');
var Person = require('../../src/entities/agent/person');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEnvelopeEntitySingle.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('singleEntityTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_IRI = "https://example.edu";
    const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";
    const BASE_COLLECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1/resources/1";

    var creators = [];
    creators.push(entityFactory().create(Person, {id: BASE_IRI.concat("/users/223344")}));

    var section = entityFactory().create(CourseSection, {id: BASE_SECTION_IRI});
    var collection = entityFactory().create(DigitalResourceCollection, {
      id: BASE_COLLECTION_IRI,
      name: "Course Assets",
      isPartOf: section
    });

    var entity = entityFactory().create(DigitalResource, {
      id: BASE_COLLECTION_IRI.concat("/syllabus.pdf"),
      name: "Course Syllabus",
      mediaType: "application/pdf",
      creators: creators,
      isPartOf: collection,
      dateCreated: moment.utc("2016-08-02T11:32:00.000Z")
    });

    // Initialize sensor, client, and requestor; create envelope but don't send.
    // var sensor = _.create(Sensor);
    // sensor.initialize("https://example.edu/sensors/1");
    client.initialize("https://example.edu/sensors/1");
    requestor.initialize(client.id.concat("/requestors/1"), {});
    client.registerRequestor(requestor);
    //sensor.registerClient(client);

    var envelope = client.createEnvelope({sendTime: moment.utc("2016-11-15T11:05:01.000Z"), data: entity});

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(envelope));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestorUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});