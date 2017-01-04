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
var Forum = require('../../src/entities/resource/forum');
var Message = require('../../src/entities/resource/message');
var Thread = require('../../src/entities/resource/thread');

var testUtils = require('../testUtils');

test('Create a Thread entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_COURSE_IRI = "https://example.edu/terms/201601/courses/7";
  const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";
  const BASE_FORUM_IRI = "https://example.edu/terms/201601/courses/7/sections/1/forums/1";
  const BASE_THREAD_IRI = "https://example.edu/terms/201601/courses/7/sections/1/forums/1/topics/1";

  // Forum context
  var course = entityFactory().create(Course, BASE_COURSE_IRI);
  var section = entityFactory().create(CourseSection, BASE_SECTION_IRI, {
    subOrganizationOf: course });
  var forum = entityFactory().create(Forum, BASE_FORUM_IRI, {
    name: "Caliper Forum",
    isPartOf: section
  });

  // Messages
  var msg1 = entityFactory().create(Message, BASE_THREAD_IRI.concat("/messages/1"));
  var msg2 = entityFactory().create(Message, BASE_THREAD_IRI.concat("/messages/2"), { replyTo: msg1 });
  var msg3 = entityFactory().create(Message, BASE_THREAD_IRI.concat("/messages/3"), { replyTo: _.omit(msg2, ["replyTo"])});

  console.log(msg3);
  
  // Items
  var items = [];
  items.push(msg1);
  items.push(msg2);
  items.push(msg3);

  var thread = entityFactory().create(Thread, BASE_THREAD_IRI, {
    name: "Caliper Information Model",
    items: items,
    isPartOf: forum,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2016-09-02T11:30:00.000Z")
  });

  // Compare JSON
  var diff = testUtils.jsonCompare('caliperEntityThread', thread);
  t.equal(true, _.isUndefined(diff), "Validate JSON");

  t.end();
});