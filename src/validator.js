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
var context = require('./context/context');

const BLANK_NODE = '_:';

/**
 * Check @context value.
 * @param delegate
 * @param props
 * @returns {*}
 */
module.exports.checkCtx = function checkCtx(delegate, props) {
  if (delegate.hasOwnProperty('@context')) {
    return delegate['@context']
  } else if (props.hasOwnProperty('@context')) {
    return props['@context']
  } else {
    return context.CONTEXT;
  }
};

/**
 * TODO WEAK CHECK; CHECK FOR IRI
 * @param id
 * @returns {*}
 */
module.exports.checkId = function checkId(id, props) {
  if (id) {
    return id;
  } else if (props.hasOwnProperty('@id')) {
    return props['@id']
  } else {
    return BLANK_NODE;
  }
};

/**
 * Check @type value.
 * @param delegate
 * @param props
 * @returns {*}
 */
module.exports.checkType = function checkType(delegate, props, defaultType) {
  if (delegate.hasOwnProperty('@type')) {
    return delegate['@type']
  } else if (props.hasOwnProperty('@type')) {
    return props['@type']
  } else {
    return defaultType;
  }
};

/**
 * Check for top-level user-defined custom Entity properties against linked delegate own and inherited
 * enumerable property keys (using _.keysIn()) and move custom properties to Entity.extensions. Use the
 * good 'ole for loop in preference to the for..in loop in order to avoid iterating over both enumerable
 * and inherited properties of the props object.
 * @param delegate
 * @param props
 * @returns {*}
 */
module.exports.moveToExtensions = function moveToExtensions(delegate, props) {
  var delegateKeys = _.keysIn(delegate);
  var keys = _.keys(props);
  for (var i = 0, len = keys.length; i < len; i++) {
    var propName = keys[i];
    if (delegateKeys.indexOf(propName) == -1) {
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