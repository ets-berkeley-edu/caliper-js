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

var _ = require('lodash-node');
var diff = require('deep-diff').diff;
var jf = require('jsonfile')
var util = require('util')

/**
 * Utility function to compare JSON (represented by a object) to JSON fixture expectedJsonFile: filename
 * (relative to test/resources directory) without .json extension JsonToCompare: Object representing JSON
 * that will be compared to expectedJson t: The Tape test object filterCallback: callback function to filter
 * out JSON attributes, paths that should not be compared. Callback shouldreturn TRUE for any key + path
 * combination that should not be analyzed for differences.
 **/
var jsonCompare = function (expectedJsonFile, JsonToCompare, t, filterCallback) {

  var differences;

  var FIXTURES_BASE_DIR = '../caliper-common-fixtures/src/test/resources/fixtures/';
  var file = FIXTURES_BASE_DIR + expectedJsonFile + '.json';
  jf.readFile(file, function (err, expectedJson) {
    // console.log("INFO: Loaded JSON from file: " + util.inspect(expectedJson));
    if (_.isNull(expectedJson)) {
      var errMsg = "ERROR: Unable to load specified JSON fixture: " + file;
      console.log(errMsg);
      differences = errMsg; // define so we trigger failure;
    } else {
      if (_.isUndefined(filterCallback)) {
        differences = diff(expectedJson, JsonToCompare);
      } else {
        differences = diff(expectedJson, JsonToCompare, filterCallback);
      }
    }

    t.equal(true, _.isUndefined(differences), "Validate Event JSON");

    // console.log("DEBUG: Differences is undefined = " + _.isUndefined(differences) + " equal = " + equal);

    if (!_.isUndefined(differences)) {
      console.log("ERROR: JSON Differences = " + JSON.stringify(differences));
    }
  })
};

var defaultDateCreatedStr = function(){

};

var defaultDateModifiedStr = function(){

};

module.exports = jsonCompare;
