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
var Document = require('../../src/entities/resource/document');
var Forum = require('../../src/entities/resource/forum');
var Message = require('../../src/entities/resource/message');
var Person = require('../../src/entities/agent/person');
var Thread = require('../../src/entities/resource/thread');

var jsonCompare = require('../testUtils');

test('Create a Message entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";
  const BASE_FORUM_IRI = "https://example.edu/terms/201601/courses/7/sections/1/forums/2";
  const BASE_THREAD_IRI = "https://example.edu/terms/201601/courses/7/sections/1/forums/2/topics/1";

  // Forum, Thread context
  var forum = entityFactory().create(Forum, BASE_FORUM_IRI);
  var thread = entityFactory().create(Thread, BASE_THREAD_IRI, { isPartOf: forum });

  // Message creators
  var creators = [];
  creators.push(entityFactory().create(Person, BASE_IRI.concat("/users/778899")));

  // replyTo
  var replyTo = entityFactory().create(Message, BASE_THREAD_IRI.concat("/messages/2"));

  // Attachments
  var attachments = [];
  attachments.push(entityFactory().create(Document, BASE_IRI.concat("/etexts/201.epub"), {
    name: "IMS Caliper Implementation Guide",
    dateCreated: "2016-10-01T06:00:00.000Z",
    version: "1.1"
  }));

  // Message
  var message = entityFactory().create(Message, BASE_THREAD_IRI.concat("/messages/3"), {
    creators: creators,
    body: "The Caliper working group provides a set of Caliper Sensor reference implementations for the purposes of education and experimentation.  They have not been tested for use in a production environment.  See the Caliper Implementation Guide for more details.",
    replyTo: replyTo,
    isPartOf: thread,
    attachments: attachments,
    dateCreated: moment.utc("2016-11-15T10:15:30.000Z")
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEntityMessage', message, t);
});

/**
 {
  "@id": "https://example.edu/terms/201601/courses/7/sections/1/forums/2/topics/1/messages/3",
  "@type": "http://purl.imsglobal.org/caliper/v1/Message",
  "creators": [
    {
      "@id": "https://example.edu/users/778899",
      "@type": "http://purl.imsglobal.org/caliper/v1/Person"
    }
  ],
  "body": "The Caliper working group provides a set of Caliper Sensor reference implementations for the purposes of education and experimentation.  They have not been tested for use in a production environment.  See the Caliper Implementation Guide for more details.",
  "replyTo": {
    "@id": "https://example.edu/terms/201601/courses/7/sections/1/forums/2/topics/1/messages/2",
    "@type": "http://purl.imsglobal.org/caliper/v1/Message"
  },
  "isPartOf": {
    "@id": "https://example.edu/terms/201601/courses/7/sections/1/forums/2/topics/1",
    "@type": "http://purl.imsglobal.org/caliper/v1/Thread",
    "isPartOf": {
      "@id": "https://example.edu/terms/201601/courses/7/sections/1/forums/2",
      "@type": "http://purl.imsglobal.org/caliper/v1/Forum"
    }
  },
  "attachments": [
    {
      "@context": "http://purl.imsglobal.org/ctx/caliper/v1/Context",
      "@id": "https://example.edu/etexts/201.epub",
      "@type": "http://purl.imsglobal.org/caliper/v1/Document",
      "name": "IMS Caliper Implementation Guide",
      "dateCreated": "2016-10-01T06:00:00.000Z",
      "version": "1.1"
    }
  ],
  "dateCreated": "2016-11-15T10:15:30.000Z"
}
 */