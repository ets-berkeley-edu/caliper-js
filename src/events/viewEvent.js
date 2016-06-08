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
var eventType = require('./eventType');

/**
 * Factory function that returns an object based on a delegate prototype when the factory create method is invoked.
 * All enumerable string keyed properties included in the "props" object are also assigned to the created object.
 * @returns {{create: create}}
 */
function ViewEvent() {
  var ctx = context.CONTEXT;
  var type = eventType.VIEWED;

  return {
    create: function create(props) {
      props = props || {};
      props = _.defaults(props, { '@context': ctx }, { '@type': type });
      return _.create(Event, props);
    }
  }
}

module.exports = ViewEvent;