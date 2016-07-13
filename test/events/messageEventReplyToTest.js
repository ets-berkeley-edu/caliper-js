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
var _ = require('lodash');
var util = require('util');
var jsonCompare = require('../testUtils');

// Event
var eventFactory = require('../../src/events/eventFactory');
var MessageEvent = require('../../src/events/messageEvent');

// Entity
var entityFactory = require('../../src/entities/entityFactory');
var CourseSection = require('../../src/entities/lis/courseSection');
var Forum = require('../../src/entities/resource/forum');
var Membership = require('../../src/entities/lis/membership');
var Message = require('../../src/entities/resource/message');
var Person = require('../../src/entities/agent/person');
var SoftwareApplication = require('../../src/entities/agent/SoftwareApplication');
var Session = require('../../src/entities/session/Session');
var Thread = require('../../src/entities/resource/thread');

// Action
var MessageActions = require('../../src/actions/messageActions');

var Role = require('../../src/entities/lis/role');
var Status = require('../../src/entities/lis/status');

test('Create a MessageEvent (posted) and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_COURSE_IRI = "https://example.edu/semesters/201601/courses/25";
  const BASE_LMS_IRI = "https://example.com/lms";

  // The Actor for the Caliper Event
  var actorId = "https://example.edu/users/778899";
  var actor = entityFactory().create(Person, actorId);

  // The Action for the Caliper Event
  var action = MessageActions.POSTED;

  // Forum context
  var forumId = BASE_COURSE_IRI.concat("/forums/2");
  var forum = entityFactory().create(Forum, forumId, { name: "Caliper Forum" });

  // Thread context
  var threadId = forumId.concat("/topics/1");
  var thread = entityFactory().create(Thread, threadId, {
    name: "Caliper Adoption",
    isPartOf: forum
  });

  // ReplyTo
  var creator = entityFactory().create(Person, "https://example.edu/users/554433");
  var message = entityFactory().create(Message, threadId.concat("/messages/2"), {
    creators: [ creator ],
    dateCreated: moment.utc("2016-09-15T10:15:00.000Z")
  });

  // Message object
  var obj = entityFactory().create(Message, threadId.concat("/messages/3"), {
    creators: [ actor ],
    replyTo: message,
    isPartOf: thread,
    dateCreated: moment.utc("2016-09-15T10:15:30.000Z")
  });

  // edApp context
  var edApp = entityFactory().create(SoftwareApplication, BASE_LMS_IRI.concat("/forums"), { version: "v2" });

  // Group context
  var group = entityFactory().create(CourseSection, BASE_COURSE_IRI.concat("/sections/1"), {
    courseNumber: "POL101-01",
    academicSession: "Fall-2016"
  });

  // Actor's membership context
  var membership = entityFactory().create(Membership, BASE_COURSE_IRI.concat("/rosters/1"), {
    member: actor['@id'],
    organization: group['@id'],
    roles: [Role.LEARNER],
    status: Status.ACTIVE,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
  });

  // Local Session
  var sessionId = BASE_LMS_IRI.concat("/sessions/41102ee0870b0be0bb3259166a9947952a3c5425");
  var session = entityFactory().create(Session, sessionId, { startedAtTime: "2016-09-15T10:12:00.000Z" });

  // Assert that key attributes are the same
  var event = eventFactory().create(MessageEvent, {
    actor: actor,
    action: action,
    object: obj,
    eventTime: moment.utc("2016-09-15T10:15:30.000Z"),
    edApp: edApp,
    group: group,
    membership: membership,
    session: session
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEventMessageReplied', event, t);
});
