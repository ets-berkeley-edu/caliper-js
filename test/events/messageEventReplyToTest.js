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

var eventFactory = require('../../src/events/eventFactory');
var MessageEvent = require('../../src/events/messageEvent');
var MessageActions = require('../../src/actions/messageActions');

var entityFactory = require('../../src/entities/entityFactory');
var CourseSection = require('../../src/entities/lis/courseSection');
var Forum = require('../../src/entities/resource/forum');
var Membership = require('../../src/entities/lis/membership');
var Message = require('../../src/entities/resource/message');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/lis/role');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Session = require('../../src/entities/session/Session');
var Thread = require('../../src/entities/resource/thread');
var Status = require('../../src/entities/lis/status');

var jsonCompare = require('../testUtils');

test('Create a MessageEvent (reply) and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";
  const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";
  const BASE_FORUM_IRI = "https://example.edu/terms/201601/courses/7/sections/1/forums/2";
  const BASE_THREAD_IRI = "https://example.edu/terms/201601/courses/7/sections/1/forums/2/topics/1";

  // Actor
  var actor = entityFactory().create(Person, BASE_IRI.concat("/users/778899"));

  // Action
  var action = MessageActions.POSTED;

  // Forum, Thread context
  var forum = entityFactory().create(Forum, BASE_FORUM_IRI);
  var thread = entityFactory().create(Thread, BASE_THREAD_IRI, { isPartOf: forum });

  // ReplyTo
  var replyTo = entityFactory().create(Message, BASE_THREAD_IRI.concat("/messages/2"));

  // Message object
  var obj = entityFactory().create(Message, BASE_THREAD_IRI.concat("/messages/3"), {
    creators: [ actor ],
    replyTo: replyTo,
    isPartOf: thread,
    dateCreated: moment.utc("2016-11-15T10:15:30.000Z")
  });

  // Event time
  var eventTime = moment.utc("2016-11-15T10:15:30.000Z");

  // edApp context
  var edApp = entityFactory().create(SoftwareApplication, BASE_IRI.concat("/forums"), { version: "v2" });

  // Group
  var group = entityFactory().create(CourseSection, BASE_SECTION_IRI, {
    courseNumber: "CPS 435-01",
    academicSession: "Fall 2016"
  });

  // Membership
  var membership = entityFactory().create(Membership, BASE_SECTION_IRI.concat("/rosters/1"), {
    member: actor,
    organization: _.omit(group, ["courseNumber", "academicSession"]),
    roles: [Role.LEARNER],
    status: Status.ACTIVE,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
  });

  // Session
  var session = entityFactory().create(Session, BASE_IRI.concat("/sessions/1d6fa9adf16f4892650e4305f6cf16610905cd50"), {
    startedAtTime: moment.utc("2016-11-15T10:12:00.000Z")
  });

  // Assert that key attributes are the same
  var event = eventFactory().create(MessageEvent, {
    actor: actor,
    action: action,
    object: obj,
    eventTime: eventTime,
    edApp: edApp,
    group: group,
    membership: membership,
    session: session
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventMessageReplied', event, t);
});