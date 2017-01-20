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

var config = require('../../src/config');
var eventFactory = require('../../src/events/eventFactory');
var validator = require('../../src/validator');
var AnnotationEvent = require('../../src/events/annotationEvent');
var actions = require('../../src/actions/actions');

var entityFactory = require('../../src/entities/entityFactory');
var BookmarkAnnotation = require('../../src/entities/annotation/bookmarkAnnotation');
var CourseSection = require('../../src/entities/lis/courseSection');
var Document = require('../../src/entities/resource/document');
var Chapter = require('../../src/entities/resource/chapter');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/lis/role');
var Session = require('../../src/entities/session/session');
var SoftwareApplication = require('../../src/entities/agent/softwareApplication');
var Status = require('../../src/entities/lis/status');
var requestorUtils = require('../../src/request/requestorUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDirectory + "caliperEventAnnotationBookmarked.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('Create an AnnotationEvent (bookmarked) and validate properties', function (t) {

    // Plan for N assertions
    t.plan(2);

    const BASE_IRI = "https://example.edu";
    const BASE_ETEXT_IRI = "https://example.edu/etexts/201.epub";
    const BASE_SECTION_IRI = "https://example.edu/terms/201601/courses/7/sections/1";

    // Id
    var uuid = validator.generateUUID(config.uuidVersion);

    // Check Id
    t.equal(true, validator.isUUID(uuid), "Validate generated UUID.");

    // Override ID with canned value
    uuid = "d4618c23-d612-4709-8d9a-478d87808067";

    // The Actor
    var actor = entityFactory().create(Person, {id: BASE_IRI.concat("/users/554433")});

    // The Action
    var action = actions.bookmarked.term;

    // The Object of the interaction
    var obj = entityFactory().create(Document, {
      id: BASE_ETEXT_IRI,
      name: "IMS Caliper Implementation Guide",
      version: "1.1"
    });

    // Annotated cfi
    var annotated = entityFactory().create(Chapter, {
      id: BASE_ETEXT_IRI.concat("#epubcfi(/6/4[chap01]!/4[body01]/10[para05]/1:20)")
    });

    // Event time
    var eventTime = moment.utc("2016-11-15T10:15:00.000Z");

    // The generated Annotation
    var generated = entityFactory().create(BookmarkAnnotation, {
      id: BASE_IRI.concat("/users/554433/etexts/201/bookmarks/1"),
      actor: actor,
      annotated: annotated,
      bookmarkNotes: "Caliper profiles model discrete learning activities or supporting activities that enable learning.",
      dateCreated: moment.utc("2016-11-15T10:15:00.000Z")
    });

    // The edApp
    var edApp = entityFactory().create(SoftwareApplication, {
      id: BASE_IRI,
      name: "ePub Reader",
      version: "1.2.3"
    });

    // Group
    var group = entityFactory().create(CourseSection, {
      id: BASE_SECTION_IRI,
      courseNumber: "CPS 435-01",
      academicSession: "Fall 2016"
    });

    // The Actor's Membership
    var membership = entityFactory().create(Membership, {
      id: BASE_SECTION_IRI.concat("/rosters/1"),
      member: actor,
      organization: _.omit(group, ["courseNumber", "academicSession"]),
      roles: [Role.learner.term],
      status: Status.active.term,
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
    });

    // Session
    var session = entityFactory().create(Session, {
      id: BASE_IRI.concat("/sessions/1f6442a482de72ea6ad134943812bff564a76259"),
      startedAtTime: moment.utc("2016-11-15T10:00:00.000Z")
    });

    // Assert that key attributes are the same
    var event = eventFactory().create(AnnotationEvent, {
      uuid: uuid,
      actor: actor,
      action: action,
      object: obj,
      eventTime: eventTime,
      generated: generated,
      edApp: edApp,
      group: group,
      membership: membership,
      session: session
    });

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(event));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestorUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    ////t.end();
  });
});