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
var DigitalResource = require('../digitalResource');
var digitalResourceType = require('../digitalResourceType');

/**
 * Represents a reading.
 * Reading's prototype set to DigitalResource
 * @constructor
 * @param {string} id URI
 * @param {Object} props Optional property settings
 * @extends DigitalResource
 */
function Reading(id, props) {
  props = props || {};
  
  DigitalResource.call(this);
  this.setId(id);
  this.setType(digitalResourceType.READING);
  if (props.hasOwnProperty("name")) {
    this.setName(props.name);
  }
  if (props.hasOwnProperty("description")) {
    this.setDescription(props.description);
  }
  if (props.hasOwnProperty("mediaType")) {
    this.setMediaType(props.mediaType);
  }
  if (props.hasOwnProperty("keywords")) {
    this.setKeywords(props.keywords);
  }
  if (props.hasOwnProperty("isPartOf")) {
    this.setIsPartOf(props.isPartOf);
  }
  if (props.hasOwnProperty("alignedLearningObjective")) {
    this.setAlignedLearningObjective(props.alignedLearningObjective);
  }
  if (props.hasOwnProperty("dateCreated")) {
    this.setDateCreated(props.dateCreated);
  }
  if (props.hasOwnProperty("dateModified")) {
    this.setDateModified(props.dateModified);
  }
  if (props.hasOwnProperty("datePublished")) {
    this.setDatePublished(props.datePublished);
  }
  if (props.hasOwnProperty("version")) {
    this.setVersion(props.version);
  }
  if (props.hasOwnProperty("extensions")) {
    this.setExtensions(props.extensions);
  }
}

// Inherit from the prototype and assign additional properties to the object per the model as required.
Reading.prototype = _.create(DigitalResource.prototype);

module.exports = Reading;