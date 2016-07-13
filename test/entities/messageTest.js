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
var Forum = require('../../src/entities/resource/forum');
var Message = require('../../src/entities/resource/message');
var Person = require('../../src/entities/agent/person');
var Thread = require('../../src/entities/resource/thread');

var jsonCompare = require('../testUtils');

test('Create a Message entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_COURSE_IRI = "https://example.edu/semesters/201601/courses/25";

  var forumId = BASE_COURSE_IRI.concat("/forums/2");
  var forum = entityFactory().create(Forum, forumId, {
    name: "Caliper Forum",
    dateCreated: moment.utc("2016-09-01T09:28:00.000Z")
  });

  var threadId = forumId.concat("/topics/1");
  var thread = entityFactory().create(Thread, threadId, {
    name: "Caliper Happiness Index",
    isPartOf: forum,
    dateCreated: moment.utc("2016-09-01T09:30:00.000Z")
  });

  var msg01Creator = entityFactory().create(Person, "https://example.edu/users/12345");
  var msg01 = entityFactory().create(Message, threadId.concat("/messages/1"), {
    creators: [ msg01Creator ],
    dateCreated: moment.utc("2016-09-02T11:30:00.000Z")
  });
  
  var msg02Creator = entityFactory().create(Person, "https://example.edu/users/554433");
  var msg02 = entityFactory().create(Message, threadId.concat("/messages/2"), {
    creators: [ msg02Creator ],
    replyTo: msg01,
    isPartOf: thread,
    dateCreated: moment.utc("2016-09-02T11:32:00.000Z")
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEntityMessage', msg02, t);
});