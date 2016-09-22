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
var AssessmentEvent = require('../../src/events/assessmentEvent');
var AssessmentActions = require('../../src/actions/assessmentActions');

// Entity
var entityFactory = require('../../src/entities/entityFactory');
var Assessment = require('../../src/entities/resource/assessment');
var AssessmentItem = require('../../src/entities/resource/assessmentItem');
var Attempt = require('../../src/entities/assign/attempt');
var CourseSection = require('../../src/entities/lis/courseSection');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/lis/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Status = require('../../src/entities/lis/status');

var jsonCompare = require('../testUtils');

test('Create an Assessment entity and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_ASSESS_IRI = "https://example.edu/terms/201601/courses/7/sections/1/assess/1";

  var items = [];
  items.push(entityFactory().create(AssessmentItem, BASE_ASSESS_IRI.concat("/items/1")));
  items.push(entityFactory().create(AssessmentItem, BASE_ASSESS_IRI.concat("/items/2")));
  items.push(entityFactory().create(AssessmentItem, BASE_ASSESS_IRI.concat("/items/3")));

  var assess = entityFactory().create(Assessment, BASE_ASSESS_IRI, {
    name: "Quiz One",
    items: items,
    dateCreated: moment.utc("2016-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2016-09-02T11:30:00.000Z"),
    datePublished: moment.utc("2016-08-15T09:30:00.000Z"),
    dateToActivate: moment.utc("2016-08-16T05:00:00.000Z"),
    dateToShow: moment.utc("2016-08-16T05:00:00.000Z"),
    dateToStartOn: moment.utc("2016-08-16T05:00:00.000Z"),
    dateToSubmit: moment.utc("2016-09-28T11:59:59.000Z"),
    maxAttempts: 2,
    maxSubmits: 2,
    maxScore: 15,
    version: "1.0"
  });


  // Assert that the JSON produced is the same
  jsonCompare('caliperEntityAssessment', assess, t);
});




/**
 {
  "@context": "http://purl.imsglobal.org/ctx/caliper/v1/Context",
  "@id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1",
  "@type": "http://purl.imsglobal.org/caliper/v1/Assessment",
  "name": "Quiz One",
  "items": [
    {
      "@id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/1",
      "@type": "http: //purl.imsglobal.org/caliper/v1/AssessmentItem"
    },
    {
      "@id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/2",
      "@type": "http: //purl.imsglobal.org/caliper/v1/AssessmentItem"
    },
    {
      "@id": "https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3",
      "@type": "http: //purl.imsglobal.org/caliper/v1/AssessmentItem"
    }
  ],
  "dateCreated": "2016-08-01T06:00:00.000Z",
  "dateModified": "2016-09-02T11:30:00.000Z",
  "datePublished": "2016-08-15T09:30:00.000Z",
  "dateToActivate": "2016-08-16T05:00:00.000Z",
  "dateToShow": "2016-08-16T05:00:00.000Z",
  "dateToStartOn": "2016-08-16T05:00:00.000Z",
  "dateToSubmit": "2016-09-28T11:59:59.000Z",
  "maxAttempts": 2,
  "maxScore": 15,
  "maxSubmits": 2,
  "version": "1.0"
}
 */