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
var Entity = require('./entity');
var entityType = require('./entityType');

/**
 * Represents a Digital Resource.  Analogous to a schema.org CreativeWork
 * DigitalResource's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @param {Object} props Optional property settings
 * @property {string}  mediaType valid Media Type string
 * @property {{string[]} } keywords Array of KeyWord Strings
 * @property {{string[]} } alignedLearningObjective Array of Learning Objectives
 * @property {Object} isPartOf Parent Object
 * @property {string} datePublished String representing a date
 * @property {string} Version String representing the version of the DigitalResource
 * @extends Entity
 */
function DigitalResource(id, props) {
  props = props || {};

  Entity.call(this, id, props);
  this.setType(entityType.DIGITAL_RESOURCE);
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
  if (props.hasOwnProperty("datePublished")) {
    this.setDatePublished(props.datePublished);
  }
  if (props.hasOwnProperty("version")) {
    this.setVersion(props.version);
  }
}

// Inherit from the prototype and assign additional properties to the object per the model as required.
DigitalResource.prototype = _.create(Entity.prototype, {
  setMediaType: function (mediaType) {
    this.mediaType = mediaType;
  },
  setKeywords: function (keywords) {
    this.keywords = keywords;
  },
  setIsPartOf: function (isPartOf) {
    this.isPartOf = isPartOf;
  },
  setAlignedLearningObjective: function (alignedLearningObjective) {
    this.alignedLearningObjective = alignedLearningObjective;
  },
  setDatePublished: function (datePublished) {
    this.datePublished = datePublished;
  },
  setVersion: function (version) {
    this.version = version;
  }
});

module.exports = DigitalResource;