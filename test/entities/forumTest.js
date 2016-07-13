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

var moment = require('moment');
var test = require('tape');

var entityFactory = require('../../src/entities/entityFactory');
var CourseSection = require('../../src/entities/lis/courseSection');
var Forum = require('../../src/entities/resource/forum');
var Thread = require('../../src/entities/resource/thread');

var jsonCompare = require('../testUtils');

test('Create a Forum entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_COURSE_IRI = "https://example.edu/semesters/201601/courses/25";

  var forumId = BASE_COURSE_IRI.concat("/forums/1");
  var thread01 = entityFactory().create(Thread, forumId.concat("/topics/1"), {
    name: "Caliper Information Model",
    dateCreated: moment.utc("2016-08-01T06:01:00.000Z")
  });
  var thread02 = entityFactory().create(Thread, forumId.concat("/topics/2"), {
    name: "Caliper Sensor API",
    dateCreated: moment.utc("2016-08-01T06:02:00.000Z")
  });
  var thread03 = entityFactory().create(Thread, forumId.concat("/topics/3"), {
    name: "Caliper Certification",
    dateCreated: moment.utc("2016-09-02T11:30:00.000Z")
  });

  var section = entityFactory().create(CourseSection, BASE_COURSE_IRI.concat("/sections/1"));

  var forum = entityFactory().create(Forum, forumId, {
    name: "Caliper Forum",
    items: [thread01, thread02, thread03],
    isPartOf: section,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2016-09-02T11:30:00.000Z")
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEntityForum', forum, t);
});