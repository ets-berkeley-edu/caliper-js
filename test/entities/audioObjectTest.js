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
var AudioObject = require('../../src/entities/resource/audioObject');
var requestorUtils = require('../../src/requestors/requestorUtils');
var testUtils = require('../testUtils');

const path = config.testFixturesBaseDir + "caliperEntityAudioObject.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;

  test('audioObjectTest', function (t) {

    // Plan for N assertions
    t.plan(1);

    const BASE_IRI = "https://example.edu";

    var entity = entityFactory().create(AudioObject, {
      id: BASE_IRI.concat("/audio/765"),
      name: "Audio Recording: IMS Caliper Sensor API Q&A.",
      mediaType: "audio/ogg",
      datePublished: moment.utc("2016-12-01T06:00:00.000Z"),
      duration: "PT55M13S"
    });

    // Compare
    var diff = testUtils.compare(fixture, requestorUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + requestorUtils.stringify(diff) : "");

    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});