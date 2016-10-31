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
var diff = require('deep-diff').diff;
var jf = require('jsonfile');
//var logger = require("../src/logger");
var requestUtils = require('../src/request/requestUtils');

/**
 * Utility function to compare JSON (represented by an object) to a JSON fixture.
 * fixture: test fixture (relative to test/resources directory) without .json extension
 * obj: Object to be converted to JSON that will be compared to expected Json
 * t: The Tape test object
 * filterCallback: callback function to filter out JSON attributes, paths that should not be compared.
 * Callback should return TRUE for any key + path combination that should not be analyzed for differences.
 **/
var jsonCompare = function(fixture, obj, t, filterCallback) {

  const FIXTURES_BASE_DIR = '../caliper-common-fixtures/src/test/resources/fixtures/';

  var file = FIXTURES_BASE_DIR.concat(fixture, ".json");
  var objJson = requestUtils.parse(obj);
  //logger.log("info", "Parsed JSON = " + requestUtils.stringify(objJson));
  var differences;

  jf.readFile(file, function(err, expectedJson) {
    if (_.isNull(expectedJson)) {
      var errMsg = "ERROR: Unable to load specified JSON fixture: " + file;
      //logger.log("debug", errMsg);
      differences = errMsg; // define so we trigger failure;
    } else {
      if (_.isUndefined(filterCallback)) {
        differences = diff(expectedJson, objJson);
      } else {
        differences = diff(expectedJson, objJson, filterCallback);
      }
    }

    t.equal(true, _.isUndefined(differences), "Validate JSON");
    // console.log("DEBUG: Differences is undefined = " + _.isUndefined(differences) + " equal = " + equal);
    //logger.log("debug", "ERROR: Differences is undefined = " + _.isUndefined(differences) + " equal = " + t.equal);

    if (!_.isUndefined(differences)) {
      //logger.log("debug", "ERROR: JSON Differences = " + requestUtils.stringify(differences));
      console.log("ERROR: JSON Differences = " + requestUtils.stringify(differences));
    }
  })
};

module.exports = jsonCompare;