/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Annotation = require('./annotation');

function SharedAnnotation(id) {

  Annotation.call(this);

  this.setId(id);
}

SharedAnnotation.prototype = _.create(Annotation.prototype);

SharedAnnotation.prototype.setWithAgents = function (withAgents) {
  this.withAgents = withAgents;
}

module.exports = SharedAnnotation;
