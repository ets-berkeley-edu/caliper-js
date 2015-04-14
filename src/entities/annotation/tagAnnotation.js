/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
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

}

TagAnnotation.prototype = _.create(Annotation.prototype);

TagAnnotation.prototype.setTags = function (tags) {
  this.tags = tags;
};

module.exports = TagAnnotation;