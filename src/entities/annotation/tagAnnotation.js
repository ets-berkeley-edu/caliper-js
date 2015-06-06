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
var Annotation = require('./annotation');
var AnnotationType = require('./annotationType');

/**
 * Represents TagAnnotation.  
 * TagAnnotation's prototype set to Annotation
 * @constructor
 * @param {string} id URI
 * @property {string[]} tags Array of Strings representing tags
 * @extends Annotation
 */
function TagAnnotation(id) {
    Annotation.call(this);
    this.setId(id);
    this.setType(AnnotationType.TAG_ANNOTATION);
    this.setTags(null);
}

TagAnnotation.prototype = _.create(Annotation.prototype);

TagAnnotation.prototype.setTags = function(tags) {
  this.tags = tags;
};

module.exports = TagAnnotation;