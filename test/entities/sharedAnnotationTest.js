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
var Person = require('../../src/entities/agent/person');
var SharedAnnotation = require('../../src/entities/annotation/sharedAnnotation');

var jsonCompare = require('../testUtils');

test('Create a SharedAnnotation entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_IRI = "https://example.edu";
  const BASE_EPUB_IRI = "https://example.edu/etexts/201.epub";

  var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));
  var annotated = entityFactory().create(Document, BASE_EPUB_IRI);

  // Shares
  var sharedWith = [];
  sharedWith.push(entityFactory().create(Person, BASE_IRI.concat("/users/657585")));
  sharedWith.push(entityFactory().create(Person, BASE_IRI.concat("/users/667788")));

  var annotation = entityFactory().create(SharedAnnotation, BASE_IRI.concat("/users/554433/etexts/201/shares/1"), {
    actor: actor,
    annotated: annotated,
    withAgents: sharedWith,
    dateCreated: moment.utc("2016-08-01T09:00:00.000Z")
  });

  // Assert that the JSON produced is the same
  jsonCompare('caliperEntitySharedAnnotation', annotation, t);
});

/**
 {
  "@context": "http://purl.imsglobal.org/ctx/caliper/v1/Context",
  "@id": "https://example.edu/users/554433/etexts/201/shares/1",
  "@type": "http://purl.imsglobal.org/caliper/v1/SharedAnnotation",
  "actor": {
    "@id": "https://example.edu/users/554433",
    "@type": "http://purl.imsglobal.org/caliper/v1/Person"
  },
  "annotated": {
    "@id": "https://example.edu/etexts/201.epub",
    "@type": "http://purl.imsglobal.org/caliper/v1/Document"
  },
  "withAgents": [
    {
      "@id": "https://example.edu/users/657585",
      "@type": "http://purl.imsglobal.org/caliper/v1/Person"
    },
    {
      "@id": "https://example.edu/users/667788",
      "@type": "http://purl.imsglobal.org/caliper/v1/Person"
    }
  ],
  "dateCreated": "2016-08-01T09:00:00.000Z"
}
 */