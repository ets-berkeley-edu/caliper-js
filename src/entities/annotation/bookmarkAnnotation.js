/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Annotation = require('./annotation');

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
}

BookmarkAnnotation.prototype = _.create(Annotation.prototype);

BookmarkAnnotation.prototype.setBookmarkNotes = function (bookmarkNotes) {
  this.bookmarkNotes = bookmarkNotes;
};

module.exports = BookmarkAnnotation;
