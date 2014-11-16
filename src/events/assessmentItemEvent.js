/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./caliperEvent');

function AssessmentItemEvent() {

  Event.call(this);

  this.setContext(this.Contexts.ASSESSMENT_ITEM);
  this.setType(this.Types.ASSESSMENT_ITEM);

  this.setGenerated(null);
  this.setStartedAtTime(0);
  this.setEndedAtTime(0);
  this.setDuration(null);
}

AssessmentItemEvent.prototype = _.create(Event.prototype);

module.exports = AssessmentItemEvent;
