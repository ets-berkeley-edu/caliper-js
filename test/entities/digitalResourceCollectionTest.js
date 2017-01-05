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
var Course = require('../../src/entities/lis/courseOffering');
var CourseSection = require('../../src/entities/lis/courseSection');
var DigitalResourceCollection = require('../../src/entities/resource/digitalResourceCollection');
var VideoObject = require('../../src/entities/resource/videoObject');
var requestUtils = require('../../src/request/requestUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEntityDigitalResourceCollection.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('Create a DigitalResourceCollection entity and validate properties', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_IRI = "https://example.edu";
    const BASE_COURSE_IRI = "https://example.edu/terms/201601/courses/7";
    const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

    // Course context
    var course = entityFactory().create(Course, BASE_COURSE_IRI);
    var section = entityFactory().create(CourseSection, BASE_SECTION_IRI, {
      subOrganizationOf: course
    });

    // Items
    var items = [];
    items.push(entityFactory().create(VideoObject, BASE_IRI.concat("/videos/1225"), {
      mediaType: "video/ogg",
      name: "Introduction to IMS Caliper",
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
      duration: "PT1H12M27S",
      version: "1.1"
    }));
    items.push(entityFactory().create(VideoObject, BASE_IRI.concat("/videos/5629"), {
      mediaType: "video/ogg",
      name: "IMS Caliper Activity Profiles",
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
      duration: "PT55M13S",
      version: "1.1.1"
    }));

    // Collection
    var entity = entityFactory().create(DigitalResourceCollection, BASE_SECTION_IRI.concat("/resources/2"), {
      name: "Video Collection",
      keywords: ["collection", "videos"],
      items: items,
      isPartOf: section,
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
      dateModified: moment.utc("2016-09-02T11:30:00.000Z")
    });

    // Compare
    var diff = testUtils.compare(fixture, requestUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});