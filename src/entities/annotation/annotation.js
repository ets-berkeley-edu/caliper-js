/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('../caliperEntity');

function Annotation(id) {

  Entity.call(this);

  this.setId(id);

  this.setName(null);
  this.setDescription(null);
  this.setProperties({});
}

Annotation.prototype = _.create(Entity.prototype);

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

module.exports = Annotation;
