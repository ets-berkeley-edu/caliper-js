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

/**
 * Calculate deep-level differences between two objects.
 * @param expected
 * @param actual
 * @param filter signature should be function(path, key) and should return a truthy value for any path-key combination to be filtered. If filtered, the difference analysis does no further analysis of the identified object-property path.
 * @returns {*}
 */
module.exports.compare = function compare(expected, actual, filter) {
  var differences;

  if (_.isUndefined(filter)) {
    differences = diff(expected, actual);
  } else {
    differences = diff(expected, actual, filter);
  }

  return differences;
};

/**
 * Read test fixture asynchronously and return content via callback
 * @param path
 * @param callback function that returns file content.
 */
module.exports.readFile = function readFile(path, callback) {
  jf.readFile(path, function(err, content) {
    if (err) throw err;
    return callback(null, content);
  });
};