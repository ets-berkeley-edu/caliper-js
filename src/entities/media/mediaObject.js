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
var DigitalResource = require('../digitalResource');
var DigitalResourceType = require('../digitalResourceType');

/**
 * Represents Media Object.  
 * MediaObject's prototype set to DigitalResource
 * @constructor
 * @param {string} id URI
 * @param {string} type Type
 * @property {string} duration The format is expected to be PnYnMnDTnHnMnS
 * @extends DigitalResource
 */
function MediaObject(id) {
    DigitalResource.call(this);
    this.setId(id);
    this.setType(DigitalResourceType.MEDIA_OBJECT);
    this.setDuration(null);
}

MediaObject.prototype = _.create(DigitalResource.prototype);

MediaObject.prototype.setDuration = function(duration) {
  this.duration = duration;
};

module.exports = MediaObject;