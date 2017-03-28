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

var config =  require('../../src/config/config');
var entityFactory = require('../../src/entities/entityFactory');
var BookmarkAnnotation = require('../../src/entities/annotation/bookmarkAnnotation');
var Page = require('../../src/entities/resource/page');
var Person = require('../../src/entities/agent/person');
var requestorUtils = require('../../src/request/requestorUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEntityBookmarkAnnotation.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('bookmarkAnnotationTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_COM_IRI = "https://example.com";

    var annotator = entityFactory().create(Person, {id: "https://example.edu/users/554433"});
    var annotated = entityFactory().create(Page, {
      id: BASE_COM_IRI.concat("/#/texts/imscaliperimplguide/cfi/6/10!/4/2/2/2@0:0")
    });

    var entity = entityFactory().create(BookmarkAnnotation, {
      id: BASE_COM_IRI.concat("/users/554433/texts/imscaliperimplguide/bookmarks/1"),
      annotator: annotator,
      annotated: annotated,
      bookmarkNotes: "Caliper profiles model discrete learning activities or supporting activities that facilitate learning.",
      dateCreated: moment.utc("2016-08-01T06:00:00.000Z")
    });

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestorUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});