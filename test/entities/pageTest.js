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

var config =  require('../../src/config');
var entityFactory = require('../../src/entities/entityFactory');
var Chapter = require('../../src/entities/resource/chapter');
var Document = require('../../src/entities/resource/document');
var Page = require('../../src/entities/resource/page');
var requestorUtils = require('../../src/request/requestorUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDirectory + "caliperEntityPage.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('pageTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_IRI = "https://example.edu/etexts/201";

    var document = entityFactory().create(Document, {
      id: BASE_IRI,
      name: "IMS Caliper Implementation Guide",
      dateCreated: moment.utc("2016-10-01T06:00:00.000Z"),
      version: "1.1"
    });

    var chapter = entityFactory().create(Chapter, {
      id: BASE_IRI.concat("/chs/2"),
      name: "Chapter 2",
      isPartOf: document
    });

    var entity = entityFactory().create(Page, {
      id: BASE_IRI.concat("/chs/2/pp/23"),
      name: "Page 23",
      isPartOf: chapter
    });

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestorUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});