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
var validator = require('validator');
var uuid = require('node-uuid');
var config = require('./config');
var constants = require('./constants');
var entityType = require('./entities/entityType');
var eventType = require('./events/eventType');

/**
 * Check Javascript object type.
 * @param obj
 * @returns {*}
 */
var checkObjectType = module.exports.checkObjectType = function checkObjectType(obj) {
  return Object.prototype.toString.call(obj);
};

/**
 * Generate a RFC 4122 v1 timestamp-based UUID or a v4 "practically random" UUID.  Default is v4.
 * @returns {*}
 */
module.exports.generateUUID = function generateUUID(version) {
  version = version || config.uuidVersion;

  switch(version) {
    case 4:
      return uuid.v4();
      break;
    case 1:
      return uuid.v1();
      break;
    default:
      return uuid.v4();
  }
};

/**
 * Check if object has JSON-LD @context property
 * @param obj
 * @returns {boolean}
 */
module.exports.hasCaliperContext = function hasCaliperContext(obj) {
  const regex = /http:\/\/purl.imsglobal.org\/ctx\/caliper\/?v?[0-9]*p?[0-9]*/;
  var hasCaliperContext = false;

  if (obj.hasOwnProperty('@context')) {
    switch(checkObjectType(obj['@context'])) {
      case '[object String]':
        hasCaliperContext = regex.test(obj['@context']);
        break;
      case '[object Array]':
        for (var i = 0, len = obj['@context'].length; i < len; i++) {
          if (checkObjectType(obj['@context'][i]) === '[object String]') {
            if (regex.text(obj['@context'][i])) {
              hasCaliperContext = true;
              break;
            }
          }
        }
        break;
      case '[object Object]':
        if (obj['@context'].hasOwnProperty('@vocab')) {
          hasCaliperContext = regex.test(obj['@context']['@vocab']);
        }

        if (hasCaliperContext) {
          break;
        }

        if (obj['@context'].hasOwnProperty('@base')) {
          hasCaliperContext = regex.test(obj['@context']['@base']);
        }
        break;
    }
  }

  return hasCaliperContext;
};

/**
 * Check for JSON-LD context
 * @returns {boolean}
 */
module.exports.hasContext = function hasContext() {

  return !_.isNil(obj.id);
};

/**
 * Check if id is undefined, null or empty.
 * @param obj
 * @returns {boolean}
 */
module.exports.hasId = function hasId(obj) {
  return !(_.isNil(obj.id) && _.isEmpty(obj.id));
};

/**
 * Check if type is undefined, null or empty.
 * @param obj
 * @returns {boolean}
 */
module.exports.hasType = function hasType(obj) {
  return !(_.isNil(obj.type) && _.isEmpty(obj.type));
};

/**
 * Check actor
 * @param obj
 */
module.exports.hasActor = function hasActor(obj) {
  return !_.isNil(obj.actor);
};

/**
 * Check action
 * @param obj
 * @returns {boolean}
 */
module.exports.hasAction = function hasAction(obj) {
  // TODO lookup action based on event
  return !(_.isNil(obj.action) && _.isEmpty(obj.action));
};

/**
 * Check object
 * @param obj
 * @returns {boolean}
 */
module.exports.hasObject = function hasObject(obj) {
  return !_.isNil(obj.object);
};

/**
 * Check if eventTime is null, undefined or invalid.
 * @param obj
 * @returns {boolean|*}
 */
module.exports.hasEventTime = function hasEventTime(obj) {
  var hasDateTime = false;
  if (!(_.isNil(obj.eventTime) && _.isEmpty(obj.eventTime))) {
    if (moment.isMoment(obj.eventTime)) {
      hasDateTime = true;
    } else {
      hasDateTime = moment(obj.eventTime).isValid();
      //hasDateTime = isISO8601(obj.eventTime);
    }
  }
  return hasDateTime;
};

/**
 * Check if UUID is null, undefined or invalid.
 * @param obj
 * @returns {boolean|*}
 */
module.exports.hasUUID = function hasUUID(obj) {
  return !(_.isNil(obj.uuid) && _.isEmpty(obj.uuid)) && isUUID(obj.uuid);
};

/**
 * Check if date string is ISO 8601 compliant.
 * @param str
 * @returns {*}
 */
var isISO8601 = module.exports.isISO8601 = function isISO8601(str) {
  return validator.isISO8601(str);
};

/**
 * Validate UUID value. validator.isUUID(str [, version]) - check if the string is a UUID (version 3, 4 or 5).
 * @param uuid
 * @returns {*}
 */
var isUUID = module.exports.isUUID = function isUUID(uuid) {
  return validator.isUUID(uuid);
};

/**
 * Check for top-level user-defined custom Entity properties against linked proto own and inherited
 * enumerable property keys (using _.keysIn()) and move custom properties to Entity.extensions. Use the
 * good 'ole for loop in preference to the for..in loop in order to avoid iterating over both enumerable
 * and inherited properties of the opts object.
 * @param proto
 * @param opts
 * @returns {*}
 */
module.exports.moveToExtensions = function moveToExtensions(proto, opts) {
  var protoKeys = _.keysIn(proto);
  var optsKeys = _.keys(opts);
  var obj = {};

  for (var i = 0, len = optsKeys.length; i < len; i++) {
    var optsPropName = optsKeys[i];
    if (protoKeys.indexOf(optsPropName) == -1) {
      var customProp = opts[optsPropName];
      var customKeys = _.keys(customProp);
      for (var i = 0, len = customKeys.length; i < len; i++) {
        if (customKeys[i] == '@context') {
          if (typeof customProp['@context'] === 'object') {
            if (obj.hasOwnProperty('@context')) {
              obj['@context'] = _.assign({}, obj['@context'], customProp['@context']);
            } else {
              obj['@context'] = customProp['@context'];
            }
          }
        } else {
          obj[customKeys[i]] = customProp[customKeys[i]];
        }
        delete opts[optsPropName];
      }
    }
  }

  if (opts.hasOwnProperty("extensions")) {
    opts.extensions = _.assign({}, opts.extensions, obj);
  } else {
    opts.extensions = obj;
  }

  return opts;
};