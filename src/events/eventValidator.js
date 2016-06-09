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

var propNames = [ "@context", "@type", "sourcedId", "actor", "action", "object", "eventTime", "generated",
  "target", "referrer", "edApp", "group", "membership", "session", "federatedSession", "extensions" ];

/**
 * Check event properties.
 * @param context {string} JSON-LD context IRI
 * @param type {string} JSON-LD type IRI
 * @param props {Object} enumerable key:value Event properties
 * @returns {*}
 */
var checkProperties = function checkProperties(context, type, props) {

  // TODO check the context

  // TODO Do type specific checks

  // Move custom props, if any, to Event.extensions
  props = moveToExtensions(props);

  return props;
};

/**
 * Check for top-level user-defined custom Event properties and move them to Event.extensions.
 * Use the good 'ole for loop in preference to the for..in loop in order to avoid iterating over
 * all the enumerable properties of the object including those inherited from it's prototype.
 * @param props
 * @returns {*}
 */
var moveToExtensions = function moveToExtensions(props) {
  var keys = _.keys(props);
  for (var i = 0, len = keys.length; i < len; i++) {
    var propName = keys[i];
    if (propNames.indexOf(propName) == -1) {
      var prop = props[propName];
      if (props.hasOwnProperty("extensions")) {
        props.extensions[propName] = prop;
      } else {
        var extensions = {};
        extensions[propName] = prop;
        props.extensions = extensions;
      }
      delete props[propName];
    }
  }
  return props;
};

module.exports = {
  checkProperties: checkProperties
};