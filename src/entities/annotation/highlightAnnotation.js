/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Annotation = require('./annotation');
var AnnotationType = require('./annotationType');

/**
 * Represents HightlightAnnotation.  
 * HighlightAnnotation's prototype set to Annotation
 * @constructor
 * @param {string} id URI
 * @property {Object} selection {startPosition, endPosition
 * @property {string} selectionText Text that was Selected 
 * @extends Annotation
 */
function HighlightAnnotation(id) {

    Annotation.call(this);

    this.setId(id);
    this.setType(AnnotationType.HIGHLIGHT_ANNOTATION);

}

HighlightAnnotation.prototype = _.create(Annotation.prototype);

HighlightAnnotation.prototype.setSelection = function (selection) {
  this.selection = selection;
};

HighlightAnnotation.prototype.setSelectionText = function (selectionText) {
  this.selectionText = selectionText;
};

module.exports = HighlightAnnotation;