/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Annotation = require('./annotation');
var AnnotationType = require('./annotationType');

/**
 * Represents SharedAnnotation.  
 * SharedAnnotation's prototype set to Annotation
 * @constructor
 * @param {string} id URI
 * @property {Object[]} withAgents Array of Agents
 * @extends Annotation
 */
function SharedAnnotation(id) {

  Annotation.call(this);

  this.setId(id);
  this.setType(AnnotationType.type.SHARED_ANNOTATION);

}

SharedAnnotation.prototype = _.create(Annotation.prototype);

SharedAnnotation.prototype.setWithAgents = function (withAgents) {
  this.withAgents = withAgents;
};

module.exports = SharedAnnotation;
