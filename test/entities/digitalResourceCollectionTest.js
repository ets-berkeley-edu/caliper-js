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
var test = require('tape');
var util = require('util');
var jsonCompare = require('../testUtils');
var entityFactory = require('../../src/entities/entityFactory');
var CourseSection = require('../../src/entities/lis/courseSection');
var DigitalResourceCollection = require('../../src/entities/resource/digitalResourceCollection');
var Person = require('../../src/entities/agent/person');

test('Create a DigitalResourceCollection entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_COURSE_IRI = "https://example.edu/semesters/201601/courses/25";
  var section = entityFactory().create(CourseSection, BASE_COURSE_IRI.concat("/sections/1"));
  var creator01 = entityFactory().create(Person, "https://example.edu/user/112233");
  var creator02 = entityFactory().create(Person, "https://example.edu/user/223344");
  var creators = [creator01, creator02];
  var collectionId = BASE_COURSE_IRI.concat("/resources/1");
  var docs = entityFactory().create(DigitalResourceCollection, collectionId.concat("/collections/1"), {
    name: "Document Collection",
    dateCreated: "2016-08-01T06:01:00.000Z",
    datePublished: "2016-08-15T09:30:00.000Z"
  });
  var images = entityFactory().create(DigitalResourceCollection, collectionId.concat("/collections/2"), {
    name: "Image Collection",
    dateCreated: "2016-08-01T06:02:00.000Z",
    datePublished: "2016-08-15T09:30:00.000Z"
  });
  var videos = entityFactory().create(DigitalResourceCollection, collectionId.concat("/collections/3"), {
    name: "Video Collection",
    dateCreated: "2016-08-01T06:03:00.000Z",
    datePublished: "2016-08-15T09:30:00.000Z"
  });

  var collection = entityFactory().create(DigitalResourceCollection, collectionId, {
    name: "Course resources",
    creators: creators,
    keywords: ["collections", "documents", "images", "videos"],
    items: [docs, images, videos],
    isPartOf: section,
    dateCreated: "2016-08-01T06:00:00.000Z",
    dateModified: "2016-08-01T06:03:00.000Z",
    datePublished: "2016-08-15T09:30:00.000Z"
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEntityDigitalResourceCollection', collection, t);
});