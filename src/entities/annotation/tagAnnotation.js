/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Annotation = require('./annotation');

function TagAnnotation(id) {

  Annotation.call(this);

  this.setId(id);
}

TagAnnotation.prototype = _.create(Annotation.prototype);

TagAnnotation.prototype.setTags = function (tags) {
  this.tags = tags;
}

module.exports = TagAnnotation;
