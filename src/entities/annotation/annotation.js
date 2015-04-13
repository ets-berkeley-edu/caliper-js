/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('../entity');
var EntityType = require('../entityType');

/**
 * Represents Annotation.  
 * Annotation's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @property {string} annotationId URI
 * @extends Entity
 */
function Annotation(id) {

  Entity.call(this);

  this.setId(id);
  this.setType(EntityType.ANNOTATION)

  this.setName(null);
  this.setDescription(null);
  this.setExtensions({});
}

Annotation.prototype = _.create(Entity.prototype);

Annotation.prototype.setAnnotatedId = function (annotatedId) {
  this.annotatedId = annotatedId;
};

/**
Annotation.prototype.setAnnotationType = function (type) {
  switch (type) {
  case "ANNOTATION":
    this.setType("http://purl.imsglobal.org/caliper/v1/Annotation");
    break;
  case "BOOKMARK_ANNOTATION":
    this.setType("http://purl.imsglobal.org/caliper/v1/BookmarkAnnotation");
    break;
  case "HIGHLIGHT_ANNOTATION":
    this.setType("http://purl.imsglobal.org/caliper/v1/HighlightAnnotation");
    break;
  case "SHARED_ANNOTATION":
    this.setType("http://purl.imsglobal.org/caliper/v1/SharedAnnotation");
    break;
  case "TAG_ANNOTATION":
    this.setType("http://purl.imsglobal.org/caliper/v1/TagAnnotation");
    break;
  }
};
 */

module.exports = Annotation;
