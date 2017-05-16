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
var client = require('../../src/sensorclients/httpClient');
var httpOptions = require('../../src/config/httpOptions');
var requestorUtils = require('../../src/requestors/requestorUtils');

var entityFactory = require('../../src/entities/entityFactory');
var Course = require('../../src/entities/agent/courseOffering');
var CourseSection = require('../../src/entities/agent/courseSection');
var DigitalResourceCollection = require('../../src/entities/resource/digitalResourceCollection');
var Document = require('../../src/entities/resource/document');
var Person = require('../../src/entities/agent/person');
var VideoObject = require('../../src/entities/resource/videoObject');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEnvelopeEntityBatch.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('batchEntityTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_EDU_IRI = "https://example.edu";
    const BASE_COM_IRI = "https://example.com";
    const BASE_COURSE_IRI = "https://example.edu/terms/201601/courses/7";
    const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

    // Person
    var person = entityFactory().create(Person, {
      id: BASE_EDU_IRI.concat("/users/554433"),
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
      dateModified: moment.utc("2016-09-02T11:30:00.000Z")
    });

    // Document
    var creators = [];
    creators.push(entityFactory().create(Person, {id: BASE_EDU_IRI.concat("/people/12345")}));
    creators.push(entityFactory().create(Person, {id: BASE_COM_IRI.concat("/staff/56789")}));

    var document = entityFactory().create(Document, {
      id: BASE_EDU_IRI.concat("/etexts/201.epub"),
      name: "IMS Caliper Implementation Guide",
      creators: creators,
      dateCreated: moment.utc("2016-10-01T06:00:00.000Z"),
      version: "1.1"
    });

    // Course context
    var course = entityFactory().create(Course, {id: BASE_COURSE_IRI});
    var section = entityFactory().create(CourseSection, {id: BASE_SECTION_IRI, subOrganizationOf: course});

    // Items
    var items = [];
    items.push(entityFactory().create(VideoObject, {
      id: BASE_EDU_IRI.concat("/videos/1225"),
      mediaType: "video/ogg",
      name: "Introduction to IMS Caliper",
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
      duration: "PT1H12M27S",
      version: "1.1"
    }));
    items.push(entityFactory().create(VideoObject, {
      id: BASE_EDU_IRI.concat("/videos/5629"),
      mediaType: "video/ogg",
      name: "IMS Caliper Activity Profiles",
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
      duration: "PT55M13S",
      version: "1.1.1"
    }));

    // Collection
    var collection = entityFactory().create(DigitalResourceCollection, {
      id: BASE_SECTION_IRI.concat("/resources/2"),
      name: "Video Collection",
      items: items,
      isPartOf: section,
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
      dateModified: moment.utc("2016-09-02T11:30:00.000Z")
    });

    // Create data payload
    var data = [];
    data.push(person);
    data.push(document);
    data.push(collection);

    // Initialize client
    var sensorClient = _.create(client);
    sensorClient.initialize(BASE_EDU_IRI.concat("/sensors/1"));
    var envelope = sensorClient.createEnvelope({sendTime: moment.utc("2016-11-15T11:05:01.000Z"), data: data});

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(envelope));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestorUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});