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
 * Represents BookmarkAnnotation.  
 * BookmarkAnnotation's prototype set to Annotation
 * @constructor
 * @param {string} id URI
 * @property {string} bookmarkNotes
 * @extends Annotation
 */
function BookmarkAnnotation(id) {
    Annotation.call(this);
    this.setId(id);
    this.setType(AnnotationType.BOOKMARK_ANNOTATION);
    this.setBookmarkNotes(null);
}

BookmarkAnnotation.prototype = _.create(Annotation.prototype);

BookmarkAnnotation.prototype.setBookmarkNotes = function(bookmarkNotes) {
  this.bookmarkNotes = bookmarkNotes;
};

module.exports = BookmarkAnnotation;