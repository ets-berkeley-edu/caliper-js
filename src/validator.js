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
var uuid = require('node-uuid');
var constants = require('./constants');
var entityType = require('./entities/entityType');
var eventType = require('./events/eventType');

//var regexCtx = /http:\/\/purl.imsglobal.org\/ctx\/caliper/;
// var regexType = /^http:\/\/purl.imsglobal.org\/caliper\/v?[0-9]*p?[0-9]*\/?[A-Z]?[a-z]*/;


var validate = {
  hasCaliperContext: function isCaliperContext(obj) {
    if (obj.hasOwnProperty('@context')) {
      var regex = /^http:\/\/purl.imsglobal.org\/ctx\/caliper/;
      return regex.test(obj['@context']);
    } else {
      return false;
    }
  },
  hasCaliperType: function isCaliperType(obj) {
    if (obj.hasOwnProperty('@type')) {
      var regex = /^http:\/\/purl.imsglobal.org\/caliper\/v?[0-9]*p?[0-9]*\/?[A-Z]?[a-z]*/;  // TODO lookup instead?
      return regex.test(obj['@type']);
    } else {
      return false;
    }
  },
  hasGlobalId: function hasGlobalId(obj) {
    return (obj.hasOwnProperty('@id') && obj['@id']);
  },
  hasLocalId: function hasLocalId(obj) {
    return (obj.hasOwnProperty('id') && obj['id']);
  }
};

/**
 * Create a blank node with randomly generated UUID.
 * @returns {string}
 */
module.exports.createBlankNode = function createBlankNode() {
  return "".concat(constants.BLANK_NODE, uuid.v4);
};

/**
 * Check for Caliper @context.  If found, suppress any attempt to replace value.
 * @param proto
 * @param opts
 * @returns {*}
 */
module.exports.checkContext = function checkContext(proto, opts) {
  var options = opts || {};
  if (validate.hasCaliperContext(proto) && options.hasOwnProperty('@context')) {
    delete options['@context'];
  }
  return options;
};

/**
 * Check if id provided (minimal check). If an Entity lacks an @id mint a blank node; if an Event lacks an id do nothing.
 * @param opts
 * @param type
 * @returns {*|{}}
 */
module.exports.checkId = function checkId(opts, type) {
  var options = opts || {};
  switch (type) {
    case constants.ENTITY:
      if (!validate.hasGlobalId(options)) {
        options['@id'] = createBlankNode(); // TODO add config for minting blank node
      }
      break;
    case constants.EVENT:
      if (validate.hasGlobalId(options)) {
        options.id = options['@id'];
        delete options['@id']; // event.id not event.@id
      }

      if (!validate.hasLocalId(options)) {
        // options['id'] = createBlankNode(); // TODO add config for minting blank node
      }
      break;
    default:
    // do nothing
  }
  return options;
};

/**
 * Check for Caliper @type.  If found, suppress any attempt to replace value.
 * If no @type property is found insert appropriate default type.
 * @param proto
 * @param opts
 * @param type
 * @returns {*|{}}
 */
module.exports.checkType = function checkType(proto, opts, type) {
  var options = opts || {};
  if (validate.hasCaliperType(proto)) {
    if (options.hasOwnProperty('@type')) {
      delete options['@type'];
    }
  } else {
    if (!(options.hasOwnProperty('@type') && options['@type'])) {
      switch (type) {
        case constants.ENTITY:
          options['@type'] = entityType.ENTITY;
          break;
        case constants.EVENT:
          options['@type'] = eventType.EVENT;
          break;
        default:
        // do nothing
      }
    }
  }
  return options;
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