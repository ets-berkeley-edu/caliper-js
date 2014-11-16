/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Annotation = require('./annotation');

function HighlightAnnotation(id) {

  Annotation.call(this);

  this.setId(id);
}

HighlightAnnotation.prototype = _.create(Annotation.prototype);

HighlightAnnotation.prototype.setSelection = function (selection) {
  this.selection = selection;
}

HighlightAnnotation.prototype.setSelectionText = function (selectionText) {
  this.selectionText = selectionText;
}

module.exports = HighlightAnnotation;
