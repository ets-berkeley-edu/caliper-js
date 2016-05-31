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
var Response = require('./response');
var ResponseType = require ('./responseType');

/**
 * Represents FillinBlankResponse.
 * FillinBlankResponse's prototype set to Response
 * @constructor
 * @param {string} id URI
 * @param {Object} props Optional property settings
 * @property {Object[]} values Array of response values
 * @extends Response
 */
function FillinBlankResponse(id, props) {
  props = props || {};

  Response.call(this, id, props);
  this.setType(ResponseType.FILLINBLANK);
  if (props.hasOwnProperty("values")) {
    this.setValues(props.values);
  }
}

// Inherit from the prototype and assign additional properties to the object per the model as required.
FillinBlankResponse.prototype = _.create(Response.prototype, {
  setValues: function(values) {
    this.values = values;
  }
});

module.exports = FillinBlankResponse;