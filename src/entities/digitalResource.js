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
var Entity = require('./entity');
var EntityType = require('./entityType');

/**
 * Represents Digital Resource.  Analogous to a schema.org CreativeWork
 * DigitalResource's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @property {string} name Name
 * @property {string} description Description
 * @property {Object[]} properties Array of Extensions
 * @property {string}  mediaType valid Media Type string
 * @property {{string[]} } alignedLearningObjective Array of Learning Objectives
 * @property {{string[]} } keywords Array of KeyWord Strings
 * @property {Object} isPartOf Parent Object
 * @property {string} datePublished String representing a date
 * @property {string} Version String representing the version of the DigitalResource
 * @extends Entity
 */
function DigitalResource(id) {
  Entity.call(this);
  this.setId(id);
  this.setType(EntityType.DIGITAL_RESOURCE);
  this.setMediaType(null);
  this.setAlignedLearningObjective([]);
  this.setKeywords([]);
  this.setIsPartOf(null);
  this.setDatePublished(null);
  this.setVersion(null);
}

DigitalResource.prototype = _.create(Entity.prototype);

DigitalResource.prototype.setMediaType = function (mediaType) {
  this.mediaType = mediaType;
};

DigitalResource.prototype.setAlignedLearningObjective = function (alignedLearningObjective) {
  this.alignedLearningObjective = alignedLearningObjective;
};

DigitalResource.prototype.setKeywords = function (keywords) {
  this.keywords = keywords;
};

DigitalResource.prototype.setIsPartOf = function (isPartOf) {
  this.isPartOf = isPartOf;
};

DigitalResource.prototype.setDatePublished = function (datePublished) {
  this.datePublished = datePublished;
};

DigitalResource.prototype.setVersion = function (version) {
    this.version = version;
};

module.exports = DigitalResource;