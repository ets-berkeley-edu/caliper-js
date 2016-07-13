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
var util = require('util');
var jsonCompare = require('../testUtils');
var entityFactory = require('../../src/entities/entityFactory');
var Forum = require('../../src/entities/resource/forum');
var Message = require('../../src/entities/resource/message');
var Thread = require('../../src/entities/resource/thread');

test('Create a Thread entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_COURSE_IRI = "https://example.edu/semesters/201601/courses/25";

  var forumId = BASE_COURSE_IRI.concat("/forums/2");
  var forum = entityFactory().create(Forum, forumId, { name: "Caliper Forum" });
  
  var threadId = forumId.concat("/topics/1");
  var msg01 = entityFactory().create(Message, threadId.concat("/messages/1"));
  var msg02 = entityFactory().create(Message, threadId.concat("/messages/2"), { replyTo: msg01 });
  var msg03 = entityFactory().create(Message, threadId.concat("/messages/3"), { replyTo: msg02 });

  var thread = entityFactory().create(Thread, threadId, {
    name: "Caliper Information Model",
    items: [msg01, msg02, msg03],
    isPartOf: forum,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2016-09-02T11:30:00.000Z")
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEntityThread', thread, t);
});