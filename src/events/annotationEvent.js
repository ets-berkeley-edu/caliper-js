/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./caliperEvent');

function AnnotationEvent() {

  Event.call(this);

  this.setContext(this.Contexts.ANNOTATION);
  this.setType(this.Types.ANNOTATION);

  this.setGenerated(null);
  this.setStartedAtTime(null);
  this.setEndedAtTime(null);
  this.setDuration(null);
}

AnnotationEvent.prototype = _.create(Event.prototype);

module.exports = AnnotationEvent;
