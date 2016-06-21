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
var context = require('../context/context');
var Event = require('./event');
var validator = require('./eventValidator');

/**
 * Factory function that returns a mutated object based on a delegate prototype when the
 * factory create method is invoked. All enumerable string keyed properties included in
 * the "props" object and other sources are also assigned to the created object in the
 * order provided.
 * @returns {{create: create}}
 */
function eventFactory() {
  return {
    create: function create(delegate, props) {
      var proto = delegate || Event;
      var properties = props || {};

      // Validation checks
      properties['@context'] = validator.checkCtx(proto, properties);
      properties['@type'] = validator.checkType(proto, properties);
      properties = validator.moveToExtensions(proto, properties);

      return _.assign(_.create(proto), properties);
    }
  }
}

module.exports = eventFactory;