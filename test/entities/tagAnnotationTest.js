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
var Person = require('../../src/entities/agent/person');
var TagAnnotation = require('../../src/entities/annotation/tagAnnotation');
var requestUtils = require('../../src/request/requestUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEntityTagAnnotation.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('Create a TagAnnotation entity and validate properties', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_IRI = "https://example.edu";
    const BASE_EPUB_IRI = "https://example.edu/etexts/201.epub";

    var actor = entityFactory().create(Person, BASE_IRI.concat("/users/554433"));
    var annotated = entityFactory().create(Chapter, BASE_EPUB_IRI.concat("#epubcfi(/6/4[chap01]!/4[body01]/12[para06]/1:97)"));

    var entity = entityFactory().create(TagAnnotation, BASE_IRI.concat("/users/554433/etexts/201/tags/3"), {
      actor: actor,
      annotated: annotated,
      tags: [ "profile", "event", "entity" ],
      dateCreated: moment.utc("2016-08-01T09:00:00.000Z")
    });

    // Compare
    var diff = testUtils.compare(fixture, requestUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});